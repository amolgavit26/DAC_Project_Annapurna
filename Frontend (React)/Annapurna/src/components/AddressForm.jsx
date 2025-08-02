import React, { useEffect, useState } from 'react';
import { Button, Col, Form, Row, Alert } from 'react-bootstrap';
import axios from 'axios';

const AddressForm = () => {
    const [formAddress, setFormAddress] = useState({
        street: '',
        city: '',
        state: '',
        pinCode: '',
        country: ''
    });
    const [message, setMessage] = useState('');
    const [variant, setVariant] = useState('success');

    const fetchUrl = 'http://localhost:8080/api/address/my';
    const updateUrl = 'http://localhost:8080/api/address/update';

    useEffect(() => {
        fetchAddress();
    }, []);

    const fetchAddress = async () => {
        const token = localStorage.getItem('token');
        try {
            const res = await axios.get(fetchUrl, {
                headers: {
                    Authorization: token && token.startsWith('Bearer') ? token : `Bearer ${token}`
                }
            });

            if (res.data && typeof res.data === 'object') {
                console.log("Fetched address data:", res.data);

                setFormAddress({
                    street: res.data.street || '',
                    city: res.data.city || '',
                    state: res.data.state || '',
                    pinCode: res.data.pinCode || '',
                    country: res.data.country || ''
                });
            } else {
                console.warn("Unexpected address response:", res.data);
                setVariant('warning');
                setMessage('Unexpected address response.');
            }
        } catch (err) {
            setVariant('danger');
            setMessage('Failed to fetch address');
            console.error(err);
        }
    };

    const updateAddress = async () => {
        const token = localStorage.getItem('token');
        try {
            await axios.put(updateUrl, formAddress, {
                headers: {
                    Authorization: token && token.startsWith('Bearer') ? token : `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            });
            setVariant('success');
            setMessage('Address updated successfully!');
        } catch (err) {
            setVariant('danger');
            setMessage('Failed to update address.');
            console.error(err);
        }
    };

    return (
        <div className="mb-4">
            <h4>My Address</h4>
            <Form>
                <Row>
                    <Col md={6}>
                        <Form.Group className="mb-2">
                            <Form.Label>Street</Form.Label>
                            <Form.Control
                                type="text"
                                value={formAddress.street}
                                onChange={(e) => setFormAddress({ ...formAddress, street: e.target.value })}
                            />
                        </Form.Group>
                    </Col>
                    <Col md={6}>
                        <Form.Group className="mb-2">
                            <Form.Label>City</Form.Label>
                            <Form.Control
                                type="text"
                                value={formAddress.city}
                                onChange={(e) => setFormAddress({ ...formAddress, city: e.target.value })}
                            />
                        </Form.Group>
                    </Col>
                </Row>
                <Row>
                    <Col md={6}>
                        <Form.Group className="mb-2">
                            <Form.Label>State</Form.Label>
                            <Form.Control
                                type="text"
                                value={formAddress.state}
                                onChange={(e) => setFormAddress({ ...formAddress, state: e.target.value })}
                            />
                        </Form.Group>
                    </Col>
                    <Col md={3}>
                        <Form.Group className="mb-2">
                            <Form.Label>Pin Code</Form.Label>
                            <Form.Control
                                type="text"
                                value={formAddress.pinCode}
                                onChange={(e) => setFormAddress({ ...formAddress, pinCode: e.target.value })}
                            />
                        </Form.Group>
                    </Col>
                    <Col md={3}>
                        <Form.Group className="mb-2">
                            <Form.Label>Country</Form.Label>
                            <Form.Control
                                type="text"
                                value={formAddress.country}
                                onChange={(e) => setFormAddress({ ...formAddress, country: e.target.value })}
                            />
                        </Form.Group>
                    </Col>
                </Row>
                <Button onClick={updateAddress} variant="primary" size="sm">
                    Update Address
                </Button>
                {message && <Alert variant={variant} className="mt-2">{message}</Alert>}
            </Form>
        </div>
    );
};

export default AddressForm;
