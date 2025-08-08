import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { 
    Table, 
    Button, 
    Tabs, 
    Tab, 
    Alert, 
    Container, 
    Row, 
    Col, 
    Card, 
    Badge,
    Spinner
} from 'react-bootstrap';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import BASE_URL from '../config';
import api from '../services/api';


const AdminDashboard = () => {
    const [customers, setCustomers] = useState([]);
    const [vendors, setVendors] = useState([]);
    const [activeTab, setActiveTab] = useState('customers');
    const [message, setMessage] = useState('');
    const [variant, setVariant] = useState('success');
    const [loading, setLoading] = useState(true);

    const token = localStorage.getItem('token');

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            await Promise.all([fetchCustomers(), fetchVendors()]);
            setLoading(false);
        };
        fetchData();
    }, []);

    const fetchCustomers = async () => {
        try {
            const res = await api.get(`${BASE_URL}/api/admin/customers`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            setCustomers(res.data);
        } catch (err) {
            console.error('Error fetching customers', err);
            toast.error("❌ Failed to fetch customers");
        }
    };

    const fetchVendors = async () => {
        try {
            const res = await api.get(`${BASE_URL}/api/admin/vendors`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            setVendors(res.data);
        } catch (err) {
            console.error('Error fetching vendors', err);
            toast.error("❌ Failed to fetch vendors");
        }
    };

    const handleDeleteCustomer = async (customerId) => {
        try {
            await api.delete(`${BASE_URL}/api/admin/delete/${customerId}`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            toast.success("✅ Customer deleted successfully!");
            fetchCustomers();
        } catch (err) {
            console.error("Error deleting customer", err);
            toast.error("❌ Failed to delete customer");
        }
    };

    const handleDeleteVendor = async (vendorId) => {
        try {
            await api.delete(`${BASE_URL}/api/admin/vendor/delete/${vendorId}`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            toast.success("✅ Vendor deleted successfully!");
            fetchVendors();
        } catch (err) {
            console.error("Error deleting vendor", err);
            toast.error("❌ Failed to delete vendor");
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
            .table-hover tbody tr:hover {
                background-color: rgba(99, 102, 241, 0.05);
            }
            .dashboard-card {
                transition: all 0.3s ease;
                border: 2px solid transparent;
            }
            .dashboard-card:hover {
                transform: translateY(-5px);
                border-color: rgba(99, 102, 241, 0.2);
                box-shadow: 0 10px 30px rgba(99, 102, 241, 0.15);
            }
            .stats-icon {
                background: linear-gradient(135deg, rgba(99, 102, 241, 0.1), rgba(139, 92, 246, 0.1));
                width: 60px;
                height: 60px;
                border-radius: 50%;
                display: flex;
                align-items: center;
                justify-content: center;
                margin: 0 auto;
                font-size: 1.5rem;
            }
        </style>
    `;

    if (loading) {
        return (
            <Container className="mt-5 text-center">
                <Spinner animation="border" style={{color: '#6366f1'}} />
                <p className="mt-2" style={{color: '#6366f1'}}>Loading dashboard...</p>
            </Container>
        );
    }

    return (
        <>
            <div dangerouslySetInnerHTML={{__html: customStyles}} />
            <ToastContainer
                position="top-right"
                autoClose={3000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                toastStyle={{
                    background: 'linear-gradient(135deg, rgba(99, 102, 241, 0.05), rgba(139, 92, 246, 0.05))',
                    border: '1px solid rgba(99, 102, 241, 0.1)'
                }}
            />
            
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
                            <h1 className="display-5 fw-bold mb-3">🛡️ Admin Dashboard</h1>
                            <p className="lead mb-0 opacity-90">Manage customers and vendors with comprehensive admin controls</p>
                        </Col>
                        <Col lg={4} className="text-center">
                            <div className="position-relative">
                                <div className="bg-white bg-opacity-20 rounded-circle p-4 d-inline-block">
                                    <span style={{fontSize: '3rem'}}>👑</span>
                                </div>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </div>

            <Container className="mt-4 mb-5">
                {message && (
                    <Alert variant={variant} className="shadow-sm border-0 rounded-3 mb-4">
                        <Alert.Heading>Notification</Alert.Heading>
                        {message}
                    </Alert>
                )}

                {/* Stats Cards */}
                <Row className="mb-4">
                    <Col md={6} className="mb-3">
                        <Card className="dashboard-card border-0 shadow-sm h-100">
                            <Card.Body className="text-center p-4">
                                <div className="stats-icon mb-3">👥</div>
                                <h3 className="fw-bold mb-2" style={{color: '#6366f1'}}>{customers.length}</h3>
                                <p className="text-muted mb-0">Total Customers</p>
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col md={6} className="mb-3">
                        <Card className="dashboard-card border-0 shadow-sm h-100">
                            <Card.Body className="text-center p-4">
                                <div className="stats-icon mb-3">🏪</div>
                                <h3 className="fw-bold mb-2" style={{color: '#8b5cf6'}}>{vendors.length}</h3>
                                <p className="text-muted mb-0">Total Vendors</p>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>

                {/* Main Content */}
                <Card className="shadow-sm border-0">
                    <Card.Body className="p-0">
                        <Tabs
                            activeKey={activeTab}
                            onSelect={(k) => setActiveTab(k)}
                            className="border-0 px-3 pt-3"
                            variant="pills"
                        >
                            <Tab 
                                eventKey="customers" 
                                title={
                                    <span className="fw-semibold d-flex align-items-center gap-2">
                                        👥 Customers
                                        <Badge 
                                            className="rounded-pill small" 
                                            style={{background: 'linear-gradient(135deg, #6366f1, #8b5cf6)', color: 'white'}}
                                        >
                                            {customers.length}
                                        </Badge>
                                    </span>
                                }
                            >
                                <div className="p-3">
                                    <div className="d-flex justify-content-between align-items-center mb-3">
                                        <h5 className="mb-0" style={{color: '#6366f1'}}>Customer Management</h5>
                                        <Badge bg="light" text="dark" className="px-3 py-2 rounded-pill">
                                            📊 {customers.length} Active Customers
                                        </Badge>
                                    </div>
                                    
                                    <div className="table-responsive">
                                        <Table hover className="mb-0">
                                            <thead className="table-light">
                                                <tr>
                                                    <th className="border-0 py-3 fw-semibold text-muted">ID</th>
                                                    <th className="border-0 py-3 fw-semibold text-muted">Email</th>
                                                    <th className="border-0 py-3 fw-semibold text-muted">Full Name</th>
                                                    <th className="border-0 py-3 fw-semibold text-muted text-center">Actions</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {customers.length === 0 ? (
                                                    <tr>
                                                        <td colSpan="4" className="text-center py-5 text-muted">
                                                            <div>
                                                                <h5 style={{color: '#6366f1'}}>👥 No customers found</h5>
                                                                <p className="mb-0">Customers will appear here once they register</p>
                                                            </div>
                                                        </td>
                                                    </tr>
                                                ) : (
                                                    customers.map((cust) => (
                                                        <tr key={cust.id} className="align-middle">
                                                            <td className="border-0 py-3">
                                                                <Badge bg="light" text="dark" className="rounded-pill px-2">
                                                                    #{cust.id}
                                                                </Badge>
                                                            </td>
                                                            <td className="border-0 py-3">
                                                                <div className="d-flex align-items-center">
                                                                    <div className="bg-primary bg-opacity-10 rounded-circle p-2 me-2">
                                                                        <span style={{color: '#6366f1'}}>✉️</span>
                                                                    </div>
                                                                    <span className="fw-medium">{cust.email}</span>
                                                                </div>
                                                            </td>
                                                            <td className="border-0 py-3">
                                                                <div className="d-flex align-items-center">
                                                                    <div className="bg-success bg-opacity-10 rounded-circle p-2 me-2">
                                                                        <span className="text-success">👤</span>
                                                                    </div>
                                                                    <span className="fw-medium">{cust.fullName || "N/A"}</span>
                                                                </div>
                                                            </td>
                                                            <td className="border-0 py-3 text-center">
                                                                <Button
                                                                    variant="danger"
                                                                    size="sm"
                                                                    onClick={() => handleDeleteCustomer(cust.id)}
                                                                    className="rounded-pill px-3 fw-semibold"
                                                                    style={{transition: 'all 0.3s ease'}}
                                                                >
                                                                    🗑️ Delete
                                                                </Button>
                                                            </td>
                                                        </tr>
                                                    ))
                                                )}
                                            </tbody>
                                        </Table>
                                    </div>
                                </div>
                            </Tab>

                            <Tab 
                                eventKey="vendors" 
                                title={
                                    <span className="fw-semibold d-flex align-items-center gap-2">
                                        🏪 Vendors
                                        <Badge 
                                            className="rounded-pill small" 
                                            style={{background: 'linear-gradient(135deg, #8b5cf6, #a855f7)', color: 'white'}}
                                        >
                                            {vendors.length}
                                        </Badge>
                                    </span>
                                }
                            >
                                <div className="p-3">
                                    <div className="d-flex justify-content-between align-items-center mb-3">
                                        <h5 className="mb-0" style={{color: '#8b5cf6'}}>Vendor Management</h5>
                                        <Badge bg="light" text="dark" className="px-3 py-2 rounded-pill">
                                            📊 {vendors.length} Active Vendors
                                        </Badge>
                                    </div>
                                    
                                    <div className="table-responsive">
                                        <Table hover className="mb-0">
                                            <thead className="table-light">
                                                <tr>
                                                    <th className="border-0 py-3 fw-semibold text-muted">ID</th>
                                                    <th className="border-0 py-3 fw-semibold text-muted">Email</th>
                                                    <th className="border-0 py-3 fw-semibold text-muted">Full Name</th>
                                                    <th className="border-0 py-3 fw-semibold text-muted text-center">Actions</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {vendors.length === 0 ? (
                                                    <tr>
                                                        <td colSpan="4" className="text-center py-5 text-muted">
                                                            <div>
                                                                <h5 style={{color: '#8b5cf6'}}>🏪 No vendors found</h5>
                                                                <p className="mb-0">Vendors will appear here once they register</p>
                                                            </div>
                                                        </td>
                                                    </tr>
                                                ) : (
                                                    vendors.map((vendor) => (
                                                        <tr key={vendor.id} className="align-middle">
                                                            <td className="border-0 py-3">
                                                                <Badge bg="light" text="dark" className="rounded-pill px-2">
                                                                    #{vendor.id}
                                                                </Badge>
                                                            </td>
                                                            <td className="border-0 py-3">
                                                                <div className="d-flex align-items-center">
                                                                    <div style={{
                                                                        background: 'linear-gradient(135deg, rgba(139, 92, 246, 0.1), rgba(168, 85, 247, 0.1))',
                                                                        borderRadius: '50%',
                                                                        padding: '8px',
                                                                        marginRight: '8px'
                                                                    }}>
                                                                        <span style={{color: '#8b5cf6'}}>✉️</span>
                                                                    </div>
                                                                    <span className="fw-medium">{vendor.email}</span>
                                                                </div>
                                                            </td>
                                                            <td className="border-0 py-3">
                                                                <div className="d-flex align-items-center">
                                                                    <div className="bg-warning bg-opacity-10 rounded-circle p-2 me-2">
                                                                        <span className="text-warning">👨‍🍳</span>
                                                                    </div>
                                                                    <span className="fw-medium">{vendor.fullName || "N/A"}</span>
                                                                </div>
                                                            </td>
                                                            <td className="border-0 py-3 text-center">
                                                                <Button
                                                                    variant="danger"
                                                                    size="sm"
                                                                    onClick={() => handleDeleteVendor(vendor.id)}
                                                                    className="rounded-pill px-3 fw-semibold"
                                                                    style={{transition: 'all 0.3s ease'}}
                                                                >
                                                                    🗑️ Delete
                                                                </Button>
                                                            </td>
                                                        </tr>
                                                    ))
                                                )}
                                            </tbody>
                                        </Table>
                                    </div>
                                </div>
                            </Tab>
                        </Tabs>
                    </Card.Body>
                </Card>

                {/* Summary Footer */}
                <div className="text-center mt-4">
                    <div className="d-flex justify-content-center align-items-center gap-3 mb-3">
                        <Badge className="px-3 py-2 rounded-pill" style={{background: 'linear-gradient(135deg, #6366f1, #8b5cf6)', color: 'white'}}>
                            🛡️ Admin Dashboard Active
                        </Badge>
                        <Badge bg="success" className="px-3 py-2 rounded-pill">
                            ✅ System Operational
                        </Badge>
                    </div>
                    <p className="text-muted small">
                        🔒 Secure Admin Access • 📊 Real-time Data • 🛠️ Full Management Control
                    </p>
                </div>
            </Container>
        </>
    );
};

export default AdminDashboard;