import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Table, Alert, Spinner, Button } from 'react-bootstrap';
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
            setOrders(Array.isArray(response.data) ? response.data : []);
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

    return (
        <div className="container mt-4">
            <h2>Customer Dashboard</h2>

            {error && <Alert variant="danger">{error}</Alert>}
            {loading && <Spinner animation="border" variant="primary" />}

            {/* ✅ Address Toggle Button */}
            <Button
                onClick={() => setShowAddressForm(!showAddressForm)}
                variant="outline-primary"
                className="mb-3"
            >
                {showAddressForm ? 'Hide Address Form' : 'Manage Address'}
            </Button>

            {/* ✅ Address Form if visible */}
            {showAddressForm && <AddressForm />}

            {/* Orders Table */}
            {!loading && orders.length > 0 && (
                <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th>Order ID</th>
                            <th>Tiffin Name</th>
                            <th>Quantity</th>
                            <th>Total Price</th>
                            <th>Status</th>
                            <th>Order Time</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {orders.map((order) => {
                            const cancelable = isCancelable(order.orderTime);
                            return (
                                <tr key={order.orderId}>
                                    <td>{order.orderId}</td>
                                    <td>{order.tiffinName}</td>
                                    <td>{order.quantity}</td>
                                    <td>₹{order.totalPrice}</td>
                                    <td>{order.status}</td>
                                    <td>{new Date(order.orderTime).toLocaleString()}</td>
                                    <td>
                                        {cancelable && order.status === 'PENDING' ? (
                                            <Button
                                                variant="danger"
                                                size="sm"
                                                onClick={() => handleCancel(order.orderId)}
                                            >
                                                Cancel
                                            </Button>
                                        ) : (
                                            <span style={{ color: 'gray' }}>Not Allowed</span>
                                        )}
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </Table>
            )}
        </div>
    );
};

export default CustomerDashboard;
