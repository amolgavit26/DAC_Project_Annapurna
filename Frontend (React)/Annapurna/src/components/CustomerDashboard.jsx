import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Table, Alert, Spinner, Button } from 'react-bootstrap';
import AddressForm from './AddressForm';

const CustomerDashboard = () => {
    const [orders, setOrders] = useState([]);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(true);
    const [showAddressForm, setShowAddressForm] = useState(false);

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
            console.error('Error fetching orders:', err);
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
            alert('Order cancelled successfully!');
            fetchOrders();
        } catch (err) {
            console.error('Failed to cancel order:', err);
            alert(err.response?.data?.message || 'Cancel failed');
        }
    };

    const isCancelable = (orderTime) => {
        const placedTime = new Date(orderTime);
        const now = new Date();
        const diffInMinutes = (now - placedTime) / (1000 * 60);
        return diffInMinutes <= 5;
    };

    const initiatePayment = async (orderId) => {
        const token = localStorage.getItem('token');
        try {
            const razorpayRes = await axios.post(
                `http://localhost:8080/api/orders/${orderId}/pay`,
                {},
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            const data = razorpayRes.data;

            const script = document.createElement('script');
            script.src = 'https://checkout.razorpay.com/v1/checkout.js';
            script.onload = () => {
                const rzp = new window.Razorpay({
                    key: 'rzp_test_OxwxzdrU2pZqIo', // 🔁 Replace with your actual Razorpay Key ID
                    amount: data.amount,
                    currency: data.currency,
                    name: 'Annapurna Tiffins',
                    description: 'Tiffin Payment',
                    order_id: data.id,
                    handler: function (response) {
                        alert('Payment Successful!');
                        fetchOrders(); // Refresh order list after payment
                    },
                    theme: { color: '#007bff' }
                });
                rzp.open();
            };
            document.body.appendChild(script);
        } catch (err) {
            console.error('Payment failed:', err);
            alert('Payment initiation failed.');
        }
    };

    return (
        <div className="container mt-4">
            <h2>Customer Dashboard</h2>

            {error && <Alert variant="danger">{error}</Alert>}
            {loading && <Spinner animation="border" variant="primary" />}

            <Button
                onClick={() => setShowAddressForm(!showAddressForm)}
                variant="outline-primary"
                className="mb-3"
            >
                {showAddressForm ? 'Hide Address Form' : 'Manage Address'}
            </Button>

            {showAddressForm && <AddressForm />}

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
                            <th>Razorpay ID</th>
                            <th>Action</th>
                            <th>Payment</th>
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
                                    <td>{order.razorpayOrderId || 'N/A'}</td>
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
                                    <td>
                                        {order.paymentStatus === 'PENDING' ? (
                                            <Button
                                                variant="success"
                                                size="sm"
                                                onClick={() => initiatePayment(order.orderId)}
                                            >
                                                Pay Now
                                            </Button>
                                        ) : (
                                            <span style={{ color: 'green' }}>Paid</span>
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
