import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Form, Button, Container, Alert, Spinner } from 'react-bootstrap';
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
            console.log('Logged in as:', role, 'ID:', userId);

            if (role === 'CUSTOMER') {
                navigate('/CustomerDashboard');
            } else if (role === 'ADMIN') {
                navigate('/admin');
            } else if (role === 'VENDOR') {
                navigate('/vendor');
            } else {
                navigate('/');
            }
        } catch (err) {
            const msg = err.response?.data?.message || err.message || 'Login failed';
            setError(msg);
            toast.error(msg);
        } finally {
            setLoading(false);
        }
    };


    return (
        <Container className="mt-5" style={{ maxWidth: '400px' }}>
            <h2 className="text-center">Login</h2>
            {error && <Alert variant="danger">{error}</Alert>}

            <Form onSubmit={handleLogin}>
                <Form.Group className="mb-3">
                    <Form.Label>Email</Form.Label>
                    <Form.Control
                        type="email"
                        placeholder="Enter email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </Form.Group>

                <Button variant="primary" type="submit" disabled={loading} className="w-100">
                    {loading ? <Spinner animation="border" size="sm" /> : 'Login'}
                </Button>
            </Form>
        </Container>
    );
};

export default Login;
