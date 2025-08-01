import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Table, Form, Spinner } from 'react-bootstrap';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

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
            const res = await axios.get('http://localhost:8080/api/vendor/orders', {
                headers: {
                    Authorization: token.startsWith('Bearer') ? token : `Bearer ${token}`
                }
            });
            setOrders(res.data);
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
            await axios.patch(
                `http://localhost:8080/api/vendor/orders/${orderId}/status`,
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



    return (
        <div className="container mt-4">
            <h2>Vendor Orders</h2>

            {loading ? (
                <div className="text-center mt-4">
                    <Spinner animation="border" role="status" />
                    <span className="ms-2">Loading orders...</span>
                </div>
            ) : (
                <Table striped bordered hover responsive>
                    <thead>
                        <tr>
                            <th>Order ID</th>
                            <th>Tiffin Name</th>
                            <th>Quantity</th>
                            <th>Total Price</th>
                            <th>Status</th>
                            <th>Customer Name</th>
                            <th>Customer Email</th>
                            <th>Customer Mobile</th>
                            <th>Update Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {orders.length === 0 ? (
                            <tr>
                                <td colSpan="9" className="text-center">No orders found.</td>
                            </tr>
                        ) : (
                            orders.map((order) => (
                                <tr key={order.orderId}>
                                    <td>{order.orderId}</td>
                                    <td>{order.tiffinName}</td>
                                    <td>{order.quantity}</td>
                                    <td>₹{order.totalPrice}</td>
                                    <td>{order.status}</td>
                                    <td>{order.customerName}</td>
                                    <td>{order.customerEmail}</td>
                                    <td>{order.customerMobileNumber}</td>
                                    <td>
                                        <Form.Select
                                            value={order.status}
                                            onChange={(e) => handleStatusChange(order.orderId, e.target.value)}
                                            disabled={statusUpdating === order.orderId}
                                        >
                                            {/* Disable selecting the same status again */}
                                            <option value="PENDING">PENDING</option>
                                            <option value="ACCEPTED">ACCEPTED</option>
                                            <option value="DELIVERED">DELIVERED</option>
                                            <option value="REJECTED">REJECTED</option>
                                        </Form.Select>

                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </Table>
            )}
        </div>
    );
};

export default VendorOrders;
