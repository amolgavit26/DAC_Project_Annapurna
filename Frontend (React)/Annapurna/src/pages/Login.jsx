import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Form, Button, Container, Alert, Spinner, Card, Row, Col, Badge } from 'react-bootstrap';
import { toast } from 'react-toastify';
import { jwtDecode } from 'jwt-decode';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            const response = await axios.post('http://localhost:8080/api/auth/login', {
                email,
                password
            });

            const { token, userId } = response.data;
            const pureToken = token.replace('Bearer ', '');
            const decoded = jwtDecode(pureToken);
            const role = decoded.role;

            if (!token || !role || !userId) {
                throw new Error('Invalid login response: token, role, or userId missing');
            }

            localStorage.setItem('token', pureToken);
            localStorage.setItem('role', role);
            localStorage.setItem('userId', userId);

            toast.success('Login successful!');
            console.log('🔐 Logged in as:', role, '🆔 ID:', userId);

            if (role === 'CUSTOMER') navigate('/customer/dashboard');
            else if (role === 'ADMIN') navigate('/admin/dashboard');
            else if (role === 'VENDOR') navigate('/vendor/dashboard');
            else navigate('/');
        } catch (err) {
            const msg = err.response?.data?.message || err.message || 'Login failed';
            setError(msg);
            toast.error(msg);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div
            style={{
                height: '100vh',
                background: 'linear-gradient(-45deg, #667eea, #764ba2, #f093fb, #f5576c, #4facfe, #00f2fe)',
                backgroundSize: '400% 400%',
                animation: 'gradientShift 15s ease infinite',
                display: 'flex',
                alignItems: 'center',
                position: 'relative',
                overflow: 'hidden'
            }}
        >
            {/* Floating Orbs */}
            <div
                style={{
                    position: 'absolute',
                    top: '10%',
                    left: '10%',
                    width: '300px',
                    height: '300px',
                    background: 'radial-gradient(circle, rgba(255,255,255,0.1), transparent 70%)',
                    borderRadius: '50%',
                    animation: 'float1 6s ease-in-out infinite',
                    pointerEvents: 'none'
                }}
            />
            <div
                style={{
                    position: 'absolute',
                    top: '60%',
                    right: '10%',
                    width: '200px',
                    height: '200px',
                    background: 'radial-gradient(circle, rgba(255,255,255,0.08), transparent 70%)',
                    borderRadius: '50%',
                    animation: 'float2 8s ease-in-out infinite',
                    pointerEvents: 'none'
                }}
            />
            <div
                style={{
                    position: 'absolute',
                    bottom: '20%',
                    left: '20%',
                    width: '150px',
                    height: '150px',
                    background: 'radial-gradient(circle, rgba(255,255,255,0.06), transparent 70%)',
                    borderRadius: '50%',
                    animation: 'float3 10s ease-in-out infinite',
                    pointerEvents: 'none'
                }}
            />
            
            <Container fluid style={{ height: '100%', display: 'flex', alignItems: 'center' }}>
                <Row className="justify-content-center w-100 m-0">
                    <Col xs={12} sm={10} md={8} lg={5} xl={4}>
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
                            className="login-card"
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
                                    padding: '25px 30px 20px',
                                    textAlign: 'center',
                                    color: 'white',
                                    position: 'relative',
                                    borderBottom: '1px solid rgba(255,255,255,0.1)'
                                }}
                            >
                                <div
                                    style={{
                                        fontSize: '4rem',
                                        marginBottom: '15px',
                                        filter: 'drop-shadow(0 4px 12px rgba(0,0,0,0.3))',
                                        animation: 'pulse 2s ease-in-out infinite'
                                    }}
                                >
                                    🔐
                                </div>
                                <h2 style={{ 
                                    margin: 0, 
                                    fontWeight: '700',
                                    fontSize: '1.4rem',
                                    background: 'linear-gradient(135deg, #fff, rgba(255,255,255,0.8))',
                                    WebkitBackgroundClip: 'text',
                                    WebkitTextFillColor: 'transparent',
                                    textShadow: '0 2px 4px rgba(0,0,0,0.3)',
                                    letterSpacing: '-0.5px'
                                }}>
                                    Welcome Back
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
                                    ✨ Secure Login Portal
                                </Badge>
                            </div>

                            <Card.Body style={{ padding: '25px 30px' }}>
                                {error && (
                                    <Alert 
                                        variant="danger" 
                                        style={{ 
                                            borderRadius: '16px',
                                            border: 'none',
                                            background: 'linear-gradient(135deg, rgba(220, 53, 69, 0.1), rgba(220, 53, 69, 0.05))',
                                            backdropFilter: 'blur(10px)',
                                            color: '#dc3545',
                                            marginBottom: '15px',
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

                                <Form onSubmit={handleLogin}>
                                    <Form.Group className="mb-3">
                                        <Form.Label style={{ 
                                            fontWeight: '600', 
                                            color: 'rgba(255,255,255,0.9)',
                                            marginBottom: '8px',
                                            fontSize: '1rem',
                                            display: 'flex',
                                            alignItems: 'center'
                                        }}>
                                            <span style={{ marginRight: '8px' }}>📧</span>
                                            Email Address
                                        </Form.Label>
                                        <Form.Control
                                            type="email"
                                            placeholder="Enter your email address"
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            required
                                            style={{
                                                borderRadius: '16px',
                                                border: '1px solid rgba(255,255,255,0.2)',
                                                padding: '12px 16px',
                                                fontSize: '1rem',
                                                transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                                                background: 'rgba(255,255,255,0.08)',
                                                backdropFilter: 'blur(20px)',
                                                color: 'white',
                                                fontWeight: '500'
                                            }}
                                            onFocus={(e) => {
                                                e.target.style.borderColor = 'rgba(255,255,255,0.4)';
                                                e.target.style.background = 'rgba(255,255,255,0.12)';
                                                e.target.style.boxShadow = '0 0 0 4px rgba(255,255,255,0.1), 0 8px 25px rgba(0,0,0,0.15)';
                                                e.target.style.transform = 'translateY(-2px)';
                                            }}
                                            onBlur={(e) => {
                                                e.target.style.borderColor = 'rgba(255,255,255,0.2)';
                                                e.target.style.background = 'rgba(255,255,255,0.08)';
                                                e.target.style.boxShadow = 'none';
                                                e.target.style.transform = 'translateY(0)';
                                            }}
                                        />
                                    </Form.Group>

                                    <Form.Group className="mb-4">
                                        <Form.Label style={{ 
                                            fontWeight: '600', 
                                            color: 'rgba(255,255,255,0.9)',
                                            marginBottom: '8px',
                                            fontSize: '1rem',
                                            display: 'flex',
                                            alignItems: 'center'
                                        }}>
                                            <span style={{ marginRight: '8px' }}>🔑</span>
                                            Password
                                        </Form.Label>
                                        <Form.Control
                                            type="password"
                                            placeholder="Enter your password"
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)}
                                            required
                                            style={{
                                                borderRadius: '16px',
                                                border: '1px solid rgba(255,255,255,0.2)',
                                                padding: '12px 16px',
                                                fontSize: '1rem',
                                                transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                                                background: 'rgba(255,255,255,0.08)',
                                                backdropFilter: 'blur(20px)',
                                                color: 'white',
                                                fontWeight: '500'
                                            }}
                                            onFocus={(e) => {
                                                e.target.style.borderColor = 'rgba(255,255,255,0.4)';
                                                e.target.style.background = 'rgba(255,255,255,0.12)';
                                                e.target.style.boxShadow = '0 0 0 4px rgba(255,255,255,0.1), 0 8px 25px rgba(0,0,0,0.15)';
                                                e.target.style.transform = 'translateY(-2px)';
                                            }}
                                            onBlur={(e) => {
                                                e.target.style.borderColor = 'rgba(255,255,255,0.2)';
                                                e.target.style.background = 'rgba(255,255,255,0.08)';
                                                e.target.style.boxShadow = 'none';
                                                e.target.style.transform = 'translateY(0)';
                                            }}
                                        />
                                    </Form.Group>

                                    <Button
                                        variant="primary"
                                        type="submit"
                                        disabled={loading}
                                        className="w-100"
                                        style={{ 
                                            background: 'linear-gradient(135deg, rgba(255,255,255,0.2), rgba(255,255,255,0.1))',
                                            border: '1px solid rgba(255,255,255,0.3)',
                                            borderRadius: '16px',
                                            padding: '12px 20px',
                                            fontSize: '1rem',
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
                                            if (!loading) {
                                                e.target.style.transform = 'translateY(-3px) scale(1.02)';
                                                e.target.style.boxShadow = '0 12px 35px rgba(0,0,0,0.2), inset 0 1px 0 rgba(255,255,255,0.4)';
                                                e.target.style.background = 'linear-gradient(135deg, rgba(255,255,255,0.25), rgba(255,255,255,0.15))';
                                            }
                                        }}
                                        onMouseLeave={(e) => {
                                            if (!loading) {
                                                e.target.style.transform = 'translateY(0) scale(1)';
                                                e.target.style.boxShadow = '0 8px 25px rgba(0,0,0,0.15), inset 0 1px 0 rgba(255,255,255,0.3)';
                                                e.target.style.background = 'linear-gradient(135deg, rgba(255,255,255,0.2), rgba(255,255,255,0.1))';
                                            }
                                        }}
                                    >
                                        {loading ? (
                                            <>
                                                <Spinner 
                                                    animation="border" 
                                                    size="sm" 
                                                    style={{ marginRight: '12px' }}
                                                />
                                                <span>Authenticating...</span>
                                            </>
                                        ) : (
                                            <>
                                                <span style={{ marginRight: '8px' }}>🚀</span>
                                                Sign In Securely
                                            </>
                                        )}
                                    </Button>
                                </Form>

                                <div 
                                    className="text-center mt-4" 
                                    style={{ 
                                        fontSize: '0.95rem',
                                        color: 'rgba(255,255,255,0.8)'
                                    }}
                                >
                                    <div style={{ 
                                        padding: '15px',
                                        borderRadius: '12px',
                                        background: 'rgba(255,255,255,0.05)',
                                        backdropFilter: 'blur(20px)',
                                        border: '1px solid rgba(255,255,255,0.1)'
                                    }}>
                                        Don't have an account yet?{' '}
                                        <a 
                                            href="/register" 
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
                                            ✨ Create Account
                                        </a>
                                    </div>
                                </div>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Container>

            <style jsx>{`
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
                
                .login-card:hover {
                    transform: perspective(1000px) rotateX(2deg) translateY(-8px) !important;
                    box-shadow: 0 35px 60px rgba(0,0,0,0.15), inset 0 1px 0 rgba(255,255,255,0.4) !important;
                }
                
                .login-card:hover .card-glow {
                    opacity: 1;
                }
                
                input::placeholder {
                    color: rgba(255,255,255,0.6) !important;
                }
                
                @media (max-width: 576px) {
                    .login-card {
                        margin: 10px;
                    }
                }
            `}</style>
        </div>
    );
};

export default Login;