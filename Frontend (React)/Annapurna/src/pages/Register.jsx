
import { useState } from 'react';
import { Form, Button, Container, Row, Col, Alert } from 'react-bootstrap';
import axios from 'axios';

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
        try {
            const response = await axios.post('http://localhost:8080/api/auth/register', formData);
            setMessage('Registration successful. You can now login.');
            setError('');
        } catch (err) {
            setError(err.response?.data?.message || 'Registration failed');
            setMessage('');
        }
    };

    return (
        <Container className="mt-5">
            <Row className="justify-content-md-center">
                <Col md={6}>
                    <h2>User Registration</h2>

                    {message && <Alert variant="success">{message}</Alert>}
                    {error && <Alert variant="danger">{error}</Alert>}

                    <Form onSubmit={handleRegister}>
                        <Form.Group controlId="formFullName" className="mb-3">
                            <Form.Label>Full Name</Form.Label>
                            <Form.Control
                                type="text"
                                name="fullName"
                                placeholder="Enter your name"
                                value={formData.fullName}
                                onChange={handleChange}
                                required
                            />
                        </Form.Group>

                        <Form.Group controlId="formEmail" className="mb-3">
                            <Form.Label>Email address</Form.Label>
                            <Form.Control
                                type="email"
                                name="email"
                                placeholder="Enter email"
                                value={formData.email}
                                onChange={handleChange}
                                required
                            />
                        </Form.Group>

                        <Form.Group controlId="formPassword" className="mb-3">
                            <Form.Label>Password</Form.Label>
                            <Form.Control
                                type="password"
                                name="password"
                                placeholder="Password"
                                value={formData.password}
                                onChange={handleChange}
                                required
                            />
                        </Form.Group>

                        <Form.Group controlId="formMobileNumber" className="mb-3">
                            <Form.Label>Mobile Number</Form.Label>
                            <Form.Control
                                type="text"
                                name="mobileNumber"
                                placeholder="Enter mobile number"
                                value={formData.mobileNumber}
                                onChange={handleChange}
                                required
                            />
                        </Form.Group>

                        <Form.Group controlId="formRole" className="mb-3">
                            <Form.Label>Role</Form.Label>
                            <Form.Select
                                name="role"
                                value={formData.role}
                                onChange={handleChange}
                                required
                            >
                                <option value="CUSTOMER">Customer</option>
                                <option value="VENDOR">Vendor</option>
                                <option value="ADMIN">Admin</option>
                            </Form.Select>
                        </Form.Group>

                        <h5 className="mt-4">Address</h5>

                        <Form.Group controlId="formStreet" className="mb-3">
                            <Form.Label>Street</Form.Label>
                            <Form.Control
                                type="text"
                                name="address.street"
                                placeholder="Street"
                                value={formData.address.street}
                                onChange={handleChange}
                                required
                            />
                        </Form.Group>

                        <Form.Group controlId="formCity" className="mb-3">
                            <Form.Label>City</Form.Label>
                            <Form.Control
                                type="text"
                                name="address.city"
                                placeholder="City"
                                value={formData.address.city}
                                onChange={handleChange}
                                required
                            />
                        </Form.Group>

                        <Form.Group controlId="formState" className="mb-3">
                            <Form.Label>State</Form.Label>
                            <Form.Control
                                type="text"
                                name="address.state"
                                placeholder="State"
                                value={formData.address.state}
                                onChange={handleChange}
                                required
                            />
                        </Form.Group>

                        <Form.Group controlId="formPinCode" className="mb-3">
                            <Form.Label>Pin Code</Form.Label>
                            <Form.Control
                                type="text"
                                name="address.pinCode"
                                placeholder="Pin Code"
                                value={formData.address.pinCode}
                                onChange={handleChange}
                                required
                            />
                        </Form.Group>

                        <Form.Group controlId="formCountry" className="mb-3">
                            <Form.Label>Country</Form.Label>
                            <Form.Control
                                type="text"
                                name="address.country"
                                placeholder="Country"
                                value={formData.address.country}
                                onChange={handleChange}
                                required
                            />
                        </Form.Group>

                        <Button variant="primary" type="submit" className="mt-3">
                            Register
                        </Button>
                    </Form>
                </Col>
            </Row>
        </Container>
    );
};

export default Register;
