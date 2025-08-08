// src/components/AddTiffin.jsx

import { useState } from 'react';
import { Form, Button, Container, Row, Col, Alert, Card, InputGroup } from 'react-bootstrap';
import axios from 'axios';
import BASE_URL from '../config';
import api from '../services/api';

const AddTiffin = () => {
    const [formData, setFormData] = useState({
        name: '',
        description: '',
        price: '',
        category: 'BREAKFAST',
        image: null
    });

    const [message, setMessage] = useState('');
    const [error, setError] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [imagePreview, setImagePreview] = useState(null);

    const token = localStorage.getItem('token');

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        setFormData(prev => ({ ...prev, image: file }));
        
        // Create image preview
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setImagePreview(reader.result);
            };
            reader.readAsDataURL(file);
        } else {
            setImagePreview(null);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);

        const data = new FormData();
        data.append('name', formData.name);
        data.append('description', formData.description);
        data.append('price', formData.price);
        data.append('category', formData.category);
        if (formData.image) {
            data.append('image', formData.image);
        }

        try {
            await api.post(
                `${BASE_URL}/api/vendor/tiffins`,
                data,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        'Content-Type': 'multipart/form-data'
                    }
                }
            );

            setMessage('Tiffin added successfully!');
            setError('');
            setFormData({ name: '', description: '', price: '', category: 'BREAKFAST', image: null });
            setImagePreview(null);
            
            // Reset file input
            const fileInput = document.querySelector('input[type="file"]');
            if (fileInput) fileInput.value = '';
            
        } catch (err) {
            setError(err.response?.data?.message || 'Failed to add tiffin');
            setMessage('');
        } finally {
            setIsSubmitting(false);
        }
    };

    const getCategoryIcon = (category) => {
        const icons = {
            'BREAKFAST': '🌅',
            'LUNCH': '🌞',
            'DINNER': '🌙'
        };
        return icons[category] || '🍽️';
    };

    const customStyles = `
        .gradient-bg {
            background: linear-gradient(135deg, #f8faff 0%, #f1f5ff 100%);
            min-height: 100vh;
            padding: 2rem 0;
        }
        
        .add-tiffin-card {
            border: none;
            border-radius: 25px;
            box-shadow: 0 20px 40px rgba(102, 126, 234, 0.15);
            overflow: hidden;
            background: white;
        }
        
        .card-header-gradient {
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
            padding: 3rem 2rem;
            text-align: center;
            border: none;
            position: relative;
            overflow: hidden;
        }
        
        .card-header-gradient::before {
            content: '';
            position: absolute;
            top: -50%;
            left: -50%;
            width: 200%;
            height: 200%;
            background: radial-gradient(circle, rgba(255,255,255,0.1) 0%, transparent 70%);
            animation: shimmer 3s ease-in-out infinite;
        }
        
        @keyframes shimmer {
            0%, 100% { transform: rotate(0deg); }
            50% { transform: rotate(180deg); }
        }
        
        .form-container {
            padding: 3rem;
        }
        
        .custom-form-control {
            border: 2px solid #e0e7ff;
            border-radius: 15px;
            padding: 1rem 1.25rem;
            font-size: 1rem;
            transition: all 0.3s ease;
            background: linear-gradient(135deg, #fdfdff 0%, #f8faff 100%);
        }
        
        .custom-form-control:focus {
            border-color: #667eea;
            box-shadow: 0 0 0 0.25rem rgba(102, 126, 234, 0.15);
            background: white;
            transform: translateY(-2px);
        }
        
        .form-label-custom {
            color: #4c51bf;
            font-weight: 700;
            font-size: 1.1rem;
            margin-bottom: 0.75rem;
            display: flex;
            align-items: center;
        }
        
        .category-select {
            border: 2px solid #e0e7ff;
            border-radius: 15px;
            padding: 1rem 1.25rem;
            background: linear-gradient(135deg, #fdfdff 0%, #f8faff 100%);
            transition: all 0.3s ease;
        }
        
        .category-select:focus {
            border-color: #667eea;
            box-shadow: 0 0 0 0.25rem rgba(102, 126, 234, 0.15);
            background: white;
        }
        
        .file-input-container {
            position: relative;
            overflow: hidden;
            border: 2px dashed #667eea;
            border-radius: 15px;
            padding: 2rem;
            text-align: center;
            background: linear-gradient(135deg, #fdfdff 0%, #f8faff 100%);
            transition: all 0.3s ease;
            cursor: pointer;
        }
        
        .file-input-container:hover {
            border-color: #5a67d8;
            background: linear-gradient(135deg, #f8faff 0%, #f1f5ff 100%);
            transform: translateY(-2px);
        }
        
        .file-input-hidden {
            position: absolute;
            left: -9999px;
        }
        
        .image-preview {
            max-width: 200px;
            max-height: 200px;
            border-radius: 15px;
            box-shadow: 0 10px 25px rgba(102, 126, 234, 0.2);
            margin-top: 1rem;
        }
        
        .submit-btn {
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            border: none;
            border-radius: 50px;
            padding: 1.25rem 4rem;
            font-weight: 700;
            font-size: 1.2rem;
            text-transform: uppercase;
            letter-spacing: 1px;
            transition: all 0.3s ease;
            position: relative;
            overflow: hidden;
        }
        
        .submit-btn:hover {
            background: linear-gradient(135deg, #5a67d8 0%, #6b46c1 100%);
            transform: translateY(-3px);
            box-shadow: 0 15px 30px rgba(102, 126, 234, 0.4);
        }
        
        .submit-btn:disabled {
            background: linear-gradient(135deg, #a0aec0 0%, #cbd5e0 100%);
            transform: none;
            box-shadow: none;
        }
        
        .alert-custom-success {
            background: linear-gradient(135deg, #48bb78 0%, #38a169 100%);
            border: none;
            border-radius: 15px;
            color: white;
            padding: 1.25rem 1.5rem;
            margin-bottom: 2rem;
            animation: slideInDown 0.5s ease;
        }
        
        .alert-custom-danger {
            background: linear-gradient(135deg, #f56565 0%, #e53e3e 100%);
            border: none;
            border-radius: 15px;
            color: white;
            padding: 1.25rem 1.5rem;
            margin-bottom: 2rem;
            animation: slideInDown 0.5s ease;
        }
        
        @keyframes slideInDown {
            from {
                opacity: 0;
                transform: translateY(-30px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }
        
        .form-group-spacing {
            margin-bottom: 2.5rem;
        }
        
        .loading-spinner {
            width: 20px;
            height: 20px;
            margin-right: 0.5rem;
        }
        
        .price-input-group {
            border: 2px solid #e0e7ff;
            border-radius: 15px;
            overflow: hidden;
            background: linear-gradient(135deg, #fdfdff 0%, #f8faff 100%);
            transition: all 0.3s ease;
        }
        
        .price-input-group:focus-within {
            border-color: #667eea;
            box-shadow: 0 0 0 0.25rem rgba(102, 126, 234, 0.15);
            background: white;
        }
        
        .price-symbol {
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
            border: none;
            padding: 1rem 1.25rem;
            font-weight: 700;
            font-size: 1.1rem;
        }
        
        .price-input {
            border: none;
            padding: 1rem 1.25rem;
            background: transparent;
            font-size: 1rem;
        }
        
        .price-input:focus {
            box-shadow: none;
            outline: none;
        }
        
        .header-icon {
            font-size: 4rem;
            margin-bottom: 1rem;
            opacity: 0.9;
            position: relative;
            z-index: 1;
        }
    `;

    return (
        <>
            <style>{customStyles}</style>
            <div className="gradient-bg">
                <Container>
                    <Row className="justify-content-center">
                        <Col lg={8} xl={7}>
                            <Card className="add-tiffin-card">
                                <Card.Header className="card-header-gradient">
                                    <div className="header-icon">🍱</div>
                                    <h1 className="mb-0 display-5">Add New Tiffin</h1>
                                    <p className="mb-0 mt-2 opacity-75">
                                        Create a delicious tiffin offering for your customers
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
                                                <i className="fas fa-utensils me-2"></i>
                                                Tiffin Name
                                            </Form.Label>
                                            <Form.Control
                                                type="text"
                                                name="name"
                                                value={formData.name}
                                                onChange={handleChange}
                                                placeholder="Enter a delicious tiffin name"
                                                className="custom-form-control"
                                                required
                                                disabled={isSubmitting}
                                            />
                                        </Form.Group>

                                        <Form.Group className="form-group-spacing">
                                            <Form.Label className="form-label-custom">
                                                <i className="fas fa-align-left me-2"></i>
                                                Description
                                            </Form.Label>
                                            <Form.Control
                                                as="textarea"
                                                name="description"
                                                value={formData.description}
                                                onChange={handleChange}
                                                rows={4}
                                                placeholder="Describe the ingredients, taste, and what makes this tiffin special..."
                                                className="custom-form-control"
                                                required
                                                disabled={isSubmitting}
                                            />
                                        </Form.Group>

                                        <Form.Group className="form-group-spacing">
                                            <Form.Label className="form-label-custom">
                                                <i className="fas fa-rupee-sign me-2"></i>
                                                Price
                                            </Form.Label>
                                            <InputGroup className="price-input-group">
                                                <InputGroup.Text className="price-symbol">₹</InputGroup.Text>
                                                <Form.Control
                                                    type="number"
                                                    name="price"
                                                    value={formData.price}
                                                    onChange={handleChange}
                                                    placeholder="Enter price"
                                                    className="price-input"
                                                    required
                                                    disabled={isSubmitting}
                                                    min="1"
                                                    step="0.01"
                                                />
                                            </InputGroup>
                                        </Form.Group>

                                        <Form.Group className="form-group-spacing">
                                            <Form.Label className="form-label-custom">
                                                <i className="fas fa-clock me-2"></i>
                                                Category
                                            </Form.Label>
                                            <Form.Select
                                                name="category"
                                                value={formData.category}
                                                onChange={handleChange}
                                                className="category-select"
                                                required
                                                disabled={isSubmitting}
                                            >
                                                <option value="BREAKFAST">{getCategoryIcon('BREAKFAST')} BREAKFAST</option>
                                                <option value="LUNCH">{getCategoryIcon('LUNCH')} LUNCH</option>
                                                <option value="DINNER">{getCategoryIcon('DINNER')} DINNER</option>
                                            </Form.Select>
                                        </Form.Group>

                                        <Form.Group className="form-group-spacing">
                                            <Form.Label className="form-label-custom">
                                                <i className="fas fa-camera me-2"></i>
                                                Tiffin Image
                                            </Form.Label>
                                            <div 
                                                className="file-input-container"
                                                onClick={() => document.getElementById('file-input').click()}
                                            >
                                                <Form.Control
                                                    type="file"
                                                    id="file-input"
                                                    name="image"
                                                    onChange={handleFileChange}
                                                    accept="image/*"
                                                    className="file-input-hidden"
                                                    disabled={isSubmitting}
                                                />
                                                {imagePreview ? (
                                                    <div>
                                                        <img 
                                                            src={imagePreview} 
                                                            alt="Preview" 
                                                            className="image-preview"
                                                        />
                                                        <p className="mt-3 mb-0 text-muted">
                                                            <i className="fas fa-sync-alt me-1"></i>
                                                            Click to change image
                                                        </p>
                                                    </div>
                                                ) : (
                                                    <div>
                                                        <i className="fas fa-cloud-upload-alt fs-1 text-primary mb-3"></i>
                                                        <h5 className="text-primary mb-2">Upload Tiffin Image</h5>
                                                        <p className="text-muted mb-0">
                                                            Click here to select an image or drag and drop
                                                        </p>
                                                        <small className="text-muted">
                                                            Supports: JPG, PNG, GIF (Max: 5MB)
                                                        </small>
                                                    </div>
                                                )}
                                            </div>
                                        </Form.Group>

                                        <div className="text-center">
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
                                                        Adding Tiffin...
                                                    </>
                                                ) : (
                                                    <>
                                                        <i className="fas fa-plus-circle me-2"></i>
                                                        Add Tiffin
                                                    </>
                                                )}
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

export default AddTiffin;