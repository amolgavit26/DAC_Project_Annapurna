import { useEffect, useState } from 'react';
import { Container, Row, Col, Card, Button, Form, Modal, Spinner, Alert, Badge } from 'react-bootstrap';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import AddressForm from './AddressForm';
import BASE_URL from '../config';
import api from '../services/api';


const VendorDashboard = () => {
    const navigate = useNavigate();
    const [tiffins, setTiffins] = useState([]);
    const [loading, setLoading] = useState(true);
    const [editingTiffin, setEditingTiffin] = useState(null);
    const [showEditModal, setShowEditModal] = useState(false);
    const [showAddModal, setShowAddModal] = useState(false);
    const [showAddressForm, setShowAddressForm] = useState(false);

    const [newTiffin, setNewTiffin] = useState({
        name: '',
        description: '',
        price: '',
        category: 'BREAKFAST',
        image: null
    });

    const [message, setMessage] = useState('');
    const [error, setError] = useState('');
    const token = localStorage.getItem('token');

    const fetchVendorTiffins = async () => {
        try {
            const res = await api.get(`${BASE_URL}/api/vendor/tiffins`, {
                headers: {
                    Authorization: token.startsWith('Bearer') ? token : `Bearer ${token}`
                }
            });
            setTiffins(res.data);
        } catch (err) {
            setError('Failed to fetch your tiffins.');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchVendorTiffins();
    }, []);

    const handleDelete = async (id) => {
        if (!window.confirm('Are you sure you want to delete this tiffin?')) return;
        try {
            await api.delete(`${BASE_URL}/api/vendor/tiffins/${id}`, {
                headers: {
                    Authorization: token.startsWith('Bearer') ? token : `Bearer ${token}`
                }
            });
            setMessage('Tiffin deleted successfully');
            fetchVendorTiffins();
        } catch (err) {
            setError(err.response?.data?.message || 'Delete failed');
        }
    };

    const handleEditClick = (tiffin) => {
        setEditingTiffin({ ...tiffin });
        setShowEditModal(true);
    };

    const handleUpdate = async () => {
        try {
            const formData = new FormData();
            formData.append("name", editingTiffin.name);
            formData.append("description", editingTiffin.description);
            formData.append("price", editingTiffin.price);
            formData.append("category", editingTiffin.category);
            if (editingTiffin.image) {
                formData.append("image", editingTiffin.image);
            }

            await api.put(
                `${BASE_URL}/api/vendor/tiffins/${editingTiffin.id}`,
                formData,
                {
                    headers: {
                        Authorization: token.startsWith("Bearer") ? token : `Bearer ${token}`,
                        'Content-Type': 'multipart/form-data',
                    },
                }
            );

            setMessage('Tiffin updated successfully');
            setShowEditModal(false);
            fetchVendorTiffins();
        } catch (err) {
            setError('Update failed');
        }
    };

    const handleAddTiffin = async () => {
        try {
            const formData = new FormData();
            formData.append("name", newTiffin.name);
            formData.append("description", newTiffin.description);
            formData.append("price", newTiffin.price);
            formData.append("category", newTiffin.category);
            if (newTiffin.image) {
                formData.append("image", newTiffin.image);
            }

            await api.post(`${BASE_URL}/api/vendor/tiffins`, formData, {
                headers: {
                    Authorization: token.startsWith("Bearer") ? token : `Bearer ${token}`,
                    'Content-Type': 'multipart/form-data'
                }
            });

            setMessage('Tiffin added successfully!');
            setShowAddModal(false);
            setNewTiffin({ name: '', description: '', price: '', category: 'BREAKFAST', image: null });
            fetchVendorTiffins();
        } catch (err) {
            setError(err.response?.data?.message || 'Failed to add tiffin');
        }
    };

    const handleChange = (e) => {
        setEditingTiffin({
            ...editingTiffin,
            [e.target.name]: e.target.value
        });
    };

    const handleNewTiffinChange = (e) => {
        const { name, value, files } = e.target;
        setNewTiffin(prev => ({
            ...prev,
            [name]: name === 'image' ? files[0] : value
        }));
    };

    const getBadge = (category) => {
        switch (category) {
            case 'BREAKFAST':
                return <Badge bg="warning" text="dark" className="px-3 py-2 rounded-pill">🌅 Breakfast</Badge>;
            case 'LUNCH':
                return <Badge bg="success" className="px-3 py-2 rounded-pill">🍽️ Lunch</Badge>;
            case 'DINNER':
                return <Badge bg="dark" className="px-3 py-2 rounded-pill">🌙 Dinner</Badge>;
            default:
                return <Badge bg="secondary" className="px-3 py-2 rounded-pill">❓ Unknown</Badge>;
        }
    };

    const customStyles = `
        <style>
            .hero-gradient {
                background: linear-gradient(135deg, #667eea 0%, #764ba2 50%, #8b5cf6 100%);
            }
            .btn-primary {
                background: linear-gradient(135deg, #6366f1, #8b5cf6);
                border: none;
                box-shadow: 0 4px 15px rgba(99, 102, 241, 0.3);
            }
            .btn-primary:hover {
                background: linear-gradient(135deg, #5b21b6, #7c3aed);
                transform: translateY(-2px);
                box-shadow: 0 6px 20px rgba(99, 102, 241, 0.4);
            }
            .btn-warning {
                background: linear-gradient(135deg, #f59e0b, #d97706);
                border: none;
                box-shadow: 0 4px 15px rgba(245, 158, 11, 0.3);
            }
            .btn-warning:hover {
                background: linear-gradient(135deg, #d97706, #b45309);
                transform: translateY(-2px);
                box-shadow: 0 6px 20px rgba(245, 158, 11, 0.4);
            }
            .btn-danger {
                background: linear-gradient(135deg, #ef4444, #dc2626);
                border: none;
                box-shadow: 0 4px 15px rgba(239, 68, 68, 0.3);
            }
            .btn-danger:hover {
                background: linear-gradient(135deg, #dc2626, #b91c1c);
                transform: translateY(-2px);
                box-shadow: 0 6px 20px rgba(239, 68, 68, 0.4);
            }
            .btn-info {
                background: linear-gradient(135deg, #06b6d4, #0891b2);
                border: none;
                box-shadow: 0 4px 15px rgba(6, 182, 212, 0.3);
            }
            .btn-info:hover {
                background: linear-gradient(135deg, #0891b2, #0e7490);
                transform: translateY(-2px);
                box-shadow: 0 6px 20px rgba(6, 182, 212, 0.4);
            }
            .btn-outline-success {
                border-color: #10b981;
                color: #10b981;
                box-shadow: 0 2px 10px rgba(16, 185, 129, 0.2);
            }
            .btn-outline-success:hover {
                background: linear-gradient(135deg, #10b981, #059669);
                border-color: #10b981;
                transform: translateY(-2px);
                box-shadow: 0 6px 20px rgba(16, 185, 129, 0.3);
            }
            .card {
                border: 1px solid rgba(99, 102, 241, 0.1);
                background: rgba(255, 255, 255, 0.95);
                backdrop-filter: blur(10px);
                transition: all 0.3s ease;
            }
            .tiffin-card {
                border: 2px solid transparent;
                background: rgba(255, 255, 255, 0.95);
                backdrop-filter: blur(10px);
                transition: all 0.3s ease;
            }
            .tiffin-card:hover {
                transform: translateY(-10px);
                border-color: rgba(99, 102, 241, 0.3);
                box-shadow: 0 15px 40px rgba(99, 102, 241, 0.15);
            }
            .text-primary {
                color: #6366f1 !important;
            }
            .bg-primary {
                background: linear-gradient(135deg, #6366f1, #8b5cf6) !important;
            }
            .modal-content {
                border: 1px solid rgba(99, 102, 241, 0.1);
                background: rgba(255, 255, 255, 0.98);
                backdrop-filter: blur(15px);
            }
            .modal-header {
                background: linear-gradient(135deg, rgba(99, 102, 241, 0.05), rgba(139, 92, 246, 0.05));
                border-bottom: 1px solid rgba(99, 102, 241, 0.1);
            }
            .form-control:focus {
                border-color: #6366f1;
                box-shadow: 0 0 0 0.2rem rgba(99, 102, 241, 0.25);
            }
            .form-select:focus {
                border-color: #6366f1;
                box-shadow: 0 0 0 0.2rem rgba(99, 102, 241, 0.25);
            }
            .stats-card {
                background: linear-gradient(135deg, rgba(99, 102, 241, 0.05), rgba(139, 92, 246, 0.05));
                border: 1px solid rgba(99, 102, 241, 0.1);
                transition: all 0.3s ease;
            }
            .stats-card:hover {
                transform: translateY(-5px);
                box-shadow: 0 10px 30px rgba(99, 102, 241, 0.15);
            }
        </style>
    `;

    if (loading) {
        return (
            <Container className="mt-5 text-center">
                <Spinner animation="border" style={{color: '#6366f1'}} />
                <p className="mt-2" style={{color: '#6366f1'}}>Loading your tiffins...</p>
            </Container>
        );
    }

    return (
        <>
            <div dangerouslySetInnerHTML={{__html: customStyles}} />
            
            {/* Hero Section */}
            <div className="position-relative overflow-hidden hero-gradient" style={{minHeight: '200px'}}>
                <div className="position-absolute top-0 start-0 w-100 h-100" style={{opacity: '0.1'}}>
                    <div style={{
                        backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.3) 1px, transparent 1px)',
                        backgroundSize: '20px 20px',
                        width: '100%',
                        height: '100%'
                    }}></div>
                </div>
                <Container className="position-relative py-5">
                    <Row className="align-items-center">
                        <Col lg={8} className="text-white">
                            <h1 className="display-5 fw-bold mb-3">👨‍🍳 Vendor Dashboard</h1>
                            <p className="lead mb-0 opacity-90">Manage your delicious tiffins and grow your business</p>
                        </Col>
                        <Col lg={4} className="text-center">
                            <div className="position-relative">
                                <div className="bg-white bg-opacity-20 rounded-circle p-4 d-inline-block">
                                    <span style={{fontSize: '3rem'}}>🍱</span>
                                </div>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </div>

            <Container className="mt-4 mb-5">
                {/* Alerts */}
                {message && (
                    <Alert variant="success" className="shadow-sm border-0 rounded-3 mb-4">
                        <div className="d-flex align-items-center">
                            <span className="me-2">✅</span>
                            {message}
                        </div>
                    </Alert>
                )}
                {error && (
                    <Alert variant="danger" className="shadow-sm border-0 rounded-3 mb-4">
                        <div className="d-flex align-items-center">
                            <span className="me-2">❌</span>
                            {error}
                        </div>
                    </Alert>
                )}

                {/* Stats Card */}
                <Card className="stats-card shadow-sm border-0 rounded-4 mb-4">
                    <Card.Body className="p-4">
                        <Row className="align-items-center">
                            <Col md={8}>
                                <h4 className="mb-2" style={{color: '#6366f1'}}>📊 Dashboard Overview</h4>
                                <p className="text-muted mb-0">Manage your tiffin business efficiently</p>
                            </Col>
                            <Col md={4} className="text-center">
                                <div className="d-flex justify-content-center align-items-center gap-3">
                                    <div className="text-center">
                                        <h3 className="mb-0 fw-bold" style={{color: '#6366f1'}}>{tiffins.length}</h3>
                                        <small className="text-muted">Total Tiffins</small>
                                    </div>
                                    <div className="text-center">
                                        <h3 className="mb-0 fw-bold" style={{color: '#8b5cf6'}}>
                                            {tiffins.length > 0 ? `₹${Math.min(...tiffins.map(t => t.price))}` : '₹0'}
                                        </h3>
                                        <small className="text-muted">Starting From</small>
                                    </div>
                                </div>
                            </Col>
                        </Row>
                    </Card.Body>
                </Card>

                {/* Action Buttons */}
                <Card className="shadow-sm border-0 rounded-4 mb-4">
                    <Card.Body className="p-4">
                        <h5 className="mb-3" style={{color: '#6366f1'}}>🛠️ Quick Actions</h5>
                        <div className="d-flex justify-content-start gap-3 flex-wrap">
                            <Button 
                                variant="primary" 
                                onClick={() => setShowAddModal(true)}
                                className="rounded-pill px-4 fw-semibold"
                                style={{transition: 'all 0.3s ease'}}
                            >
                                ➕ Add Tiffin
                            </Button>
                            <Button 
                                variant="info" 
                                onClick={() => navigate('/vendor/orders')}
                                className="rounded-pill px-4 fw-semibold"
                                style={{transition: 'all 0.3s ease'}}
                            >
                                📦 View Orders
                            </Button>
                            <Button 
                                variant="outline-success" 
                                onClick={() => setShowAddressForm(!showAddressForm)}
                                className="rounded-pill px-4 fw-semibold"
                                style={{transition: 'all 0.3s ease'}}
                            >
                                {showAddressForm ? '🔼 Hide Address Form' : '🏠 Manage Address'}
                            </Button>
                        </div>
                    </Card.Body>
                </Card>

                {/* Address Form */}
                {showAddressForm && (
                    <Card className="shadow-sm border-0 rounded-4 mb-4">
                        <Card.Header className="bg-transparent border-0 p-4 pb-0">
                            <h5 className="mb-0" style={{color: '#6366f1'}}>🏠 Address Management</h5>
                        </Card.Header>
                        <Card.Body className="p-4">
                            <AddressForm />
                        </Card.Body>
                    </Card>
                )}

                {/* Tiffins Grid */}
                <Card className="shadow-sm border-0 rounded-4">
                    <Card.Header className="bg-transparent border-0 p-4 pb-0">
                        <div className="d-flex justify-content-between align-items-center">
                            <h4 className="mb-0" style={{color: '#6366f1'}}>🍱 My Tiffins</h4>
                            <Badge 
                                className="px-3 py-2 rounded-pill" 
                                style={{background: 'linear-gradient(135deg, #6366f1, #8b5cf6)', color: 'white'}}
                            >
                                {tiffins.length} Items
                            </Badge>
                        </div>
                    </Card.Header>
                    <Card.Body className="p-4">
                        <Row>
                            {tiffins.length === 0 ? (
                                <Col className="text-center py-5">
                                    <div className="text-center">
                                        <div className="mb-4">
                                            <div 
                                                className="rounded-circle mx-auto d-flex align-items-center justify-content-center"
                                                style={{
                                                    width: '100px',
                                                    height: '100px',
                                                    background: 'linear-gradient(135deg, rgba(99, 102, 241, 0.1), rgba(139, 92, 246, 0.1))',
                                                    fontSize: '3rem'
                                                }}
                                            >
                                                🍱
                                            </div>
                                        </div>
                                        <h5 style={{color: '#6366f1'}}>No tiffins added yet</h5>
                                        <p className="text-muted mb-4">Start by adding your first delicious tiffin to showcase your culinary skills!</p>
                                        <Button 
                                            variant="primary" 
                                            onClick={() => setShowAddModal(true)}
                                            className="rounded-pill px-4 fw-semibold"
                                        >
                                            ➕ Add Your First Tiffin
                                        </Button>
                                    </div>
                                </Col>
                            ) : (
                                tiffins.map((tiffin) => (
                                    <Col md={4} key={tiffin.id} className="mb-4">
                                        <Card className="tiffin-card shadow-sm h-100 border-0 rounded-4">
                                            <Card.Body className="p-4">
                                                {tiffin.imageUrl ? (
                                                    <div className="text-center mb-3">
                                                        <img
                                                            src={tiffin.imageUrl}
                                                            alt={tiffin.name}
                                                            className="img-fluid rounded-3 shadow-sm"
                                                            style={{ 
                                                                maxHeight: '180px', 
                                                                objectFit: 'cover', 
                                                                width: '100%',
                                                                border: '2px solid rgba(99, 102, 241, 0.1)'
                                                            }}
                                                        />
                                                    </div>
                                                ) : (
                                                    <div 
                                                        className="text-center mb-3 rounded-3 d-flex align-items-center justify-content-center"
                                                        style={{
                                                            height: '180px',
                                                            background: 'linear-gradient(135deg, rgba(99, 102, 241, 0.05), rgba(139, 92, 246, 0.05))',
                                                            border: '2px solid rgba(99, 102, 241, 0.1)',
                                                            fontSize: '3rem'
                                                        }}
                                                    >
                                                        🍱
                                                    </div>
                                                )}
                                                <Card.Title className="fw-bold mb-2" style={{color: '#1f2937'}}>
                                                    {tiffin.name}
                                                </Card.Title>
                                                <Card.Text className="text-muted mb-3" style={{fontSize: '0.95rem'}}>
                                                    {tiffin.description}
                                                </Card.Text>
                                                <div className="mb-3">
                                                    {getBadge(tiffin.category)}
                                                </div>
                                                <div className="d-flex justify-content-between align-items-center mb-3">
                                                    <div className="fw-bold text-success fs-4">₹{tiffin.price}</div>
                                                    {tiffin.price <= 50 && (
                                                        <Badge bg="danger" className="rounded-pill">🔥 Hot Deal</Badge>
                                                    )}
                                                </div>
                                                <div className="d-flex justify-content-between gap-2">
                                                    <Button 
                                                        variant="warning" 
                                                        size="sm" 
                                                        onClick={() => handleEditClick(tiffin)}
                                                        className="rounded-pill px-3 fw-semibold flex-fill"
                                                        style={{transition: 'all 0.3s ease'}}
                                                    >
                                                        ✏️ Edit
                                                    </Button>
                                                    <Button 
                                                        variant="danger" 
                                                        size="sm" 
                                                        onClick={() => handleDelete(tiffin.id)}
                                                        className="rounded-pill px-3 fw-semibold flex-fill"
                                                        style={{transition: 'all 0.3s ease'}}
                                                    >
                                                        🗑️ Delete
                                                    </Button>
                                                </div>
                                            </Card.Body>
                                        </Card>
                                    </Col>
                                ))
                            )}
                        </Row>
                    </Card.Body>
                </Card>

                {/* Footer Stats */}
                <div className="text-center mt-4">
                    <div className="d-flex justify-content-center align-items-center gap-3 mb-3">
                        <Badge className="px-3 py-2 rounded-pill" style={{background: 'linear-gradient(135deg, #6366f1, #8b5cf6)', color: 'white'}}>
                            👨‍🍳 Vendor Dashboard Active
                        </Badge>
                        <Badge bg="success" className="px-3 py-2 rounded-pill">
                            ✅ Business Ready
                        </Badge>
                    </div>
                    <p className="text-muted small">
                        🚀 Grow Your Business • 📈 Track Performance • 💰 Maximize Profits
                    </p>
                </div>
            </Container>

            {/* Edit Modal */}
            <Modal show={showEditModal} onHide={() => setShowEditModal(false)} centered size="lg">
                <Modal.Header closeButton className="border-0">
                    <Modal.Title style={{color: '#6366f1'}}>✏️ Edit Tiffin</Modal.Title>
                </Modal.Header>
                <Modal.Body className="p-4">
                    {editingTiffin && (
                        <Form>
                            <Form.Group className="mb-3">
                                <Form.Label className="fw-semibold">Title</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="name"
                                    value={editingTiffin.name}
                                    onChange={handleChange}
                                    className="rounded-3"
                                />
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label className="fw-semibold">Description</Form.Label>
                                <Form.Control
                                    as="textarea"
                                    rows={3}
                                    name="description"
                                    value={editingTiffin.description}
                                    onChange={handleChange}
                                    className="rounded-3"
                                />
                            </Form.Group>
                            <Row>
                                <Col md={6}>
                                    <Form.Group className="mb-3">
                                        <Form.Label className="fw-semibold">Price (₹)</Form.Label>
                                        <Form.Control
                                            type="number"
                                            name="price"
                                            value={editingTiffin.price}
                                            onChange={handleChange}
                                            className="rounded-3"
                                        />
                                    </Form.Group>
                                </Col>
                                <Col md={6}>
                                    <Form.Group className="mb-3">
                                        <Form.Label className="fw-semibold">Category</Form.Label>
                                        <Form.Select
                                            name="category"
                                            value={editingTiffin.category}
                                            onChange={handleChange}
                                            className="rounded-3"
                                        >
                                            <option value="BREAKFAST">🌅 BREAKFAST</option>
                                            <option value="LUNCH">🍽️ LUNCH</option>
                                            <option value="DINNER">🌙 DINNER</option>
                                        </Form.Select>
                                    </Form.Group>
                                </Col>
                            </Row>
                            <Form.Group className="mb-3">
                                <Form.Label className="fw-semibold">Image</Form.Label>
                                <Form.Control
                                    type="file"
                                    name="image"
                                    accept="image/*"
                                    onChange={(e) => setEditingTiffin(prev => ({
                                        ...prev,
                                        image: e.target.files[0]
                                    }))}
                                    className="rounded-3"
                                />
                            </Form.Group>
                        </Form>
                    )}
                </Modal.Body>
                <Modal.Footer className="border-0">
                    <Button 
                        variant="secondary" 
                        onClick={() => setShowEditModal(false)}
                        className="rounded-pill px-4"
                    >
                        Cancel
                    </Button>
                    <Button 
                        variant="primary" 
                        onClick={handleUpdate}
                        className="rounded-pill px-4 fw-semibold"
                    >
                        💾 Save Changes
                    </Button>
                </Modal.Footer>
            </Modal>

            {/* Add Modal */}
            <Modal show={showAddModal} onHide={() => setShowAddModal(false)} centered size="lg">
                <Modal.Header closeButton className="border-0">
                    <Modal.Title style={{color: '#6366f1'}}>➕ Add New Tiffin</Modal.Title>
                </Modal.Header>
                <Modal.Body className="p-4">
                    <Form>
                        <Form.Group className="mb-3">
                            <Form.Label className="fw-semibold">Title</Form.Label>
                            <Form.Control
                                type="text"
                                name="name"
                                value={newTiffin.name}
                                onChange={handleNewTiffinChange}
                                placeholder="Enter tiffin name..."
                                className="rounded-3"
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label className="fw-semibold">Description</Form.Label>
                            <Form.Control
                                as="textarea"
                                rows={3}
                                name="description"
                                value={newTiffin.description}
                                onChange={handleNewTiffinChange}
                                placeholder="Describe your delicious tiffin..."
                                className="rounded-3"
                            />
                        </Form.Group>
                        <Row>
                            <Col md={6}>
                                <Form.Group className="mb-3">
                                    <Form.Label className="fw-semibold">Price (₹)</Form.Label>
                                    <Form.Control
                                        type="number"
                                        name="price"
                                        value={newTiffin.price}
                                        onChange={handleNewTiffinChange}
                                        placeholder="0"
                                        className="rounded-3"
                                    />
                                </Form.Group>
                            </Col>
                            <Col md={6}>
                                <Form.Group className="mb-3">
                                    <Form.Label className="fw-semibold">Category</Form.Label>
                                    <Form.Select
                                        name="category"
                                        value={newTiffin.category}
                                        onChange={handleNewTiffinChange}
                                        className="rounded-3"
                                    >
                                        <option value="BREAKFAST">🌅 BREAKFAST</option>
                                        <option value="LUNCH">🍽️ LUNCH</option>
                                        <option value="DINNER">🌙 DINNER</option>
                                    </Form.Select>
                                </Form.Group>
                            </Col>
                        </Row>
                        <Form.Group className="mb-3">
                            <Form.Label className="fw-semibold">Image</Form.Label>
                            <Form.Control
                                type="file"
                                name="image"
                                accept="image/*"
                                onChange={handleNewTiffinChange}
                                className="rounded-3"
                            />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer className="border-0">
                    <Button 
                        variant="secondary" 
                        onClick={() => setShowAddModal(false)}
                        className="rounded-pill px-4"
                    >
                        Cancel
                    </Button>
                    <Button 
                        variant="primary" 
                        onClick={handleAddTiffin}
                        className="rounded-pill px-4 fw-semibold"
                    >
                        ➕ Add Tiffin
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
};

export default VendorDashboard;