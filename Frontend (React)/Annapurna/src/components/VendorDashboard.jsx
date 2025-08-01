import { useEffect, useState } from 'react';
import { Container, Row, Col, Card, Button, Form, Modal, Spinner, Alert } from 'react-bootstrap';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import AddressForm from './AddressForm';

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
            const res = await axios.get('http://localhost:8080/api/vendor/tiffins', {
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
            await axios.delete(`http://localhost:8080/api/vendor/tiffins/${id}`, {
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
                formData.append("image", editingTiffin.image); // 👈 optional new image
            }

            await axios.put(
                `http://localhost:8080/api/vendor/tiffins/${editingTiffin.id}`,
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

            await axios.post("http://localhost:8080/api/vendor/tiffins", formData, {
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


    if (loading) return <div className="text-center mt-5"><Spinner animation="border" /></div>;

    return (
        <Container className="mt-4">
            <h3>My Tiffins</h3>

            {message && <Alert variant="success">{message}</Alert>}
            {error && <Alert variant="danger">{error}</Alert>}

            <div className="mb-3 text-end">
                <Button variant="primary" className="me-2" onClick={() => setShowAddModal(true)}>
                    ➕ Add Tiffin
                </Button>
                <Button variant="info" className="me-2" onClick={() => navigate('/vendor/orders')}>
                    📦 View Orders
                </Button>
                <Button variant="outline-success" onClick={() => setShowAddressForm(!showAddressForm)}>
                    {showAddressForm ? 'Hide Address Form' : 'Manage Address'}
                </Button>
            </div>

            {showAddressForm && (
                <div className="mb-4">
                    <AddressForm />
                </div>
            )}

            <Row>
                {tiffins.map((tiffin) => (
                    <Col md={4} key={tiffin.id} className="mb-4">
                        <Card>
                            <Card.Body>
                                {tiffin.imageUrl && (
                                    <div className="text-center mb-2">
                                        <img
                                            src={tiffin.imageUrl}
                                            alt={tiffin.name}
                                            style={{ maxWidth: '100%', maxHeight: '150px', objectFit: 'cover' }}
                                        />
                                    </div>
                                )}
                                <Card.Title>{tiffin.name}</Card.Title>
                                <Card.Text>{tiffin.description}</Card.Text>
                                <Card.Text><strong>Category:</strong> {tiffin.category}</Card.Text>
                                <Card.Text><strong>₹{tiffin.price}</strong></Card.Text>
                                <Button variant="warning" size="sm" onClick={() => handleEditClick(tiffin)}>Edit</Button>{' '}
                                <Button variant="danger" size="sm" onClick={() => handleDelete(tiffin.id)}>Delete</Button>
                            </Card.Body>

                        </Card>
                    </Col>
                ))}
            </Row>

            {/* Edit Modal */}
            <Modal show={showEditModal} onHide={() => setShowEditModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Edit Tiffin</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {editingTiffin && (
                        <Form>
                            <Form.Group className="mb-3">
                                <Form.Label>Title</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="name"
                                    value={editingTiffin.name}
                                    onChange={handleChange}
                                />
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label>Description</Form.Label>
                                <Form.Control
                                    as="textarea"
                                    name="description"
                                    value={editingTiffin.description}
                                    onChange={handleChange}
                                />
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label>Price</Form.Label>
                                <Form.Control
                                    type="number"
                                    name="price"
                                    value={editingTiffin.price}
                                    onChange={handleChange}
                                />
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label>Category</Form.Label>
                                <Form.Select
                                    name="category"
                                    value={editingTiffin.category}
                                    onChange={handleChange}
                                >
                                    <option value="BREAKFAST">BREAKFAST</option>
                                    <option value="LUNCH">LUNCH</option>
                                    <option value="DINNER">DINNER</option>
                                </Form.Select>
                            </Form.Group>

                            <Form.Group className="mb-3">
                                <Form.Label>Image</Form.Label>
                                <Form.Control
                                    type="file"
                                    name="image"
                                    accept="image/*"
                                    onChange={(e) => setEditingTiffin(prev => ({
                                        ...prev,
                                        image: e.target.files[0]
                                    }))}
                                />
                            </Form.Group>

                        </Form>
                    )}
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowEditModal(false)}>Cancel</Button>
                    <Button variant="primary" onClick={handleUpdate}>Save Changes</Button>
                </Modal.Footer>
            </Modal>

            {/* Add Modal */}
            <Modal show={showAddModal} onHide={() => setShowAddModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Add New Tiffin</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group className="mb-3">
                            <Form.Label>Title</Form.Label>
                            <Form.Control
                                type="text"
                                name="name"
                                value={newTiffin.name}
                                onChange={handleNewTiffinChange}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Description</Form.Label>
                            <Form.Control
                                as="textarea"
                                name="description"
                                value={newTiffin.description}
                                onChange={handleNewTiffinChange}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Price</Form.Label>
                            <Form.Control
                                type="number"
                                name="price"
                                value={newTiffin.price}
                                onChange={handleNewTiffinChange}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Category</Form.Label>
                            <Form.Select
                                name="category"
                                value={newTiffin.category}
                                onChange={handleNewTiffinChange}
                            >
                                <option value="BREAKFAST">BREAKFAST</option>
                                <option value="LUNCH">LUNCH</option>
                                <option value="DINNER">DINNER</option>
                            </Form.Select>
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Image</Form.Label>
                            <Form.Control
                                type="file"
                                name="image"
                                accept="image/*"
                                onChange={handleNewTiffinChange}
                            />
                        </Form.Group>

                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowAddModal(false)}>Cancel</Button>
                    <Button variant="primary" onClick={handleAddTiffin}>Add Tiffin</Button>
                </Modal.Footer>
            </Modal>
        </Container>
    );
};

export default VendorDashboard;
