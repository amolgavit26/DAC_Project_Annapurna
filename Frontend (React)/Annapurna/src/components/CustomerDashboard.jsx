import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Table, Alert, Spinner, Button, Card, Container, Row, Col, Badge, Collapse } from 'react-bootstrap';
import AddressForm from './AddressForm'; // ✅ Import the new component

const CustomerDashboard = () => {
    const [orders, setOrders] = useState([]);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(true);
    const [showAddressForm, setShowAddressForm] = useState(false); // ✅ toggle state

    useEffect(() => {
        fetchOrders();
    }, []);

    const fetchOrders = async () => {
        const token = localStorage.getItem('token');
        try {
            const response = await axios.get('http://localhost:8080/api/orders/my', {
                headers: {
                    Authorization: token.startsWith('Bearer') ? token : `Bearer ${token}`
                }
            });
            setOrders(
                Array.isArray(response.data)
                    ? response.data.sort((a, b) => new Date(b.orderTime) - new Date(a.orderTime))
                    : []
            );

        } catch (err) {
            console.error('❌ Error fetching orders:', err);
            setError('Failed to load orders.');
        } finally {
            setLoading(false);
        }
    };

    const handleCancel = async (orderId) => {
        const token = localStorage.getItem('token');
        try {
            await axios.post(
                `http://localhost:8080/api/orders/${orderId}/cancel`,
                {},
                {
                    headers: {
                        Authorization: token.startsWith('Bearer') ? token : `Bearer ${token}`
                    }
                }
            );
            alert('❌ Order cancelled successfully!');
            fetchOrders();
        } catch (err) {
            console.error('❌ Failed to cancel order:', err);
            alert(err.response?.data?.message || 'Cancel failed');
        }
    };

    const isCancelable = (orderTime) => {
        const placedTime = new Date(orderTime);
        const now = new Date();
        const diffInMinutes = (now - placedTime) / (1000 * 60);
        return diffInMinutes <= 5;
    };

    const downloadReceipt = async (orderId) => {
        try {
            const token = localStorage.getItem('token');
            const response = await axios.get(`http://localhost:8080/api/orders/${orderId}/receipt`, {
                responseType: 'blob',
                headers: {
                    Authorization: token.startsWith('Bearer') ? token : `Bearer ${token}`
                }
            });

            const blob = new Blob([response.data], { type: 'application/pdf' });
            const url = window.URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.href = url;
            link.download = `receipt-${orderId}.pdf`;
            document.body.appendChild(link);
            link.click();
            link.remove();
            window.URL.revokeObjectURL(url);
        } catch (err) {
            console.error('Failed to download receipt:', err);
            alert('❌ Could not download receipt. Please try again later.');
        }
    };


    const getStatusBadge = (status) => {
        const statusConfig = {
            'PENDING': { variant: 'warning', icon: '⏳', text: 'Pending' },
            'ACCEPTED': { variant: 'info', icon: '✅', text: 'Accepted' },
            'DELIVERED': { variant: 'success', icon: '🚚', text: 'Delivered' },
            'REJECTED': { variant: 'danger', icon: '❌', text: 'Rejected' },
            'CANCELLED': { variant: 'secondary', icon: '🚫', text: 'Cancelled' }
        };

        const config = statusConfig[status] || { variant: 'secondary', icon: '📋', text: status };
        return (
            <Badge bg={config.variant} className="px-3 py-2 fs-6">
                {config.icon} {config.text}
            </Badge>
        );
    };

    const getTimeRemaining = (orderTime) => {
        const placedTime = new Date(orderTime);
        const now = new Date();
        const diffInMinutes = Math.ceil(5 - (now - placedTime) / (1000 * 60));
        return Math.max(0, diffInMinutes);
    };

    const customStyles = `
        .gradient-bg {
            background: linear-gradient(135deg, #f8faff 0%, #f1f5ff 100%);
            min-height: 100vh;
            padding: 2rem 0;
        }
        
        .dashboard-header {
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
            border-radius: 20px;
            padding: 2.5rem;
            margin-bottom: 2rem;
            text-align: center;
            box-shadow: 0 15px 35px rgba(102, 126, 234, 0.2);
        }
        
        .stats-card {
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
            border: none;
            border-radius: 15px;
            transition: transform 0.3s ease;
            margin-bottom: 1.5rem;
        }
        
        .stats-card:hover {
            transform: translateY(-5px);
        }
        
        .address-toggle-btn {
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            border: none;
            border-radius: 50px;
            padding: 0.75rem 2rem;
            font-weight: 600;
            transition: all 0.3s ease;
            margin-bottom: 1.5rem;
        }
        
        .address-toggle-btn:hover {
            background: linear-gradient(135deg, #5a67d8 0%, #6b46c1 100%);
            transform: translateY(-2px);
            box-shadow: 0 8px 20px rgba(102, 126, 234, 0.3);
        }
        
        .orders-card {
            border: none;
            border-radius: 20px;
            box-shadow: 0 15px 35px rgba(102, 126, 234, 0.1);
            overflow: hidden;
            background: white;
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
        
        .cancel-btn {
            background: linear-gradient(135deg, #f56565 0%, #e53e3e 100%);
            border: none;
            border-radius: 20px;
            padding: 0.5rem 1rem;
            font-weight: 600;
            font-size: 0.85rem;
        }
        
        .cancel-btn:hover {
            background: linear-gradient(135deg, #e53e3e 0%, #c53030 100%);
            transform: scale(1.05);
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
        
        .time-badge {
            background: linear-gradient(135deg, #48bb78 0%, #38a169 100%);
            color: white;
            padding: 0.3rem 0.8rem;
            border-radius: 15px;
            font-size: 0.75rem;
            font-weight: 600;
        }
        
        .not-allowed-text {
            color: #a0aec0;
            font-style: italic;
            font-weight: 500;
        }
        
        .loading-container {
            background: white;
            border-radius: 20px;
            padding: 3rem;
            text-align: center;
            box-shadow: 0 15px 35px rgba(102, 126, 234, 0.1);
            margin-bottom: 2rem;
        }
        
        .loading-spinner {
            color: #667eea;
        }
        
        .alert-custom {
            border: none;
            border-radius: 15px;
            padding: 1rem 1.5rem;
            margin-bottom: 1.5rem;
        }
        
        .alert-danger-custom {
            background: linear-gradient(135deg, #f56565 0%, #e53e3e 100%);
            color: white;
        }
        
        .empty-state {
            text-align: center;
            padding: 3rem;
            color: #a0aec0;
        }
        
        .address-form-container {
            background: rgba(255, 255, 255, 0.9);
            border-radius: 15px;
            padding: 1.5rem;
            margin-bottom: 1.5rem;
            border: 2px solid rgba(102, 126, 234, 0.1);
        }
    `;

    return (
        <>
            <style>{customStyles}</style>
            <div className="gradient-bg">
                <Container fluid>
                    {/* Dashboard Header */}
                    <Row className="mb-4">
                        <Col>
                            <div className="dashboard-header">
                                <h1 className="mb-2 display-5">
                                    <i className="fas fa-user-circle me-3"></i>
                                    Customer Dashboard
                                </h1>
                                <p className="mb-0 opacity-75">
                                    Track your orders and manage your delivery address
                                </p>
                            </div>
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
                                    <h3 className="mb-1">{orders.filter(o => o.status === 'DELIVERED').length}</h3>
                                    <p className="mb-0">Delivered</p>
                                </Card.Body>
                            </Card>
                        </Col>
                        <Col md={3}>
                            <Card className="stats-card text-center py-3">
                                <Card.Body>
                                    <h3 className="mb-1">{orders.filter(o => o.status === 'CANCELLED' || o.status === 'CANCELED').length}</h3>
                                    <p className="mb-0">Cancelled</p>
                                </Card.Body>
                            </Card>
                        </Col>
                    </Row>

                    {/* Error Alert */}
                    {error && (
                        <Alert className="alert-custom alert-danger-custom">
                            <div className="d-flex align-items-center">
                                <i className="fas fa-exclamation-triangle me-2 fs-4"></i>
                                <strong>{error}</strong>
                            </div>
                        </Alert>
                    )}

                    {/* Loading State */}
                    {loading && (
                        <div className="loading-container">
                            <Spinner animation="border" role="status" className="loading-spinner mb-3" size="lg" />
                            <h4 className="text-muted">Loading your orders...</h4>
                            <p className="text-muted mb-0">Please wait while we fetch your order history</p>
                        </div>
                    )}

                    {/* Address Management */}
                    <Row className="mb-4">
                        <Col>
                            <Button
                                onClick={() => setShowAddressForm(!showAddressForm)}
                                className="address-toggle-btn"
                            >
                                <i className={`fas ${showAddressForm ? 'fa-eye-slash' : 'fa-map-marker-alt'} me-2`}></i>
                                {showAddressForm ? 'Hide Address Form' : 'Manage Address'}
                            </Button>

                            <Collapse in={showAddressForm}>
                                <div className="address-form-container">
                                    <AddressForm />
                                </div>
                            </Collapse>
                        </Col>
                    </Row>

                    {/* Orders Table */}
                    {!loading && (
                        <Card className="orders-card">
                            {orders.length > 0 ? (
                                <Table responsive hover className="mb-0 custom-table">
                                    <thead className="table-header">
                                        <tr>
                                            <th><i className="fas fa-hashtag me-2"></i>Order ID</th>
                                            <th><i className="fas fa-utensils me-2"></i>Tiffin Name</th>
                                            <th><i className="fas fa-sort-numeric-up me-2"></i>Quantity</th>
                                            <th><i className="fas fa-rupee-sign me-2"></i>Total Price</th>
                                            <th><i className="fas fa-info-circle me-2"></i>Status</th>
                                            <th><i className="fas fa-clock me-2"></i>Order Date/Time</th>
                                            <th><i className="fas fa-cog me-2"></i>Action</th>
                                            <th><i className="fas fa-wallet me-2"></i>Payment</th>
                                            <th><i className="fas fa-file-invoice me-2"></i>Razorpay ID</th>
                                            <th><i className="fas fa-receipt me-2"></i>Receipt</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {orders.map((order) => {
                                            const cancelable = isCancelable(order.orderTime);
                                            const timeRemaining = getTimeRemaining(order.orderTime);

                                            return (
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
                                                        <div>
                                                            <div className="text-dark fw-bold">
                                                                {new Date(order.orderTime).toLocaleDateString()}
                                                            </div>
                                                            <small className="text-muted">
                                                                {new Date(order.orderTime).toLocaleTimeString()}
                                                            </small>
                                                        </div>
                                                    </td>
                                                    <td>
                                                        {cancelable && order.status === 'PENDING' ? (
                                                            <div>
                                                                <Button
                                                                    className="cancel-btn mb-1"
                                                                    size="sm"
                                                                    onClick={() => handleCancel(order.orderId)}
                                                                >
                                                                    <i className="fas fa-times me-1"></i>
                                                                    Cancel
                                                                </Button>
                                                                <div className="time-badge">
                                                                    {timeRemaining}m left
                                                                </div>
                                                            </div>
                                                        ) : (
                                                            <span className="not-allowed-text">
                                                                <i className="fas fa-ban me-1"></i>
                                                                Not Allowed
                                                            </span>
                                                        )}
                                                    </td>
                                                    <td>
                                                        {order.paymentStatus === 'PENDING' ? (
                                                            <Button
                                                                variant="success"
                                                                size="sm"
                                                                onClick={() => initiatePayment(order.orderId)}
                                                            >
                                                                <i className="fas fa-credit-card me-1"></i>Pay Now
                                                            </Button>
                                                        ) : (
                                                            <span className="text-success fw-semibold">Paid</span>
                                                        )}
                                                    </td>
                                                    <td>
                                                        {order.paymentStatus === 'PAID' ? (
                                                            <Button
                                                                variant="outline-secondary"
                                                                size="sm"
                                                                onClick={() => downloadReceipt(order.orderId)}
                                                            >
                                                                <i className="fas fa-download me-1"></i>Download
                                                            </Button>
                                                        ) : (
                                                            <span className="text-muted fst-italic">Unavailable</span>
                                                        )}
                                                    </td>
                                                    <td>
                                                        <span className="text-muted small">{order.razorpayOrderId || 'N/A'}</span>
                                                    </td>
                                                </tr>
                                            );
                                        })}
                                    </tbody>
                                </Table>
                            ) : (
                                <div className="empty-state">
                                    <i className="fas fa-shopping-cart fa-4x mb-3 opacity-50"></i>
                                    <h4>No orders found</h4>
                                    <p className="mb-0">Your order history will appear here once you place your first order</p>
                                </div>
                            )}
                        </Card>
                    )}
                </Container>
            </div>
        </>
    );
};

export default CustomerDashboard;