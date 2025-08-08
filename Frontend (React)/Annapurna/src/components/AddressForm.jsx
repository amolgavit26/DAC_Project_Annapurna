import React, { useEffect, useState } from 'react';
import { Button, Col, Form, Row, Alert, Card, Spinner } from 'react-bootstrap';
import axios from 'axios';
import BASE_URL from '../config';
import api from '../services/api';

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
    const [isLoading, setIsLoading] = useState(true);
    const [isUpdating, setIsUpdating] = useState(false);

    const fetchUrl = `${BASE_URL}/api/address/my`;
    const updateUrl = `${BASE_URL}/api/address/update`;

    useEffect(() => {
        fetchAddress();
    }, []);

    const fetchAddress = async () => {
        setIsLoading(true);
        const token = localStorage.getItem('token');
        try {
            const res = await api.get(fetchUrl, {
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
                setMessage('⚠️ Unexpected address response.');
            }
        } catch (err) {
            setVariant('danger');
            setMessage('❌ Failed to fetch address');
            console.error(err);
        } finally {
            setIsLoading(false);
        }
    };

    const updateAddress = async () => {
        setIsUpdating(true);
        const token = localStorage.getItem('token');
        try {
            await api.put(updateUrl, formAddress, {
                headers: {
                    Authorization: token && token.startsWith('Bearer') ? token : `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            });
            setVariant('success');
            setMessage('✅ Address updated successfully!');
        } catch (err) {
            setVariant('danger');
            setMessage('❌ Failed to update address.');
            console.error(err);
        } finally {
            setIsUpdating(false);
        }
    };

    const customStyles = `
        .address-form-card {
            border: none;
            border-radius: 20px;
            box-shadow: 0 15px 35px rgba(102, 126, 234, 0.1);
            overflow: hidden;
            background: white;
        }
        
        .address-header {
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
            padding: 1.5rem;
            border: none;
        }
        
        .address-form-container {
            padding: 2rem;
        }
        
        .custom-form-control {
            border: 2px solid #e0e7ff;
            border-radius: 12px;
            padding: 0.875rem 1rem;
            font-size: 0.95rem;
            transition: all 0.3s ease;
            background: linear-gradient(135deg, #fdfdff 0%, #f8faff 100%);
        }
        
        .custom-form-control:focus {
            border-color: #667eea;
            box-shadow: 0 0 0 0.2rem rgba(102, 126, 234, 0.15);
            background: white;
            transform: translateY(-1px);
        }
        
        .form-label-custom {
            color: #4c51bf;
            font-weight: 600;
            font-size: 0.9rem;
            margin-bottom: 0.5rem;
            display: flex;
            align-items: center;
        }
        
        .update-btn {
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            border: none;
            border-radius: 25px;
            padding: 0.75rem 2rem;
            font-weight: 600;
            text-transform: uppercase;
            letter-spacing: 0.5px;
            transition: all 0.3s ease;
            font-size: 0.9rem;
        }
        
        .update-btn:hover {
            background: linear-gradient(135deg, #5a67d8 0%, #6b46c1 100%);
            transform: translateY(-2px);
            box-shadow: 0 8px 20px rgba(102, 126, 234, 0.3);
        }
        
        .update-btn:disabled {
            background: linear-gradient(135deg, #a0aec0 0%, #cbd5e0 100%);
            transform: none;
            box-shadow: none;
        }
        
        .alert-custom-success {
            background: linear-gradient(135deg, #48bb78 0%, #38a169 100%);
            border: none;
            border-radius: 12px;
            color: white;
            padding: 1rem 1.25rem;
            margin-top: 1rem;
            animation: slideInUp 0.4s ease;
        }
        
        .alert-custom-danger {
            background: linear-gradient(135deg, #f56565 0%, #e53e3e 100%);
            border: none;
            border-radius: 12px;
            color: white;
            padding: 1rem 1.25rem;
            margin-top: 1rem;
            animation: slideInUp 0.4s ease;
        }
        
        .alert-custom-warning {
            background: linear-gradient(135deg, #ed8936 0%, #dd6b20 100%);
            border: none;
            border-radius: 12px;
            color: white;
            padding: 1rem 1.25rem;
            margin-top: 1rem;
            animation: slideInUp 0.4s ease;
        }
        
        @keyframes slideInUp {
            from {
                opacity: 0;
                transform: translateY(20px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }
        
        .form-group-spacing {
            margin-bottom: 1.5rem;
        }
        
        .loading-container {
            text-align: center;
            padding: 2rem;
            color: #667eea;
        }
        
        .loading-spinner {
            color: #667eea;
        }
        
        .loading-spinner-btn {
            width: 16px;
            height: 16px;
            margin-right: 0.5rem;
        }
        
        .address-icon {
            font-size: 1.5rem;
            margin-right: 0.75rem;
            opacity: 0.9;
        }
        
        .field-icon {
            color: #667eea;
            margin-right: 0.5rem;
            font-size: 0.8rem;
        }
        
        .form-row-spacing {
            margin-bottom: 1rem;
        }
        
        .button-container {
            text-align: center;
            margin-top: 2rem;
            padding-top: 1.5rem;
            border-top: 2px solid #f1f5ff;
        }
    `;

    if (isLoading) {
        return (
            <>
                <style>{customStyles}</style>
                <Card className="address-form-card">
                    <div className="loading-container">
                        <Spinner animation="border" className="loading-spinner mb-3" />
                        <h5 className="text-muted">Loading your address...</h5>
                    </div>
                </Card>
            </>
        );
    }

    return (
        <>
            <style>{customStyles}</style>
            <Card className="address-form-card">
                <Card.Header className="address-header text-center">
                    <h4 className="mb-0">
                        <i className="fas fa-map-marker-alt address-icon"></i>
                        Pickup & Delivery Address
                    </h4>
                    <p className="mb-0 mt-1 opacity-75">
                        Keep your address updated for accurate service
                    </p>
                </Card.Header>
                
                <div className="address-form-container">
                    <Form>
                        <Row className="form-row-spacing">
                            <Col md={6}>
                                <Form.Group className="form-group-spacing">
                                    <Form.Label className="form-label-custom">
                                        <i className="fas fa-road field-icon"></i>
                                        Street Address
                                    </Form.Label>
                                    <Form.Control
                                        type="text"
                                        value={formAddress.street}
                                        onChange={(e) => setFormAddress({ ...formAddress, street: e.target.value })}
                                        placeholder="Enter your street address"
                                        className="custom-form-control"
                                        disabled={isUpdating}
                                    />
                                </Form.Group>
                            </Col>
                            <Col md={6}>
                                <Form.Group className="form-group-spacing">
                                    <Form.Label className="form-label-custom">
                                        <i className="fas fa-city field-icon"></i>
                                        City
                                    </Form.Label>
                                    <Form.Control
                                        type="text"
                                        value={formAddress.city}
                                        onChange={(e) => setFormAddress({ ...formAddress, city: e.target.value })}
                                        placeholder="Enter your city"
                                        className="custom-form-control"
                                        disabled={isUpdating}
                                    />
                                </Form.Group>
                            </Col>
                        </Row>
                        
                        <Row className="form-row-spacing">
                            <Col md={6}>
                                <Form.Group className="form-group-spacing">
                                    <Form.Label className="form-label-custom">
                                        <i className="fas fa-map field-icon"></i>
                                        State
                                    </Form.Label>
                                    <Form.Control
                                        type="text"
                                        value={formAddress.state}
                                        onChange={(e) => setFormAddress({ ...formAddress, state: e.target.value })}
                                        placeholder="Enter your state"
                                        className="custom-form-control"
                                        disabled={isUpdating}
                                    />
                                </Form.Group>
                            </Col>
                            <Col md={3}>
                                <Form.Group className="form-group-spacing">
                                    <Form.Label className="form-label-custom">
                                        <i className="fas fa-mail-bulk field-icon"></i>
                                        Pin Code
                                    </Form.Label>
                                    <Form.Control
                                        type="text"
                                        value={formAddress.pinCode}
                                        onChange={(e) => setFormAddress({ ...formAddress, pinCode: e.target.value })}
                                        placeholder="Pin code"
                                        className="custom-form-control"
                                        disabled={isUpdating}
                                    />
                                </Form.Group>
                            </Col>
                            <Col md={3}>
                                <Form.Group className="form-group-spacing">
                                    <Form.Label className="form-label-custom">
                                        <i className="fas fa-globe field-icon"></i>
                                        Country
                                    </Form.Label>
                                    <Form.Control
                                        type="text"
                                        value={formAddress.country}
                                        onChange={(e) => setFormAddress({ ...formAddress, country: e.target.value })}
                                        placeholder="Country"
                                        className="custom-form-control"
                                        disabled={isUpdating}
                                    />
                                </Form.Group>
                            </Col>
                        </Row>
                        
                        <div className="button-container">
                            <Button 
                                onClick={updateAddress} 
                                className="update-btn"
                                disabled={isUpdating}
                            >
                                {isUpdating ? (
                                    <>
                                        <Spinner 
                                            as="span" 
                                            animation="border" 
                                            size="sm" 
                                            role="status" 
                                            className="loading-spinner-btn"
                                        />
                                        Updating...
                                    </>
                                ) : (
                                    <>
                                        <i className="fas fa-save me-2"></i>
                                        Update Address
                                    </>
                                )}
                            </Button>
                        </div>
                        
                        {message && (
                            <Alert 
                                className={`alert-custom-${variant}`}
                            >
                                <div className="d-flex align-items-center">
                                    <i className={`fas ${
                                        variant === 'success' ? 'fa-check-circle' : 
                                        variant === 'danger' ? 'fa-exclamation-triangle' : 
                                        'fa-info-circle'
                                    } me-2`}></i>
                                    <strong>{message}</strong>
                                </div>
                            </Alert>
                        )}
                    </Form>
                </div>
            </Card>
        </>
    );
};

export default AddressForm;