import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Form, Button, Alert } from 'react-bootstrap';

const OrderForm = () => {
    const { tiffinId } = useParams();
    const [quantity, setQuantity] = useState(1);
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const token = localStorage.getItem('token');

        try {
            // Step 1: Place the order
            const orderResponse = await axios.post(
                'http://localhost:8080/api/orders/place',
                { tiffinId: parseInt(tiffinId), quantity },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        'Content-Type': 'application/json'
                    }
                }
            );

            const orderId = orderResponse.data.orderId || orderResponse.data.id;
            if (!orderId) throw new Error("Order ID missing in response");

            // Step 2: Request Razorpay Order
            const razorpayRes = await axios.post(
                `http://localhost:8080/api/orders/${orderId}/pay`,
                {},
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            const razorpayData = razorpayRes.data;

            // Step 3: Load Razorpay script dynamically
            const script = document.createElement('script');
            script.src = 'https://checkout.razorpay.com/v1/checkout.js';
            script.onload = () => {
                const options = {
                    key: 'rzp_test_OxwxzdrU2pZqIo', // Replace with your actual Razorpay key
                    amount: razorpayData.amount,
                    currency: razorpayData.currency,
                    name: 'Annapurna Tiffins',
                    description: 'Tiffin Order Payment',
                    order_id: razorpayData.id,
                    handler: async function (response) {
                        try {
                            await axios.post(`http://localhost:8080/api/orders/${orderId}/verify`, {
                                razorpay_order_id: response.razorpay_order_id,
                                razorpay_payment_id: response.razorpay_payment_id,
                                razorpay_signature: response.razorpay_signature
                            }, {
                                headers: {
                                    Authorization: `Bearer ${token}`
                                }
                            });

                            setMessage('✅ Payment Verified and Successful!');
                            setTimeout(() => navigate('/'), 2000);
                        } catch (verifyErr) {
                            console.error('Verification failed:', verifyErr);
                            setError('Payment verification failed!');
                        }
                    },
                    prefill: {
                        name: 'Customer Name',
                        email: 'customer@example.com',
                        contact: '9999999999'
                    },
                    theme: {
                        color: '#007bff'
                    }
                };
                const rzp = new window.Razorpay(options);
                rzp.open();
            };
            document.body.appendChild(script);

        } catch (err) {
            console.error('Error during order/payment:', err);
            setError(err.response?.data?.message || err.message || 'Something went wrong');
        }
    };

    return (
        <div className="container mt-4">
            <h2>Place Your Order</h2>

            {message && <Alert variant="success">{message}</Alert>}
            {error && <Alert variant="danger">{error}</Alert>}

            <Form onSubmit={handleSubmit}>
                <Form.Group>
                    <Form.Label>Tiffin ID</Form.Label>
                    <Form.Control type="text" value={tiffinId} disabled />
                </Form.Group>

                <Form.Group className="mt-3">
                    <Form.Label>Quantity</Form.Label>
                    <Form.Control
                        type="number"
                        value={quantity}
                        min={1}
                        onChange={(e) => setQuantity(Number(e.target.value))}
                    />
                </Form.Group>

                <Button variant="primary" type="submit" className="mt-3">
                    Pay & Confirm Order
                </Button>
            </Form>
        </div>
    );
};

export default OrderForm;
