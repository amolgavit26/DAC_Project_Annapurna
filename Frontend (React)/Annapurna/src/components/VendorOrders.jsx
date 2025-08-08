import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Table, Form, Spinner, Badge, Card, Container, Row, Col } from 'react-bootstrap';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import BASE_URL from '../config';
import api from '../services/api';

const VendorOrders = () => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(false);
    const [statusUpdating, setStatusUpdating] = useState(null);

    const token = localStorage.getItem('token');

    useEffect(() => {
        fetchOrders();
    }, []);

    const fetchOrders = async () => {
        setLoading(true);
        try {
            const res = await api.get(`${BASE_URL}/api/vendor/orders`, {
                headers: {
                    Authorization: token.startsWith('Bearer') ? token : `Bearer ${token}`
                }
            });
            setOrders(res.data.sort((a, b) => b.orderId - a.orderId));
        } catch (err) {
            console.error("Error fetching orders:", err);
            toast.error('Failed to fetch orders.');
        } finally {
            setLoading(false);
        }
    };

    const handleStatusChange = async (orderId, newStatus) => {
        setStatusUpdating(orderId);

        // 👇 Optimistically update UI BEFORE the backend responds
        setOrders((prevOrders) =>
            prevOrders.map((order) =>
                order.orderId === orderId ? { ...order, status: newStatus } : order
            )
        );

        try {
            await api.patch(
                `${BASE_URL}/api/vendor/orders/${orderId}/status`,
                { status: newStatus },
                {
                    headers: {
                        Authorization: token.startsWith('Bearer') ? token : `Bearer ${token}`
                    },
                }
            );

            toast.success(`Order ${orderId} status updated to ${newStatus}`);
        } catch (err) {
            console.error(err);
            toast.error('Failed to update order status');

            // Optional: rollback status on error
            fetchOrders(); // Only if rollback needed
        } finally {
            setStatusUpdating(null);
        }
    };

    const getStatusBadge = (status) => {
        const statusConfig = {
            'PENDING': { variant: 'warning', icon: '⏳' },
            'ACCEPTED': { variant: 'info', icon: '✅' },
            'DELIVERED': { variant: 'success', icon: '🚚' },
            'REJECTED': { variant: 'danger', icon: '❌' }
        };

        const config = statusConfig[status] || { variant: 'secondary', icon: '📋' };
        return (
            <Badge bg={config.variant} className="px-3 py-2 fs-6">
                {config.icon} {status}
            </Badge>
        );
    };

    const customStyles = `
        .gradient-header {
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
            border-radius: 15px 15px 0 0;
            padding: 2rem;
            margin-bottom: 0;
        }
        
        .custom-table {
            border-radius: 0 0 15px 15px;
            overflow: hidden;
            box-shadow: 0 10px 30px rgba(102, 126, 234, 0.1);
        }
        
        .table-header {
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
        }
        
        .table-header th {
            border: none;
            font-weight: 600;
            text-transform: uppercase;
            font-size: 0.85rem;
            letter-spacing: 0.5px;
            padding: 1rem 0.75rem;
        }
        
        .custom-table tbody tr {
            transition: all 0.3s ease;
        }
        
        .custom-table tbody tr:hover {
            background-color: rgba(102, 126, 234, 0.05);
            transform: translateY(-1px);
            box-shadow: 0 4px 15px rgba(102, 126, 234, 0.1);
        }
        
        .custom-table td {
            vertical-align: middle;
            padding: 1rem 0.75rem;
            border-color: rgba(102, 126, 234, 0.1);
        }
        
        .custom-select {
            border: 2px solid #e0e7ff;
            border-radius: 8px;
            background: linear-gradient(135deg, #f8faff 0%, #f1f5ff 100%);
            transition: all 0.3s ease;
        }
        
        .custom-select:focus {
            border-color: #667eea;
            box-shadow: 0 0 0 0.2rem rgba(102, 126, 234, 0.25);
        }
        
        .loading-container {
            background: linear-gradient(135deg, #f8faff 0%, #f1f5ff 100%);
            border-radius: 15px;
            padding: 3rem;
            text-align: center;
            box-shadow: 0 10px 30px rgba(102, 126, 234, 0.1);
        }
        
        .loading-spinner {
            color: #667eea;
        }
        
        .stats-card {
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
            border: none;
            border-radius: 15px;
            transition: transform 0.3s ease;
        }
        
        .stats-card:hover {
            transform: translateY(-5px);
        }
        
        .order-id-badge {
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
            padding: 0.5rem 1rem;
            border-radius: 20px;
            font-weight: 600;
            font-size: 0.9rem;
        }
        
        .price-text {
            color: #667eea;
            font-weight: 700;
            font-size: 1.1rem;
        }
    `;

    return (
        <>
            <style>{customStyles}</style>
            <Container fluid className="py-4" style={{ background: 'linear-gradient(135deg, #f8faff 0%, #f1f5ff 100%)', minHeight: '100vh' }}>
                <Row className="mb-4">
                    <Col>
                        <Card className="border-0 shadow-lg">
                            <div className="gradient-header text-center">
                                <h1 className="mb-0 display-6">
                                    <i className="fas fa-clipboard-list me-3"></i>
                                    Vendor Orders Dashboard
                                </h1>
                                <p className="mb-0 mt-2 opacity-75">Manage and track all your orders efficiently</p>
                            </div>
                        </Card>
                    </Col>
                </Row>

                {/* Stats Cards */}
                <Row className="mb-4">
                    <Col md={3}>
                        <Card className="stats-card text-center py-3">
                            <Card.Body>
                                <h3 className="mb-1">{orders.length}</h3>
                                <p className="mb-0">Total Orders</p>
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col md={3}>
                        <Card className="stats-card text-center py-3">
                            <Card.Body>
                                <h3 className="mb-1">{orders.filter(o => o.status === 'PENDING').length}</h3>
                                <p className="mb-0">Pending</p>
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col md={3}>
                        <Card className="stats-card text-center py-3">
                            <Card.Body>
                                <h3 className="mb-1">{orders.filter(o => o.status === 'ACCEPTED').length}</h3>
                                <p className="mb-0">Accepted</p>
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col md={3}>
                        <Card className="stats-card text-center py-3">
                            <Card.Body>
                                <h3 className="mb-1">{orders.filter(o => o.status === 'DELIVERED').length}</h3>
                                <p className="mb-0">Delivered</p>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>

                <Card className="border-0 shadow-lg">
                    {loading ? (
                        <div className="loading-container">
                            <Spinner animation="border" role="status" className="loading-spinner mb-3" size="lg" />
                            <h4 className="text-muted">Loading your orders...</h4>
                            <p className="text-muted mb-0">Please wait while we fetch the latest data</p>
                        </div>
                    ) : (
                        <div className="custom-table">
                            <Table responsive hover className="mb-0">
                                <thead className="table-header">
                                    <tr>
                                        <th><i className="fas fa-hashtag me-2"></i>Order ID</th>
                                        <th><i className="fas fa-utensils me-2"></i>Tiffin Name</th>
                                        <th><i className="fas fa-sort-numeric-up me-2"></i>Quantity</th>
                                        <th><i className="fas fa-rupee-sign me-2"></i>Total Price</th>
                                        <th><i className="fas fa-info-circle me-2"></i>Status</th>
                                        <th><i className="fas fa-user me-2"></i>Customer Name</th>
                                        <th><i className="fas fa-envelope me-2"></i>Email</th>
                                        <th><i className="fas fa-phone me-2"></i>Mobile</th>
                                        <th><i className="fas fa-edit me-2"></i>Update Status</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {orders.length === 0 ? (
                                        <tr>
                                            <td colSpan="9" className="text-center py-5">
                                                <div className="text-muted">
                                                    <i className="fas fa-inbox fa-3x mb-3 opacity-50"></i>
                                                    <h4>No orders found</h4>
                                                    <p className="mb-0">Orders will appear here once customers place them</p>
                                                </div>
                                            </td>
                                        </tr>
                                    ) : (
                                        orders.map((order) => (
                                            <tr key={order.orderId}>
                                                <td>
                                                    <span className="order-id-badge">
                                                        #{order.orderId}
                                                    </span>
                                                </td>
                                                <td>
                                                    <strong className="text-dark">{order.tiffinName}</strong>
                                                </td>
                                                <td>
                                                    <Badge bg="light" text="dark" className="px-3 py-2">
                                                        {order.quantity} items
                                                    </Badge>
                                                </td>
                                                <td>
                                                    <span className="price-text">₹{order.totalPrice}</span>
                                                </td>
                                                <td>
                                                    {getStatusBadge(order.status)}
                                                </td>
                                                <td>
                                                    <div className="d-flex align-items-center">
                                                        <div className="bg-primary rounded-circle d-flex align-items-center justify-content-center me-2"
                                                            style={{ width: '35px', height: '35px', fontSize: '14px', color: 'white' }}>
                                                            {order.customerName?.charAt(0)?.toUpperCase()}
                                                        </div>
                                                        <strong>{order.customerName}</strong>
                                                    </div>
                                                </td>
                                                <td>
                                                    <small className="text-muted">{order.customerEmail}</small>
                                                </td>
                                                <td>
                                                    <small className="text-muted">{order.customerMobileNumber}</small>
                                                </td>

                                                <td>
                                                    <Form.Select
                                                        value={order.status}
                                                        onChange={(e) => handleStatusChange(order.orderId, e.target.value)}
                                                        disabled={statusUpdating === order.orderId}
                                                        className="custom-select"
                                                        size="sm"
                                                    >
                                                        <option value="PENDING">🕐 PENDING</option>
                                                        <option value="ACCEPTED">✅ ACCEPTED</option>
                                                        <option value="DELIVERED">🚚 DELIVERED</option>
                                                        <option value="REJECTED">❌ REJECTED</option>
                                                    </Form.Select>
                                                    {statusUpdating === order.orderId && (
                                                        <div className="text-center mt-1">
                                                            <Spinner animation="border" size="sm" className="loading-spinner" />
                                                        </div>
                                                    )}
                                                </td>
                                            </tr>
                                        ))
                                    )}
                                </tbody>
                            </Table>
                        </div>
                    )}
                </Card>
            </Container>
        </>
    );
};

export default VendorOrders;