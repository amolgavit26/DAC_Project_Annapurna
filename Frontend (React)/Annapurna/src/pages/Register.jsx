// src/pages/Register.jsx

import { useState } from 'react';
import { Form, Button, Container, Row, Col, Alert, Card, Badge } from 'react-bootstrap';
import api from '../services/api';
import BASE_URL from '../config';


const Register = () => {
    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        password: '',
        mobileNumber: '',
        role: 'CUSTOMER',
        address: {
            street: '',
            city: '',
            state: '',
            pinCode: '',
            country: '',
        },
    });

    const [message, setMessage] = useState('');
    const [error, setError] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;

        if (name.startsWith('address.')) {
            const addressField = name.split('.')[1];
            setFormData((prev) => ({
                ...prev,
                address: {
                    ...prev.address,
                    [addressField]: value,
                },
            }));
        } else {
            setFormData((prev) => ({
                ...prev,
                [name]: value,
            }));
        }
    };

    const handleRegister = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
        console.log('Form Data:', formData); // Log form data to inspect it before submission
        const response = await api.post(`${BASE_URL}/api/auth/register`, formData);
        setMessage('Registration successful! You can now login.');
        setError('');
        // Clear form on successful registration
        setFormData({
            fullName: '',
            email: '',
            password: '',
            mobileNumber: '',
            role: 'CUSTOMER',
            address: {
                street: '',
                city: '',
                state: '',
                pinCode: '',
                country: '',
            },
        });
    } catch (err) {
        console.error('Error Response:', err); // Log the error response
        setError(err.response?.data?.message || 'Registration failed. Please try again.');
        setMessage('');
    } finally {
        setIsSubmitting(false);
    }
};



    return (
        <div
            style={{
                minHeight: '100vh',
                background: 'linear-gradient(-45deg, #667eea, #764ba2, #f093fb, #f5576c, #4facfe, #00f2fe)',
                backgroundSize: '400% 400%',
                animation: 'gradientShift 15s ease infinite',
                display: 'flex',
                alignItems: 'center',
                position: 'relative',
                overflow: 'hidden',
                padding: '40px 0'
            }}
        >
            {/* Floating Orbs */}
            <div
                style={{
                    position: 'absolute',
                    top: '5%',
                    left: '5%',
                    width: '250px',
                    height: '250px',
                    background: 'radial-gradient(circle, rgba(255,255,255,0.1), transparent 70%)',
                    borderRadius: '50%',
                    animation: 'float1 8s ease-in-out infinite',
                    pointerEvents: 'none'
                }}
            />
            <div
                style={{
                    position: 'absolute',
                    top: '50%',
                    right: '5%',
                    width: '180px',
                    height: '180px',
                    background: 'radial-gradient(circle, rgba(255,255,255,0.08), transparent 70%)',
                    borderRadius: '50%',
                    animation: 'float2 10s ease-in-out infinite',
                    pointerEvents: 'none'
                }}
            />
            <div
                style={{
                    position: 'absolute',
                    bottom: '10%',
                    left: '15%',
                    width: '120px',
                    height: '120px',
                    background: 'radial-gradient(circle, rgba(255,255,255,0.06), transparent 70%)',
                    borderRadius: '50%',
                    animation: 'float3 12s ease-in-out infinite',
                    pointerEvents: 'none'
                }}
            />

            <Container fluid>
                <Row className="justify-content-center w-100 m-0">
                    <Col xs={12} sm={11} md={10} lg={8} xl={7}>
                        <Card 
                            style={{ 
                                background: 'rgba(255, 255, 255, 0.12)',
                                backdropFilter: 'blur(25px)',
                                borderRadius: '24px',
                                border: '1px solid rgba(255, 255, 255, 0.18)',
                                boxShadow: '0 25px 45px rgba(0,0,0,0.1), inset 0 1px 0 rgba(255,255,255,0.3)',
                                overflow: 'hidden',
                                transform: 'perspective(1000px) rotateX(0deg)',
                                transition: 'all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
                                position: 'relative'
                            }}
                            className="register-card"
                        >
                            {/* Animated Border */}
                            <div
                                style={{
                                    position: 'absolute',
                                    top: 0,
                                    left: 0,
                                    right: 0,
                                    bottom: 0,
                                    background: 'linear-gradient(45deg, transparent, rgba(255,255,255,0.1), transparent)',
                                    borderRadius: '24px',
                                    opacity: 0,
                                    transition: 'opacity 0.3s ease',
                                    pointerEvents: 'none'
                                }}
                                className="card-glow"
                            />

                            {/* Premium Header Section */}
                            <div 
                                style={{
                                    background: 'linear-gradient(135deg, rgba(255,255,255,0.2), rgba(255,255,255,0.05))',
                                    padding: '30px 30px 25px',
                                    textAlign: 'center',
                                    color: 'white',
                                    position: 'relative',
                                    borderBottom: '1px solid rgba(255,255,255,0.1)'
                                }}
                            >
                                <div
                                    style={{
                                        fontSize: '3rem',
                                        marginBottom: '10px',
                                        filter: 'drop-shadow(0 4px 12px rgba(0,0,0,0.3))',
                                        animation: 'pulse 2s ease-in-out infinite'
                                    }}
                                >
                                    🚀
                                </div>
                                <h2 style={{ 
                                    margin: 0, 
                                    fontWeight: '700',
                                    fontSize: '1.8rem',
                                    background: 'linear-gradient(135deg, #fff, rgba(255,255,255,0.8))',
                                    WebkitBackgroundClip: 'text',
                                    WebkitTextFillColor: 'transparent',
                                    textShadow: '0 2px 4px rgba(0,0,0,0.3)',
                                    letterSpacing: '-0.5px'
                                }}>
                                    Join Our Community
                                </h2>
                                <Badge 
                                    bg="light" 
                                    text="dark"
                                    style={{ 
                                        marginTop: '8px',
                                        padding: '6px 12px',
                                        fontSize: '0.8rem',
                                        fontWeight: '500',
                                        borderRadius: '20px',
                                        background: 'rgba(255,255,255,0.9)',
                                        backdropFilter: 'blur(10px)'
                                    }}
                                >
                                    ✨ Create Your Account Today
                                </Badge>
                            </div>

                            <Card.Body style={{ padding: '30px' }}>
                                {message && (
                                    <Alert 
                                        variant="success" 
                                        style={{ 
                                            borderRadius: '16px',
                                            border: 'none',
                                            background: 'linear-gradient(135deg, rgba(25, 135, 84, 0.1), rgba(25, 135, 84, 0.05))',
                                            backdropFilter: 'blur(10px)',
                                            color: '#198754',
                                            marginBottom: '20px',
                                            padding: '15px 20px',
                                            fontWeight: '500',
                                            boxShadow: '0 8px 25px rgba(25, 135, 84, 0.15)'
                                        }}
                                    >
                                        <div style={{ display: 'flex', alignItems: 'center' }}>
                                            <span style={{ marginRight: '8px', fontSize: '1.2rem' }}>✅</span>
                                            {message}
                                        </div>
                                    </Alert>
                                )}

                                {error && (
                                    <Alert 
                                        variant="danger" 
                                        style={{ 
                                            borderRadius: '16px',
                                            border: 'none',
                                            background: 'linear-gradient(135deg, rgba(220, 53, 69, 0.1), rgba(220, 53, 69, 0.05))',
                                            backdropFilter: 'blur(10px)',
                                            color: '#dc3545',
                                            marginBottom: '20px',
                                            padding: '15px 20px',
                                            fontWeight: '500',
                                            boxShadow: '0 8px 25px rgba(220, 53, 69, 0.15)'
                                        }}
                                    >
                                        <div style={{ display: 'flex', alignItems: 'center' }}>
                                            <span style={{ marginRight: '8px', fontSize: '1.2rem' }}>⚠️</span>
                                            {error}
                                        </div>
                                    </Alert>
                                )}

                                <Form onSubmit={handleRegister}>
                                    {/* Personal Information Section */}
                                    <div style={{ marginBottom: '25px' }}>
                                        <h5 style={{ 
                                            color: 'rgba(255,255,255,0.9)', 
                                            marginBottom: '15px',
                                            fontWeight: '600',
                                            display: 'flex',
                                            alignItems: 'center'
                                        }}>
                                            <span style={{ marginRight: '8px' }}>👤</span>
                                            Personal Information
                                        </h5>
                                        
                                        <Row>
                                            <Col md={6}>
                                                <Form.Group controlId="formFullName" className="mb-3">
                                                    <Form.Label style={{ 
                                                        fontWeight: '600', 
                                                        color: 'rgba(255,255,255,0.8)',
                                                        marginBottom: '8px'
                                                    }}>
                                                        Full Name
                                                    </Form.Label>
                                                    <Form.Control
                                                        type="text"
                                                        name="fullName"
                                                        placeholder="Enter your full name"
                                                        value={formData.fullName}
                                                        onChange={handleChange}
                                                        required
                                                        style={{
                                                            borderRadius: '12px',
                                                            border: '1px solid rgba(255,255,255,0.2)',
                                                            padding: '12px 16px',
                                                            fontSize: '0.95rem',
                                                            transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                                                            background: 'rgba(255,255,255,0.08)',
                                                            backdropFilter: 'blur(20px)',
                                                            color: 'white',
                                                            fontWeight: '500'
                                                        }}
                                                        onFocus={(e) => {
                                                            e.target.style.borderColor = 'rgba(255,255,255,0.4)';
                                                            e.target.style.background = 'rgba(255,255,255,0.12)';
                                                            e.target.style.boxShadow = '0 0 0 3px rgba(255,255,255,0.1)';
                                                        }}
                                                        onBlur={(e) => {
                                                            e.target.style.borderColor = 'rgba(255,255,255,0.2)';
                                                            e.target.style.background = 'rgba(255,255,255,0.08)';
                                                            e.target.style.boxShadow = 'none';
                                                        }}
                                                    />
                                                </Form.Group>
                                            </Col>
                                            <Col md={6}>
                                                <Form.Group controlId="formEmail" className="mb-3">
                                                    <Form.Label style={{ 
                                                        fontWeight: '600', 
                                                        color: 'rgba(255,255,255,0.8)',
                                                        marginBottom: '8px'
                                                    }}>
                                                        Email Address
                                                    </Form.Label>
                                                    <Form.Control
                                                        type="email"
                                                        name="email"
                                                        placeholder="Enter your email"
                                                        value={formData.email}
                                                        onChange={handleChange}
                                                        required
                                                        style={{
                                                            borderRadius: '12px',
                                                            border: '1px solid rgba(255,255,255,0.2)',
                                                            padding: '12px 16px',
                                                            fontSize: '0.95rem',
                                                            transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                                                            background: 'rgba(255,255,255,0.08)',
                                                            backdropFilter: 'blur(20px)',
                                                            color: 'white',
                                                            fontWeight: '500'
                                                        }}
                                                        onFocus={(e) => {
                                                            e.target.style.borderColor = 'rgba(255,255,255,0.4)';
                                                            e.target.style.background = 'rgba(255,255,255,0.12)';
                                                            e.target.style.boxShadow = '0 0 0 3px rgba(255,255,255,0.1)';
                                                        }}
                                                        onBlur={(e) => {
                                                            e.target.style.borderColor = 'rgba(255,255,255,0.2)';
                                                            e.target.style.background = 'rgba(255,255,255,0.08)';
                                                            e.target.style.boxShadow = 'none';
                                                        }}
                                                    />
                                                </Form.Group>
                                            </Col>
                                        </Row>

                                        <Row>
                                            <Col md={6}>
                                                <Form.Group controlId="formPassword" className="mb-3">
                                                    <Form.Label style={{ 
                                                        fontWeight: '600', 
                                                        color: 'rgba(255,255,255,0.8)',
                                                        marginBottom: '8px'
                                                    }}>
                                                        Password
                                                    </Form.Label>
                                                    <Form.Control
                                                        type="password"
                                                        name="password"
                                                        placeholder="Create a password"
                                                        value={formData.password}
                                                        onChange={handleChange}
                                                        required
                                                        style={{
                                                            borderRadius: '12px',
                                                            border: '1px solid rgba(255,255,255,0.2)',
                                                            padding: '12px 16px',
                                                            fontSize: '0.95rem',
                                                            transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                                                            background: 'rgba(255,255,255,0.08)',
                                                            backdropFilter: 'blur(20px)',
                                                            color: 'white',
                                                            fontWeight: '500'
                                                        }}
                                                        onFocus={(e) => {
                                                            e.target.style.borderColor = 'rgba(255,255,255,0.4)';
                                                            e.target.style.background = 'rgba(255,255,255,0.12)';
                                                            e.target.style.boxShadow = '0 0 0 3px rgba(255,255,255,0.1)';
                                                        }}
                                                        onBlur={(e) => {
                                                            e.target.style.borderColor = 'rgba(255,255,255,0.2)';
                                                            e.target.style.background = 'rgba(255,255,255,0.08)';
                                                            e.target.style.boxShadow = 'none';
                                                        }}
                                                    />
                                                </Form.Group>
                                            </Col>
                                            <Col md={6}>
                                                <Form.Group controlId="formMobileNumber" className="mb-3">
                                                    <Form.Label style={{ 
                                                        fontWeight: '600', 
                                                        color: 'rgba(255,255,255,0.8)',
                                                        marginBottom: '8px'
                                                    }}>
                                                        Mobile Number
                                                    </Form.Label>
                                                    <Form.Control
                                                        type="text"
                                                        name="mobileNumber"
                                                        placeholder="Enter mobile number"
                                                        value={formData.mobileNumber}
                                                        onChange={handleChange}
                                                        required
                                                        style={{
                                                            borderRadius: '12px',
                                                            border: '1px solid rgba(255,255,255,0.2)',
                                                            padding: '12px 16px',
                                                            fontSize: '0.95rem',
                                                            transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                                                            background: 'rgba(255,255,255,0.08)',
                                                            backdropFilter: 'blur(20px)',
                                                            color: 'white',
                                                            fontWeight: '500'
                                                        }}
                                                        onFocus={(e) => {
                                                            e.target.style.borderColor = 'rgba(255,255,255,0.4)';
                                                            e.target.style.background = 'rgba(255,255,255,0.12)';
                                                            e.target.style.boxShadow = '0 0 0 3px rgba(255,255,255,0.1)';
                                                        }}
                                                        onBlur={(e) => {
                                                            e.target.style.borderColor = 'rgba(255,255,255,0.2)';
                                                            e.target.style.background = 'rgba(255,255,255,0.08)';
                                                            e.target.style.boxShadow = 'none';
                                                        }}
                                                    />
                                                </Form.Group>
                                            </Col>
                                        </Row>

                                        <Form.Group controlId="formRole" className="mb-3">
                                            <Form.Label style={{ 
                                                fontWeight: '600', 
                                                color: 'rgba(255,255,255,0.8)',
                                                marginBottom: '8px'
                                            }}>
                                                Account Type
                                            </Form.Label>
                                            <Form.Select
                                                name="role"
                                                value={formData.role}
                                                onChange={handleChange}
                                                required
                                                style={{
                                                    borderRadius: '12px',
                                                    border: '1px solid rgba(255,255,255,0.2)',
                                                    padding: '12px 16px',
                                                    fontSize: '0.95rem',
                                                    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                                                    background: 'rgba(255,255,255,0.08)',
                                                    backdropFilter: 'blur(20px)',
                                                    color: 'white',
                                                    fontWeight: '500'
                                                }}
                                                onFocus={(e) => {
                                                    e.target.style.borderColor = 'rgba(255,255,255,0.4)';
                                                    e.target.style.background = 'rgba(255,255,255,0.12)';
                                                    e.target.style.boxShadow = '0 0 0 3px rgba(255,255,255,0.1)';
                                                }}
                                                onBlur={(e) => {
                                                    e.target.style.borderColor = 'rgba(255,255,255,0.2)';
                                                    e.target.style.background = 'rgba(255,255,255,0.08)';
                                                    e.target.style.boxShadow = 'none';
                                                }}
                                            >
                                                <option value="CUSTOMER" style={{ background: '#333', color: 'white' }}>Customer</option>
                                                <option value="VENDOR" style={{ background: '#333', color: 'white' }}>Vendor</option>
                                                <option value="ADMIN" style={{ background: '#333', color: 'white' }}>Admin</option>
                                            </Form.Select>
                                        </Form.Group>
                                    </div>

                                    {/* Address Information Section */}
                                    <Card 
                                        style={{ 
                                            marginBottom: '25px',
                                            background: 'rgba(255,255,255,0.05)',
                                            backdropFilter: 'blur(20px)',
                                            border: '1px solid rgba(255,255,255,0.1)',
                                            borderRadius: '16px'
                                        }}
                                    >
                                        <Card.Header 
                                            style={{
                                                background: 'linear-gradient(135deg, rgba(255,255,255,0.15), rgba(255,255,255,0.08))',
                                                border: 'none',
                                                borderRadius: '16px 16px 0 0',
                                                padding: '15px 20px'
                                            }}
                                        >
                                            <h5 style={{ 
                                                margin: 0, 
                                                color: 'rgba(255,255,255,0.9)',
                                                fontWeight: '600',
                                                display: 'flex',
                                                alignItems: 'center'
                                            }}>
                                                <span style={{ marginRight: '8px' }}>🏠</span>
                                                Address Information
                                            </h5>
                                        </Card.Header>
                                        <Card.Body style={{ padding: '20px' }}>
                                            <Row>
                                                <Col md={8}>
                                                    <Form.Group controlId="formStreet" className="mb-3">
                                                        <Form.Label style={{ 
                                                            fontWeight: '600', 
                                                            color: 'rgba(255,255,255,0.8)',
                                                            marginBottom: '8px'
                                                        }}>
                                                            Street Address
                                                        </Form.Label>
                                                        <Form.Control
                                                            type="text"
                                                            name="address.street"
                                                            placeholder="Enter street address"
                                                            value={formData.address.street}
                                                            onChange={handleChange}
                                                            required
                                                            style={{
                                                                borderRadius: '12px',
                                                                border: '1px solid rgba(255,255,255,0.2)',
                                                                padding: '12px 16px',
                                                                fontSize: '0.95rem',
                                                                transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                                                                background: 'rgba(255,255,255,0.08)',
                                                                backdropFilter: 'blur(20px)',
                                                                color: 'white',
                                                                fontWeight: '500'
                                                            }}
                                                            onFocus={(e) => {
                                                                e.target.style.borderColor = 'rgba(255,255,255,0.4)';
                                                                e.target.style.background = 'rgba(255,255,255,0.12)';
                                                                e.target.style.boxShadow = '0 0 0 3px rgba(255,255,255,0.1)';
                                                            }}
                                                            onBlur={(e) => {
                                                                e.target.style.borderColor = 'rgba(255,255,255,0.2)';
                                                                e.target.style.background = 'rgba(255,255,255,0.08)';
                                                                e.target.style.boxShadow = 'none';
                                                            }}
                                                        />
                                                    </Form.Group>
                                                </Col>
                                                <Col md={4}>
                                                    <Form.Group controlId="formPinCode" className="mb-3">
                                                        <Form.Label style={{ 
                                                            fontWeight: '600', 
                                                            color: 'rgba(255,255,255,0.8)',
                                                            marginBottom: '8px'
                                                        }}>
                                                            Pin Code
                                                        </Form.Label>
                                                        <Form.Control
                                                            type="text"
                                                            name="address.pinCode"
                                                            placeholder="Pin Code"
                                                            value={formData.address.pinCode}
                                                            onChange={handleChange}
                                                            required
                                                            style={{
                                                                borderRadius: '12px',
                                                                border: '1px solid rgba(255,255,255,0.2)',
                                                                padding: '12px 16px',
                                                                fontSize: '0.95rem',
                                                                transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                                                                background: 'rgba(255,255,255,0.08)',
                                                                backdropFilter: 'blur(20px)',
                                                                color: 'white',
                                                                fontWeight: '500'
                                                            }}
                                                            onFocus={(e) => {
                                                                e.target.style.borderColor = 'rgba(255,255,255,0.4)';
                                                                e.target.style.background = 'rgba(255,255,255,0.12)';
                                                                e.target.style.boxShadow = '0 0 0 3px rgba(255,255,255,0.1)';
                                                            }}
                                                            onBlur={(e) => {
                                                                e.target.style.borderColor = 'rgba(255,255,255,0.2)';
                                                                e.target.style.background = 'rgba(255,255,255,0.08)';
                                                                e.target.style.boxShadow = 'none';
                                                            }}
                                                        />
                                                    </Form.Group>
                                                </Col>
                                            </Row>

                                            <Row>
                                                <Col md={6}>
                                                    <Form.Group controlId="formCity" className="mb-3">
                                                        <Form.Label style={{ 
                                                            fontWeight: '600', 
                                                            color: 'rgba(255,255,255,0.8)',
                                                            marginBottom: '8px'
                                                        }}>
                                                            City
                                                        </Form.Label>
                                                        <Form.Control
                                                            type="text"
                                                            name="address.city"
                                                            placeholder="Enter city"
                                                            value={formData.address.city}
                                                            onChange={handleChange}
                                                            required
                                                            style={{
                                                                borderRadius: '12px',
                                                                border: '1px solid rgba(255,255,255,0.2)',
                                                                padding: '12px 16px',
                                                                fontSize: '0.95rem',
                                                                transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                                                                background: 'rgba(255,255,255,0.08)',
                                                                backdropFilter: 'blur(20px)',
                                                                color: 'white',
                                                                fontWeight: '500'
                                                            }}
                                                            onFocus={(e) => {
                                                                e.target.style.borderColor = 'rgba(255,255,255,0.4)';
                                                                e.target.style.background = 'rgba(255,255,255,0.12)';
                                                                e.target.style.boxShadow = '0 0 0 3px rgba(255,255,255,0.1)';
                                                            }}
                                                            onBlur={(e) => {
                                                                e.target.style.borderColor = 'rgba(255,255,255,0.2)';
                                                                e.target.style.background = 'rgba(255,255,255,0.08)';
                                                                e.target.style.boxShadow = 'none';
                                                            }}
                                                        />
                                                    </Form.Group>
                                                </Col>
                                                <Col md={6}>
                                                    <Form.Group controlId="formState" className="mb-3">
                                                        <Form.Label style={{ 
                                                            fontWeight: '600', 
                                                            color: 'rgba(255,255,255,0.8)',
                                                            marginBottom: '8px'
                                                        }}>
                                                            State
                                                        </Form.Label>
                                                        <Form.Control
                                                            type="text"
                                                            name="address.state"
                                                            placeholder="Enter state"
                                                            value={formData.address.state}
                                                            onChange={handleChange}
                                                            required
                                                            style={{
                                                                borderRadius: '12px',
                                                                border: '1px solid rgba(255,255,255,0.2)',
                                                                padding: '12px 16px',
                                                                fontSize: '0.95rem',
                                                                transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                                                                background: 'rgba(255,255,255,0.08)',
                                                                backdropFilter: 'blur(20px)',
                                                                color: 'white',
                                                                fontWeight: '500'
                                                            }}
                                                            onFocus={(e) => {
                                                                e.target.style.borderColor = 'rgba(255,255,255,0.4)';
                                                                e.target.style.background = 'rgba(255,255,255,0.12)';
                                                                e.target.style.boxShadow = '0 0 0 3px rgba(255,255,255,0.1)';
                                                            }}
                                                            onBlur={(e) => {
                                                                e.target.style.borderColor = 'rgba(255,255,255,0.2)';
                                                                e.target.style.background = 'rgba(255,255,255,0.08)';
                                                                e.target.style.boxShadow = 'none';
                                                            }}
                                                        />
                                                    </Form.Group>
                                                </Col>
                                            </Row>

                                            <Form.Group controlId="formCountry" className="mb-3">
                                                <Form.Label style={{ 
                                                    fontWeight: '600', 
                                                    color: 'rgba(255,255,255,0.8)',
                                                    marginBottom: '8px'
                                                }}>
                                                    Country
                                                </Form.Label>
                                                <Form.Control
                                                    type="text"
                                                    name="address.country"
                                                    placeholder="Enter country"
                                                    value={formData.address.country}
                                                    onChange={handleChange}
                                                    required
                                                    style={{
                                                        borderRadius: '12px',
                                                        border: '1px solid rgba(255,255,255,0.2)',
                                                        padding: '12px 16px',
                                                        fontSize: '0.95rem',
                                                        transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                                                        background: 'rgba(255,255,255,0.08)',
                                                        backdropFilter: 'blur(20px)',
                                                        color: 'white',
                                                        fontWeight: '500'
                                                    }}
                                                    onFocus={(e) => {
                                                        e.target.style.borderColor = 'rgba(255,255,255,0.4)';
                                                        e.target.style.background = 'rgba(255,255,255,0.12)';
                                                        e.target.style.boxShadow = '0 0 0 3px rgba(255,255,255,0.1)';
                                                    }}
                                                    onBlur={(e) => {
                                                        e.target.style.borderColor = 'rgba(255,255,255,0.2)';
                                                        e.target.style.background = 'rgba(255,255,255,0.08)';
                                                        e.target.style.boxShadow = 'none';
                                                    }}
                                                />
                                            </Form.Group>
                                        </Card.Body>
                                    </Card>

                                    <div className="d-grid gap-2 mb-4">
                                        <Button 
                                            variant="primary" 
                                            type="submit" 
                                            size="lg"
                                            disabled={isSubmitting}
                                            style={{ 
                                                background: 'linear-gradient(135deg, rgba(255,255,255,0.2), rgba(255,255,255,0.1))',
                                                border: '1px solid rgba(255,255,255,0.3)',
                                                borderRadius: '16px',
                                                padding: '14px 24px',
                                                fontSize: '1.05rem',
                                                fontWeight: '600',
                                                transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                                                boxShadow: '0 8px 25px rgba(0,0,0,0.15), inset 0 1px 0 rgba(255,255,255,0.3)',
                                                position: 'relative',
                                                overflow: 'hidden',
                                                color: 'white',
                                                textShadow: '0 1px 2px rgba(0,0,0,0.3)',
                                                backdropFilter: 'blur(20px)'
                                            }}
                                            onMouseEnter={(e) => {
                                                if (!isSubmitting) {
                                                    e.target.style.transform = 'translateY(-3px) scale(1.02)';
                                                    e.target.style.boxShadow = '0 12px 35px rgba(0,0,0,0.2), inset 0 1px 0 rgba(255,255,255,0.4)';
                                                    e.target.style.background = 'linear-gradient(135deg, rgba(255,255,255,0.25), rgba(255,255,255,0.15))';
                                                }
                                            }}
                                            onMouseLeave={(e) => {
                                                if (!isSubmitting) {
                                                    e.target.style.transform = 'translateY(0) scale(1)';
                                                    e.target.style.boxShadow = '0 8px 25px rgba(0,0,0,0.15), inset 0 1px 0 rgba(255,255,255,0.3)';
                                                    e.target.style.background = 'linear-gradient(135deg, rgba(255,255,255,0.2), rgba(255,255,255,0.1))';
                                                }
                                            }}
                                        >
                                            {isSubmitting ? (
                                                <>
                                                    <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                                                    Creating Account...
                                                </>
                                            ) : (
                                                <>
                                                    <span style={{ marginRight: '8px' }}>🚀</span>
                                                    Create Account
                                                </>
                                            )}
                                        </Button>
                                    </div>

                                    <div 
                                        className="text-center" 
                                        style={{ 
                                            fontSize: '0.95rem',
                                            color: 'rgba(255, 255, 255, 0.42)'
                                        }}
                                    >
                                        <div style={{ 
                                            padding: '20px',
                                            borderRadius: '12px',
                                            background: 'rgba(255,255,255,0.05)',
                                            backdropFilter: 'blur(20px)',
                                            border: '1px solid rgba(255,255,255,0.1)'
                                        }}>
                                            Already have an account?{' '}
                                            <a 
                                                href="/login" 
                                                style={{ 
                                                    color: '#fff',
                                                    textDecoration: 'none',
                                                    fontWeight: '600',
                                                    transition: 'all 0.3s ease',
                                                    padding: '8px 16px',
                                                    borderRadius: '8px',
                                                    background: 'rgba(255,255,255,0.1)',
                                                    backdropFilter: 'blur(10px)',
                                                    border: '1px solid rgba(255,255,255,0.2)',
                                                    display: 'inline-block',
                                                    marginTop: '8px'
                                                }}
                                                onMouseEnter={(e) => {
                                                    e.target.style.background = 'rgba(255,255,255,0.2)';
                                                    e.target.style.transform = 'translateY(-2px)';
                                                    e.target.style.boxShadow = '0 4px 15px rgba(0,0,0,0.1)';
                                                }}
                                                onMouseLeave={(e) => {
                                                    e.target.style.background = 'rgba(255,255,255,0.1)';
                                                    e.target.style.transform = 'translateY(0)';
                                                    e.target.style.boxShadow = 'none';
                                                }}
                                            >
                                                🔐 Sign In Here
                                            </a>
                                        </div>
                                    </div>
                                </Form>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Container>

            <style>{`
                @keyframes gradientShift {
                    0% { background-position: 0% 50%; }
                    50% { background-position: 100% 50%; }
                    100% { background-position: 0% 50%; }
                }
                
                @keyframes float1 {
                    0%, 100% { transform: translateY(0px) translateX(0px) rotate(0deg); }
                    33% { transform: translateY(-30px) translateX(20px) rotate(120deg); }
                    66% { transform: translateY(20px) translateX(-15px) rotate(240deg); }
                }
                
                @keyframes float2 {
                    0%, 100% { transform: translateY(0px) translateX(0px) rotate(0deg); }
                    50% { transform: translateY(-25px) translateX(-20px) rotate(180deg); }
                }
                
                @keyframes float3 {
                    0%, 100% { transform: translateY(0px) translateX(0px) rotate(0deg); }
                    25% { transform: translateY(-15px) translateX(15px) rotate(90deg); }
                    75% { transform: translateY(15px) translateX(-10px) rotate(270deg); }
                }
                
                @keyframes pulse {
                    0%, 100% { transform: scale(1); }
                    50% { transform: scale(1.05); }
                }
                
                .register-card:hover {
                    transform: perspective(1000px) rotateX(1deg) translateY(-5px) !important;
                    box-shadow: 0 30px 60px rgba(0,0,0,0.15), inset 0 1px 0 rgba(255,255,255,0.4) !important;
                }
                
                .register-card:hover .card-glow {
                    opacity: 1;
                }
                
                input::placeholder, select::placeholder {
                    color: rgba(255, 255, 255, 0.47) !important;
                }
                
                select option {
                    background: #333 !important;
                    color: white !important;
                }
                
                @media (max-width: 768px) {
                    .register-card {
                        margin: 15px;
                    }
                }
                
                @media (max-width: 576px) {
                    .register-card {
                        margin: 10px;
                    }
                }
            `}</style>
        </div>
    );
};

export default Register;