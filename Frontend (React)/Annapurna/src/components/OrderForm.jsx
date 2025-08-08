import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Form, Button, Alert, Card, Container, Row, Col, InputGroup } from 'react-bootstrap';
import BASE_URL from '../config';
import api from '../services/api';

const OrderForm = () => {
    const { tiffinId } = useParams();
    const [quantity, setQuantity] = useState(1);
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        const token = localStorage.getItem('token');

        try {
            // Step 1: Place the order
            const orderResponse = await api.post(
                `${BASE_URL}/api/orders/place`,
                { tiffinId: parseInt(tiffinId), quantity },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        'Content-Type': 'application/json'
                    }
                }
            );

            const orderData = orderResponse.data;
            const orderId = orderData.orderId || orderData.id;

            if (!orderId) throw new Error("Order ID missing in response");

            // ✅ This line updated:
            setMessage(`✅ Order placed for "${orderData.tiffinName}"! Initializing payment...`);
            setError('');

            // Step 2: Initiate Razorpay order
            const razorpayRes = await api.post(
                `${BASE_URL}/api/orders/${orderId}/pay`,
                {},
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            const razorpayData = razorpayRes.data;

            // Step 3: Load Razorpay script
            const script = document.createElement('script');
            script.src = 'https://checkout.razorpay.com/v1/checkout.js';

            script.onload = () => {
                const options = {
                    key: 'rzp_test_OxwxzdrU2pZqIo', // Use your Razorpay test/live key
                    amount: razorpayData.amount,
                    currency: razorpayData.currency,
                    name: 'Annapurna Tiffins',
                    description: 'Tiffin Order Payment',
                    order_id: razorpayData.id,
                    handler: async function (response) {
                        try {
                            // Step 4: Verify payment
                            await api.post(
                                `${BASE_URL}/api/orders/${orderId}/verify`,
                                {
                                    razorpay_order_id: response.razorpay_order_id,
                                    razorpay_payment_id: response.razorpay_payment_id,
                                    razorpay_signature: response.razorpay_signature,
                                },
                                {
                                    headers: {
                                        Authorization: `Bearer ${token}`,
                                        'Content-Type': 'application/json'
                                    }
                                }
                            );

                            alert('✅ Payment successful and verified!');
                            navigate('/customer/dashboard');
                        } catch (verifyErr) {
                            console.error('❌ Verification failed:', verifyErr);
                            alert('⚠️ Payment verification failed!');
                        }
                    },
                    prefill: {
                        name: 'Test User',
                        email: 'test@example.com',
                        contact: '9999999999'
                    },
                    theme: {
                        color: '#667eea'
                    }
                };

                const rzp = new window.Razorpay(options);
                rzp.open();
            };

            document.body.appendChild(script);
        } catch (err) {
            console.error('❌ Error during order/payment:', err);
            setMessage('');
            setError(err.response?.data?.message || err.message || 'Something went wrong');
        } finally {
            setIsSubmitting(false);
        }
    };


    const handleQuantityChange = (change) => {
        const newQuantity = quantity + change;
        if (newQuantity >= 1) {
            setQuantity(newQuantity);
        }
    };

    const customStyles = `
        .gradient-bg {
            background: linear-gradient(135deg, #f8faff 0%, #f1f5ff 100%);
            min-height: 100vh;
            padding: 2rem 0;
        }
        
        .order-card {
            border: none;
            border-radius: 20px;
            box-shadow: 0 15px 35px rgba(102, 126, 234, 0.1);
            overflow: hidden;
            background: white;
        }
        
        .card-header-gradient {
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
            padding: 2rem;
            text-align: center;
            border: none;
        }
        
        .form-container {
            padding: 2.5rem;
        }
        
        .custom-form-control {
            border: 2px solid #e0e7ff;
            border-radius: 12px;
            padding: 0.75rem 1rem;
            font-size: 1rem;
            transition: all 0.3s ease;
            background: linear-gradient(135deg, #fdfdff 0%, #f8faff 100%);
        }
        
        .custom-form-control:focus {
            border-color: #667eea;
            box-shadow: 0 0 0 0.25rem rgba(102, 126, 234, 0.15);
            background: white;
        }
        
        .custom-form-control:disabled {
            background: linear-gradient(135deg, #f1f5ff 0%, #e0e7ff 100%);
            color: #667eea;
            font-weight: 600;
        }
        
        .form-label-custom {
            color: #4c51bf;
            font-weight: 600;
            font-size: 1rem;
            margin-bottom: 0.75rem;
            display: flex;
            align-items: center;
        }
        
        .quantity-controls {
            background: white;
            border: 2px solid #e0e7ff;
            border-radius: 12px;
            overflow: hidden;
        }
        
        .quantity-btn {
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            border: none;
            color: white;
            padding: 0.75rem 1rem;
            transition: all 0.3s ease;
            font-weight: 600;
            font-size: 1.2rem;
        }
        
        .quantity-btn:hover {
            background: linear-gradient(135deg, #5a67d8 0%, #6b46c1 100%);
            transform: scale(1.05);
        }
        
        .quantity-input {
            border: none;
            text-align: center;
            font-weight: 700;
            font-size: 1.2rem;
            color: #667eea;
            background: transparent;
            min-width: 80px;
        }
        
        .quantity-input:focus {
            box-shadow: none;
            outline: none;
        }
        
        .submit-btn {
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            border: none;
            border-radius: 50px;
            padding: 1rem 3rem;
            font-weight: 700;
            font-size: 1.1rem;
            text-transform: uppercase;
            letter-spacing: 1px;
            transition: all 0.3s ease;
            position: relative;
            overflow: hidden;
        }
        
        .submit-btn:hover {
            background: linear-gradient(135deg, #5a67d8 0%, #6b46c1 100%);
            transform: translateY(-2px);
            box-shadow: 0 10px 25px rgba(102, 126, 234, 0.3);
        }
        
        .submit-btn:disabled {
            background: linear-gradient(135deg, #a0aec0 0%, #cbd5e0 100%);
            transform: none;
            box-shadow: none;
        }
        
        .back-btn {
            background: transparent;
            border: 2px solid #667eea;
            color: #667eea;
            border-radius: 50px;
            padding: 0.75rem 2rem;
            font-weight: 600;
            transition: all 0.3s ease;
        }
        
        .back-btn:hover {
            background: #667eea;
            color: white;
            transform: translateY(-2px);
        }
        
        .alert-custom-success {
            background: linear-gradient(135deg, #48bb78 0%, #38a169 100%);
            border: none;
            border-radius: 12px;
            color: white;
            padding: 1rem 1.5rem;
            margin-bottom: 1.5rem;
        }
        
        .alert-custom-danger {
            background: linear-gradient(135deg, #f56565 0%, #e53e3e 100%);
            border: none;
            border-radius: 12px;
            color: white;
            padding: 1rem 1.5rem;
            margin-bottom: 1.5rem;
        }
        
        .order-icon {
            font-size: 3rem;
            margin-bottom: 1rem;
            opacity: 0.9;
        }
        
        .form-group-spacing {
            margin-bottom: 2rem;
        }
        
        .loading-spinner {
            width: 20px;
            height: 20px;
            margin-right: 0.5rem;
        }
    `;

    return (
        <>
            <style>{customStyles}</style>
            <div className="gradient-bg">
                <Container>
                    <Row className="justify-content-center">
                        <Col lg={8} xl={6}>
                            <Card className="order-card">
                                <Card.Header className="card-header-gradient">
                                    <div className="order-icon">🍽️</div>
                                    <h1 className="mb-0 display-6">Place Your Order</h1>
                                    <p className="mb-0 mt-2 opacity-75">
                                        Complete your tiffin order in just a few steps
                                    </p>
                                </Card.Header>

                                <div className="form-container">
                                    {message && (
                                        <Alert className="alert-custom-success">
                                            <div className="d-flex align-items-center">
                                                <i className="fas fa-check-circle me-2 fs-4"></i>
                                                <strong>{message}</strong>
                                            </div>
                                        </Alert>
                                    )}

                                    {error && (
                                        <Alert className="alert-custom-danger">
                                            <div className="d-flex align-items-center">
                                                <i className="fas fa-exclamation-triangle me-2 fs-4"></i>
                                                <strong>{error}</strong>
                                            </div>
                                        </Alert>
                                    )}

                                    <Form onSubmit={handleSubmit}>
                                        <Form.Group className="form-group-spacing">
                                            <Form.Label className="form-label-custom">
                                                <i className="fas fa-hashtag me-2"></i>
                                                Tiffin ID
                                            </Form.Label>
                                            <Form.Control
                                                type="text"
                                                value={tiffinId}
                                                disabled
                                                className="custom-form-control"
                                            />
                                            <Form.Text className="text-muted mt-1">
                                                <i className="fas fa-info-circle me-1"></i>
                                                This is your selected tiffin item
                                            </Form.Text>
                                        </Form.Group>

                                        <Form.Group className="form-group-spacing">
                                            <Form.Label className="form-label-custom">
                                                <i className="fas fa-sort-numeric-up me-2"></i>
                                                Quantity
                                            </Form.Label>
                                            <InputGroup className="quantity-controls">
                                                <Button
                                                    className="quantity-btn"
                                                    onClick={() => handleQuantityChange(-1)}
                                                    disabled={quantity <= 1 || isSubmitting}
                                                    type="button"
                                                >
                                                    <i className="fas fa-minus"></i>
                                                </Button>
                                                <Form.Control
                                                    type="number"
                                                    value={quantity}
                                                    min={1}
                                                    onChange={(e) => setQuantity(Number(e.target.value))}
                                                    className="quantity-input"
                                                    disabled={isSubmitting}
                                                />
                                                <Button
                                                    className="quantity-btn"
                                                    onClick={() => handleQuantityChange(1)}
                                                    disabled={isSubmitting}
                                                    type="button"
                                                >
                                                    <i className="fas fa-plus"></i>
                                                </Button>
                                            </InputGroup>
                                            <Form.Text className="text-muted mt-1">
                                                <i className="fas fa-utensils me-1"></i>
                                                Select the number of tiffin boxes you want
                                            </Form.Text>
                                        </Form.Group>

                                        <div className="d-grid gap-3 mt-4">
                                            <Button
                                                type="submit"
                                                className="submit-btn"
                                                disabled={isSubmitting}
                                            >
                                                {isSubmitting ? (
                                                    <>
                                                        <div className="spinner-border loading-spinner" role="status">
                                                            <span className="visually-hidden">Loading...</span>
                                                        </div>
                                                        Processing Order...
                                                    </>
                                                ) : (
                                                    <>
                                                        <i className="fas fa-shopping-cart me-2"></i>
                                                        Confirm Order
                                                    </>
                                                )}
                                            </Button>

                                            <Button
                                                variant="outline-primary"
                                                className="back-btn"
                                                onClick={() => navigate('/')}
                                                disabled={isSubmitting}
                                                type="button"
                                            >
                                                <i className="fas fa-arrow-left me-2"></i>
                                                Back to Menu
                                            </Button>
                                        </div>
                                    </Form>
                                </div>
                            </Card>
                        </Col>
                    </Row>
                </Container>
            </div>
        </>
    );
};

export default OrderForm;