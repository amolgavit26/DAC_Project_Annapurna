import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { 
    Table, 
    Button, 
    Alert, 
    Badge, 
    Form, 
    Tabs, 
    Tab, 
    InputGroup, 
    Card, 
    Container, 
    Row, 
    Col,
    Spinner
} from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const TiffinList = () => {
    const [tiffins, setTiffins] = useState([]);
    const [filteredTiffins, setFilteredTiffins] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [activeCategory, setActiveCategory] = useState('ALL');
    const [sortOrder, setSortOrder] = useState('asc');
    const [error, setError] = useState('');
    const [role, setRole] = useState('');
    const [loading, setLoading] = useState(true);
    const [quickFilterActive, setQuickFilterActive] = useState('');

    const navigate = useNavigate();

    useEffect(() => {
        const roleStored = localStorage.getItem('role') || '';
        setRole(roleStored);

        const fetchTiffins = async () => {
            try {
                setLoading(true);
                const res = await axios.get('http://localhost:8080/api/tiffin/all');
                setTiffins(res.data);
                setFilteredTiffins(res.data);
            } catch (err) {
                console.error(err);
                setError('Failed to load tiffins');
            } finally {
                setLoading(false);
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
                return <Badge bg="warning" text="dark" className="px-3 py-2 rounded-pill">🌅 Breakfast</Badge>;
            case 'LUNCH':
                return <Badge bg="success" className="px-3 py-2 rounded-pill">🍽️ Lunch</Badge>;
            case 'DINNER':
                return <Badge bg="dark" className="px-3 py-2 rounded-pill">🌙 Dinner</Badge>;
            default:
                return <Badge bg="secondary" className="px-3 py-2 rounded-pill">❓ Unknown</Badge>;
        }
    };

    const handleSortToggle = () => {
        setSortOrder(prev => (prev === 'asc' ? 'desc' : 'asc'));
    };

    const redirectToOrderForm = (id) => {
        navigate(`/order-form/${id}`);
    };

    // Fixed Quick Filter handlers
    const handleAllItems = () => {
        setSearchTerm('');
        setActiveCategory('ALL');
        setQuickFilterActive('all');
        // This will trigger useEffect to show all tiffins
    };

    const handleUnder100 = () => {
        setSearchTerm('');
        setActiveCategory('ALL');
        setQuickFilterActive('under100');
        // Filter will be applied in useEffect
    };

    const handlePremium = () => {
        setSearchTerm('');
        setActiveCategory('ALL');
        setQuickFilterActive('premium');
        // Filter will be applied in useEffect
    };

    const handlePopularLunch = () => {
        setSearchTerm('');
        setActiveCategory('LUNCH');
        setQuickFilterActive('lunch');
        // This will trigger useEffect to filter by LUNCH category
    };

    // Enhanced useEffect to handle quick filters
    useEffect(() => {
        let result = [...tiffins];

        // Apply category filter first
        if (activeCategory !== 'ALL') {
            result = result.filter(t => t.category === activeCategory);
        }

        // Apply search term filter
        if (searchTerm.trim() !== '') {
            result = result.filter(t =>
                (t.name?.toLowerCase().includes(searchTerm.toLowerCase()) || '') ||
                (t.description?.toLowerCase().includes(searchTerm.toLowerCase()) || '')
            );
        }

        // Apply quick filter logic
        if (quickFilterActive === 'under100') {
            result = result.filter(t => t.price <= 100);
        } else if (quickFilterActive === 'premium') {
            result = result.filter(t => t.price >= 150);
        }

        // Apply sorting
        result.sort((a, b) => sortOrder === 'asc' ? a.price - b.price : b.price - a.price);

        setFilteredTiffins(result);
    }, [tiffins, activeCategory, searchTerm, sortOrder, quickFilterActive]);

    if (loading) {
        return (
            <Container className="mt-5 text-center">
                <Spinner animation="border" style={{color: '#6366f1'}} />
                <p className="mt-2" style={{color: '#6366f1'}}>Loading delicious tiffins...</p>
            </Container>
        );
    }

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
            .btn-outline-primary {
                border-color: #6366f1;
                color: #6366f1;
            }
            .btn-outline-primary:hover {
                background: linear-gradient(135deg, #6366f1, #8b5cf6);
                border-color: #6366f1;
            }
            .card {
                border: 1px solid rgba(99, 102, 241, 0.1);
                background: rgba(255, 255, 255, 0.95);
                backdrop-filter: blur(10px);
            }
            .table-light {
                background: linear-gradient(135deg, rgba(99, 102, 241, 0.05), rgba(139, 92, 246, 0.05));
            }
            .nav-pills .nav-link.active {
                background: linear-gradient(135deg, #6366f1, #8b5cf6);
            }
            .nav-pills .nav-link {
                color: #6366f1;
                border: 1px solid rgba(99, 102, 241, 0.2);
                margin: 0 2px;
            }
            .nav-pills .nav-link:hover {
                background: rgba(99, 102, 241, 0.1);
            }
            .badge.bg-light {
                background: linear-gradient(135deg, rgba(99, 102, 241, 0.1), rgba(139, 92, 246, 0.1)) !important;
                color: #6366f1 !important;
            }
            .text-primary {
                color: #6366f1 !important;
            }
            .bg-primary {
                background: linear-gradient(135deg, #6366f1, #8b5cf6) !important;
            }
            .border-primary {
                border-color: #6366f1 !important;
            }
        </style>
    `;

    return (
        <>
        <div dangerouslySetInnerHTML={{__html: customStyles}} />
        <div className="position-relative overflow-hidden hero-gradient" style={{minHeight: '250px'}}>
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
                        <h1 className="display-4 fw-bold mb-3">🍱 Delicious Tiffins</h1>
                        <p className="lead mb-4 opacity-90">Fresh, homemade meals delivered right to your doorstep. Experience authentic flavors from trusted local vendors.</p>
                        <div className="d-flex flex-wrap gap-3">
                            <div className="d-flex align-items-center">
                                <div className="bg-white bg-opacity-20 rounded-circle p-2 me-2">
                                    <span className="text-white">🚚</span>
                                </div>
                                <span className="small">Fast Delivery</span>
                            </div>
                            <div className="d-flex align-items-center">
                                <div className="bg-white bg-opacity-20 rounded-circle p-2 me-2">
                                    <span className="text-white">✅</span>
                                </div>
                                <span className="small">Quality Assured</span>
                            </div>
                            <div className="d-flex align-items-center">
                                <div className="bg-white bg-opacity-20 rounded-circle p-2 me-2">
                                    <span className="text-white">💰</span>
                                </div>
                                <span className="small">Best Prices</span>
                            </div>
                        </div>
                    </Col>
                    <Col lg={4} className="text-center">
                        <div className="position-relative">
                            <div className="bg-white bg-opacity-20 rounded-circle p-4 d-inline-block">
                                <span style={{fontSize: '4rem'}}>🍽️</span>
                            </div>
                        </div>
                    </Col>
                </Row>
            </Container>
        </div>

        <Container fluid className="mt-4 px-4">

            {error && (
                <Alert variant="danger" className="shadow-sm border-0 rounded-3">
                    <Alert.Heading>Oops! Something went wrong</Alert.Heading>
                    {error}
                </Alert>
            )}

            <Row className="mb-4">
                <Col md={6}>
                    <InputGroup size="lg" className="shadow-sm">
                        <InputGroup.Text className="bg-light border-end-0" style={{color: '#6366f1'}}>
                            🔍
                        </InputGroup.Text>
                        <Form.Control
                            placeholder="Search for your favorite tiffin..."
                            value={searchTerm}
                            onChange={(e) => {
                                setSearchTerm(e.target.value);
                                setQuickFilterActive(''); // Reset quick filter when searching
                            }}
                            className="border-start-0 ps-0"
                            style={{fontSize: '1rem', borderColor: 'rgba(99, 102, 241, 0.2)'}}
                        />
                    </InputGroup>
                </Col>
                <Col md={6} className="d-flex justify-content-end align-items-center">
                    <Button 
                        variant="outline-primary" 
                        size="lg"
                        onClick={handleSortToggle}
                        className="shadow-sm rounded-pill px-4"
                        style={{transition: 'all 0.3s ease'}}
                    >
                        💰 Sort Price: {sortOrder === 'asc' ? 'Low → High' : 'High → Low'}
                    </Button>
                </Col>
            </Row>

            <Card className="shadow-sm border-0 mb-4">
                <Card.Body className="p-0">
                    <Tabs
                        activeKey={activeCategory}
                        onSelect={(k) => {
                            setActiveCategory(k);
                            setQuickFilterActive(''); // Reset quick filter when changing category
                        }}
                        className="border-0"
                        justify
                        variant="pills"
                    >
                        <Tab eventKey="ALL" title="🍴 All" className="fw-semibold" />
                        <Tab eventKey="BREAKFAST" title="🌅 Breakfast" className="fw-semibold" />
                        <Tab eventKey="LUNCH" title="🍽️ Lunch" className="fw-semibold" />
                        <Tab eventKey="DINNER" title="🌙 Dinner" className="fw-semibold" />
                    </Tabs>
                </Card.Body>
            </Card>

            <Card className="shadow-sm border-0">
                <Card.Body className="p-0">
                    <div className="table-responsive">
                        <Table hover className="mb-0">
                            <thead className="table-light">
                                <tr>
                                    <th className="border-0 py-3 fw-semibold text-muted">ID</th>
                                    <th className="border-0 py-3 fw-semibold text-muted">Image</th>
                                    <th className="border-0 py-3 fw-semibold text-muted">Title</th>
                                    <th className="border-0 py-3 fw-semibold text-muted">Description</th>
                                    <th className="border-0 py-3 fw-semibold text-muted">Category</th>
                                    <th className="border-0 py-3 fw-semibold text-muted">
                                        Price (₹)
                                        <Button
                                            variant="link"
                                            size="sm"
                                            onClick={handleSortToggle}
                                            className="text-decoration-none p-0 ms-1"
                                            style={{color: '#6366f1'}}
                                        >
                                            {sortOrder === 'asc' ? '↗️' : '↘️'}
                                        </Button>
                                    </th>
                                    <th className="border-0 py-3 fw-semibold text-muted">Vendor</th>
                                    {role.toUpperCase() === 'CUSTOMER' && (
                                        <th className="border-0 py-3 fw-semibold text-muted text-center">Action</th>
                                    )}
                                </tr>
                            </thead>
                            <tbody>
                                {filteredTiffins.length === 0 ? (
                                    <tr>
                                        <td colSpan="8" className="text-center py-5 text-muted">
                                            <div>
                                                <h5 style={{color: '#6366f1'}}>🔍 No tiffins found</h5>
                                                <p className="mb-0">Try adjusting your search or category filter</p>
                                            </div>
                                        </td>
                                    </tr>
                                ) : (
                                    filteredTiffins.map(t => (
                                        <tr key={t.id} className="align-middle">
                                            <td className="border-0 py-3">
                                                <Badge bg="light" text="dark" className="rounded-pill px-2">
                                                    #{t.id}
                                                </Badge>
                                            </td>
                                            <td className="border-0 py-3">
                                                {t.imageUrl ? (
                                                    <div className="position-relative">
                                                        <img 
                                                            src={t.imageUrl} 
                                                            alt={t.name} 
                                                            className="rounded-3 shadow-sm object-fit-cover"
                                                            width={70} 
                                                            height={70}
                                                            style={{objectFit: 'cover', border: '2px solid rgba(99, 102, 241, 0.1)'}}
                                                        />
                                                    </div>
                                                ) : (
                                                    <div 
                                                        className="d-flex align-items-center justify-content-center rounded-3 text-muted"
                                                        style={{
                                                            width: '70px', 
                                                            height: '70px',
                                                            background: 'linear-gradient(135deg, rgba(99, 102, 241, 0.1), rgba(139, 92, 246, 0.1))',
                                                            border: '2px solid rgba(99, 102, 241, 0.2)'
                                                        }}
                                                    >
                                                        🍱
                                                    </div>
                                                )}
                                            </td>
                                            <td className="border-0 py-3">
                                                <div className="fw-semibold" style={{color: '#1f2937'}}>{t.name}</div>
                                            </td>
                                            <td className="border-0 py-3">
                                                <div className="text-muted" style={{maxWidth: '200px'}}>
                                                    {t.description}
                                                </div>
                                            </td>
                                            <td className="border-0 py-3">{getBadge(t.category)}</td>
                                            <td className="border-0 py-3">
                                                <div className="position-relative d-flex align-items-center gap-2">
                                                    <div className="fw-bold text-success fs-5">₹{t.price}</div>
                                                    {t.price <= 50 && (
                                                        <Badge bg="danger" className="rounded-pill small">🔥 Hot Deal</Badge>
                                                    )}
                                                </div>
                                            </td>
                                            <td className="border-0 py-3">
                                                <div className="fw-semibold" style={{color: '#6366f1'}}>👨‍🍳 {t.vendorName}</div>
                                            </td>
                                            {role.toUpperCase() === 'CUSTOMER' && (
                                                <td className="border-0 py-3 text-center">
                                                    <div className="d-flex gap-1 justify-content-center">
                                                        <Button
                                                            variant="success"
                                                            size="sm"
                                                            onClick={() => redirectToOrderForm(t.id)}
                                                            className="rounded-pill px-3 shadow-sm fw-semibold"
                                                            style={{transition: 'all 0.3s ease'}}
                                                        >
                                                            🛒 Order Now
                                                        </Button>
                                                        <Button
                                                            variant="outline-info"
                                                            size="sm"
                                                            className="rounded-pill px-2"
                                                            title="Quick View"
                                                            style={{borderColor: '#6366f1', color: '#6366f1'}}
                                                        >
                                                            👁️
                                                        </Button>
                                                    </div>
                                                </td>
                                            )}
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </Table>
                    </div>
                </Card.Body>
            </Card>

            {/* Stats Cards */}
            <Row className="mt-4 mb-4">
                <Col md={3} sm={6} className="mb-3">
                    <Card className="border-0 shadow-sm h-100" style={{background: 'linear-gradient(135deg, rgba(99, 102, 241, 0.05), rgba(139, 92, 246, 0.05))'}}>
                        <Card.Body className="text-center">
                            <div className="display-6 mb-2" style={{color: '#6366f1'}}>🍱</div>
                            <h5 className="fw-bold">{filteredTiffins.length}</h5>
                            <p className="text-muted mb-0 small">Available Tiffins</p>
                        </Card.Body>
                    </Card>
                </Col>
                <Col md={3} sm={6} className="mb-3">
                    <Card className="border-0 shadow-sm h-100" style={{background: 'linear-gradient(135deg, rgba(34, 197, 94, 0.05), rgba(22, 163, 74, 0.05))'}}>
                        <Card.Body className="text-center">
                            <div className="display-6 text-success mb-2">💰</div>
                            <h5 className="fw-bold">
                                ₹{filteredTiffins.length > 0 ? Math.min(...filteredTiffins.map(t => t.price)) : 0}
                            </h5>
                            <p className="text-muted mb-0 small">Starting From</p>
                        </Card.Body>
                    </Card>
                </Col>
                <Col md={3} sm={6} className="mb-3">
                    <Card className="border-0 shadow-sm h-100" style={{background: 'linear-gradient(135deg, rgba(251, 191, 36, 0.05), rgba(245, 158, 11, 0.05))'}}>
                        <Card.Body className="text-center">
                            <div className="display-6 text-warning mb-2">👨‍🍳</div>
                            <h5 className="fw-bold">
                                {[...new Set(filteredTiffins.map(t => t.vendorName))].length}
                            </h5>
                            <p className="text-muted mb-0 small">Active Vendors</p>
                        </Card.Body>
                    </Card>
                </Col>
                <Col md={3} sm={6} className="mb-3">
                    <Card className="border-0 shadow-sm h-100" style={{background: 'linear-gradient(135deg, rgba(6, 182, 212, 0.05), rgba(14, 165, 233, 0.05))'}}>
                        <Card.Body className="text-center">
                            <div className="display-6 text-info mb-2">⭐</div>
                            <h5 className="fw-bold">Fresh</h5>
                            <p className="text-muted mb-0 small">Daily Made</p>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>

            {/* Quick Filters - FIXED */}
            {tiffins.length > 0 && (
                <Card className="shadow-sm border-0 mb-4">
                    <Card.Body>
                        <h6 className="fw-semibold text-muted mb-3">🎯 Quick Filters</h6>
                        <div className="d-flex flex-wrap gap-2">
                            <Button 
                                variant={quickFilterActive === 'all' || (searchTerm === '' && activeCategory === 'ALL' && quickFilterActive === '') ? 'primary' : 'outline-primary'} 
                                size="sm" 
                                className="rounded-pill"
                                onClick={handleAllItems}
                                style={{transition: 'all 0.3s ease'}}
                            >
                                All Items
                            </Button>
                            <Button 
                                variant={quickFilterActive === 'under100' ? 'warning' : 'outline-warning'} 
                                size="sm" 
                                className="rounded-pill"
                                onClick={handleUnder100}
                                style={{transition: 'all 0.3s ease'}}
                            >
                                💸 Under ₹100
                            </Button>
                            <Button 
                                variant={quickFilterActive === 'premium' ? 'success' : 'outline-success'} 
                                size="sm" 
                                className="rounded-pill"
                                onClick={handlePremium}
                                style={{transition: 'all 0.3s ease'}}
                            >
                                ⭐ Premium
                            </Button>
                            <Button 
                                variant={quickFilterActive === 'lunch' ? 'info' : 'outline-info'} 
                                size="sm" 
                                className="rounded-pill"
                                onClick={handlePopularLunch}
                                style={{
                                    transition: 'all 0.3s ease',
                                    borderColor: quickFilterActive === 'lunch' ? '#6366f1' : 'rgba(99, 102, 241, 0.5)',
                                    color: quickFilterActive === 'lunch' ? 'white' : '#6366f1',
                                    background: quickFilterActive === 'lunch' ? 'linear-gradient(135deg, #6366f1, #8b5cf6)' : 'transparent'
                                }}
                            >
                                🍽️ Popular Lunch
                            </Button>
                        </div>
                    </Card.Body>
                </Card>
            )}

            <div className="text-center mt-4 mb-5">
                <div className="d-flex justify-content-center align-items-center gap-3 mb-3">
                    <Badge className="px-3 py-2 rounded-pill" style={{background: 'linear-gradient(135deg, #6366f1, #8b5cf6)', color: 'white'}}>
                        📊 Showing {filteredTiffins.length} of {tiffins.length} tiffins
                    </Badge>
                    {activeCategory !== 'ALL' && (
                        <Badge bg="info" className="px-3 py-2 rounded-pill">
                            📂 {activeCategory.toLowerCase()} category
                        </Badge>
                    )}
                    {quickFilterActive && (
                        <Badge bg="secondary" className="px-3 py-2 rounded-pill">
                            🔍 {quickFilterActive === 'under100' ? 'Under ₹100' : 
                                quickFilterActive === 'premium' ? 'Premium' : 
                                quickFilterActive === 'lunch' ? 'Lunch Items' : 'All Items'} filter
                        </Badge>
                    )}
                </div>
                <p className="text-muted small">
                    🚀 Fresh tiffins delivered daily • 📞 24/7 Support • 🔒 Secure Ordering
                </p>
            </div>
        </Container>
        </>
    );
};

export default TiffinList;