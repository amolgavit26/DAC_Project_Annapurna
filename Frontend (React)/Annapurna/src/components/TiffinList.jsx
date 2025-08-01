import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Table, Button, Alert, Badge, Form, Tabs, Tab, InputGroup } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const TiffinList = () => {
    const [tiffins, setTiffins] = useState([]);
    const [filteredTiffins, setFilteredTiffins] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [activeCategory, setActiveCategory] = useState('ALL');
    const [sortOrder, setSortOrder] = useState('asc');
    const [error, setError] = useState('');
    const [role, setRole] = useState('');

    const navigate = useNavigate();

    useEffect(() => {
        const roleStored = localStorage.getItem('role') || '';
        setRole(roleStored);

        const fetchTiffins = async () => {
            try {
                const res = await axios.get('http://localhost:8080/api/tiffin/all');
                setTiffins(res.data);
                setFilteredTiffins(res.data);
            } catch (err) {
                console.error(err);
                setError('Failed to load tiffins');
            }
        };

        fetchTiffins();
    }, []);

    useEffect(() => {
        let result = [...tiffins];

        if (activeCategory !== 'ALL') {
            result = result.filter(t => t.category === activeCategory);
        }

        if (searchTerm.trim() !== '') {
            result = result.filter(t =>
                (t.name?.toLowerCase().includes(searchTerm.toLowerCase()) || '') ||
                (t.description?.toLowerCase().includes(searchTerm.toLowerCase()) || '')
            );
        }

        result.sort((a, b) => sortOrder === 'asc' ? a.price - b.price : b.price - a.price);

        setFilteredTiffins(result);
    }, [tiffins, activeCategory, searchTerm, sortOrder]);

    const getBadge = (category) => {
        switch (category) {
            case 'BREAKFAST':
                return <Badge bg="warning" text="dark">Breakfast</Badge>;
            case 'LUNCH':
                return <Badge bg="success">Lunch</Badge>;
            case 'DINNER':
                return <Badge bg="dark">Dinner</Badge>;
            default:
                return <Badge bg="secondary">Unknown</Badge>;
        }
    };

    const handleSortToggle = () => {
        setSortOrder(prev => (prev === 'asc' ? 'desc' : 'asc'));
    };

    const redirectToOrderForm = (id) => {
        navigate(`/order-form/${id}`);
    };

    return (
        <div className="container mt-4">
            <h2 className="mb-3">🍱 Available Tiffins</h2>

            {error && <Alert variant="danger">{error}</Alert>}

            <div className="d-flex justify-content-between align-items-center mb-3">
                <InputGroup style={{ maxWidth: '300px' }}>
                    <Form.Control
                        placeholder="Search tiffin..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </InputGroup>

                <Button variant="outline-secondary" onClick={handleSortToggle}>
                    Sort Price: {sortOrder === 'asc' ? 'Low → High' : 'High → Low'}
                </Button>
            </div>

            <Tabs
                activeKey={activeCategory}
                onSelect={(k) => setActiveCategory(k)}
                className="mb-3"
                justify
            >
                <Tab eventKey="ALL" title="All" />
                <Tab eventKey="BREAKFAST" title="Breakfast" />
                <Tab eventKey="LUNCH" title="Lunch" />
                <Tab eventKey="DINNER" title="Dinner" />
            </Tabs>

            <Table striped bordered hover responsive>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Image</th>
                        <th>Title</th>
                        <th>Description</th>
                        <th>Category</th>
                        <th>
                            Price (₹)
                            <Button
                                variant="link"
                                size="sm"
                                onClick={handleSortToggle}
                                style={{ textDecoration: 'none' }}
                            >
                                {sortOrder === 'asc' ? '↑' : '↓'}
                            </Button>
                        </th>
                        <th>Vendor</th>
                        {role.toUpperCase() === 'CUSTOMER' && <th>Action</th>}
                    </tr>
                </thead>
                <tbody>
                    {filteredTiffins.length === 0 ? (
                        <tr>
                            <td colSpan="8" className="text-center">No tiffins found.</td>
                        </tr>
                    ) : (
                        filteredTiffins.map(t => (
                            <tr key={t.id}>
                                <td>{t.id}</td>
                                <td>
                                    {t.imageUrl ? (
                                        <img src={t.imageUrl} alt={t.name} width={60} height={60} />
                                    ) : 'No Image'}
                                </td>
                                <td>{t.name}</td>
                                <td>{t.description}</td>
                                <td>{getBadge(t.category)}</td>
                                <td>₹{t.price}</td>
                                <td>{t.vendorName}</td>
                                {role.toUpperCase() === 'CUSTOMER' && (
                                    <td>
                                        <Button
                                            variant="success"
                                            size="sm"
                                            onClick={() => redirectToOrderForm(t.id)}
                                        >
                                            Order
                                        </Button>
                                    </td>
                                )}
                            </tr>
                        ))
                    )}
                </tbody>
            </Table>
        </div>
    );
};

export default TiffinList;
