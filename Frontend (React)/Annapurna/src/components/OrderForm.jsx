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
            await axios.post(
                'http://localhost:8080/api/orders/place',
                { tiffinId: parseInt(tiffinId), quantity },
                {
                    headers: {
                        Authorization: `Bearer ${token}`, // ✅ Correct syntax
                        'Content-Type': 'application/json'
                    }

                }
            );
            setMessage('✅ Order placed successfully!');
            setError('');
            setTimeout(() => navigate('/'), 1500);
        } catch (err) {
            console.error('❌ Error placing order:', err);
            setMessage('');
            setError(err.response?.data?.message || 'Order failed');
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
                    Confirm Order
                </Button>
            </Form>
        </div>
    );
};

export default OrderForm;
