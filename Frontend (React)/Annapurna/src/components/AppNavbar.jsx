import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Navbar, Nav, Container, Button, Badge } from 'react-bootstrap';

const AppNavbar = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [role, setRole] = useState('');
    const [isScrolled, setIsScrolled] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        const token = localStorage.getItem('token');
        const userRole = localStorage.getItem('role');
        setIsLoggedIn(!!token);
        setRole(userRole || '');
    }, [location]); // rerun this whenever URL changes (e.g., after login)

    // Handle scroll effect
    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const handleLogout = () => {
        localStorage.clear();
        setIsLoggedIn(false);
        setRole('');
        navigate('/');
    };

    const getRoleBadgeColor = (userRole) => {
        switch(userRole) {
            case 'ADMIN': return 'danger';
            case 'VENDOR': return 'success';
            case 'CUSTOMER': return 'primary';
            default: return 'secondary';
        }
    };

    const getRoleIcon = (userRole) => {
        switch(userRole) {
            case 'ADMIN': return '👑';
            case 'VENDOR': return '👨‍🍳';
            case 'CUSTOMER': return '🍽️';
            default: return '👤';
        }
    };

    const navbarStyle = {
        background: isScrolled 
            ? 'linear-gradient(135deg, rgba(16, 185, 129, 0.95) 0%, rgba(5, 150, 105, 0.95) 100%)'
            : 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
        backdropFilter: isScrolled ? 'blur(10px)' : 'none',
        transition: 'all 0.3s ease',
        boxShadow: isScrolled ? '0 2px 20px rgba(0,0,0,0.1)' : 'none',
        borderBottom: isScrolled ? '1px solid rgba(255,255,255,0.1)' : 'none'
    };

    const brandStyle = {
        fontSize: '1.8rem',
        fontWeight: 'bold',
        background: 'linear-gradient(45deg, #fbbf24, #f59e0b)',
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
        backgroundClip: 'text',
        textDecoration: 'none',
        transition: 'all 0.3s ease'
    };

    const navLinkStyle = {
        color: 'rgba(255, 255, 255, 0.9)',
        fontWeight: '500',
        padding: '8px 16px',
        borderRadius: '25px',
        margin: '0 4px',
        transition: 'all 0.3s ease',
        textDecoration: 'none',
        position: 'relative',
        overflow: 'hidden'
    };

    const activeNavLinkStyle = {
        ...navLinkStyle,
        background: 'rgba(255, 255, 255, 0.15)',
        color: '#fbbf24',
        backdropFilter: 'blur(10px)'
    };

    const logoutButtonStyle = {
        background: 'linear-gradient(45deg, #ef4444, #dc2626)',
        border: 'none',
        borderRadius: '25px',
        padding: '8px 20px',
        fontWeight: 'bold',
        boxShadow: '0 4px 15px rgba(239, 68, 68, 0.3)',
        transition: 'all 0.3s ease'
    };

    return (
        <>
            {/* Custom CSS */}
            <style jsx>{`
                .navbar-brand:hover {
                    transform: scale(1.05);
                    filter: brightness(1.2);
                }
                
                .nav-link-custom {
                    color: rgba(255, 255, 255, 0.9) !important;
                    font-weight: 500 !important;
                    padding: 8px 16px !important;
                    border-radius: 25px !important;
                    margin: 0 4px !important;
                    transition: all 0.3s ease !important;
                    text-decoration: none !important;
                    position: relative !important;
                    overflow: hidden !important;
                }
                
                .nav-link-custom:hover {
                    background: rgba(255, 255, 255, 0.15) !important;
                    color: #fbbf24 !important;
                    transform: translateY(-2px) !important;
                    box-shadow: 0 4px 15px rgba(0,0,0,0.1) !important;
                }
                
                .nav-link-custom.active {
                    background: rgba(255, 255, 255, 0.2) !important;
                    color: #fbbf24 !important;
                    font-weight: bold !important;
                }
                
                .navbar-toggler {
                    border: 2px solid rgba(255, 255, 255, 0.3) !important;
                    border-radius: 8px !important;
                    padding: 4px 8px !important;
                }
                
                .navbar-toggler:focus {
                    box-shadow: 0 0 0 0.25rem rgba(255, 215, 0, 0.25) !important;
                }
                
                .navbar-toggler-icon {
                    background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 30 30'%3e%3cpath stroke='rgba%28255, 255, 255, 0.8%29' stroke-linecap='round' stroke-miterlimit='10' stroke-width='2' d='M4 7h22M4 15h22M4 23h22'/%3e%3c/svg%3e") !important;
                }
                
                .logout-btn {
                    background: linear-gradient(45deg, #ff6b6b, #ee5a52) !important;
                    border: none !important;
                    border-radius: 25px !important;
                    padding: 8px 20px !important;
                    font-weight: bold !important;
                    box-shadow: 0 4px 15px rgba(255, 107, 107, 0.3) !important;
                    transition: all 0.3s ease !important;
                    color: white !important;
                }
                
                .logout-btn:hover {
                    transform: translateY(-2px) !important;
                    box-shadow: 0 6px 25px rgba(255, 107, 107, 0.4) !important;
                    background: linear-gradient(45deg, #ff5252, #d32f2f) !important;
                }
                
                .role-badge {
                    font-size: 0.75rem !important;
                    padding: 4px 8px !important;
                    border-radius: 12px !important;
                    margin-left: 8px !important;
                    font-weight: bold !important;
                    animation: pulse 2s infinite !important;
                }
                
                @keyframes pulse {
                    0% { transform: scale(1); }
                    50% { transform: scale(1.05); }
                    100% { transform: scale(1); }
                }
                
                .navbar-collapse {
                    background: rgba(0, 0, 0, 0.1);
                    border-radius: 15px;
                    padding: 10px;
                    margin-top: 10px;
                    backdrop-filter: blur(10px);
                }
                
                @media (min-width: 992px) {
                    .navbar-collapse {
                        background: none !important;
                        border-radius: 0 !important;
                        padding: 0 !important;
                        margin-top: 0 !important;
                        backdrop-filter: none !important;
                    }
                }
            `}</style>

            <Navbar 
                expand="lg" 
                fixed="top"
                style={navbarStyle}
                className="px-0"
            >
                <Container fluid>
                    <Navbar.Brand 
                        as={Link} 
                        to="/" 
                        style={brandStyle}
                        className="d-flex align-items-center"
                    >
                        🍱 Annapurna
                    </Navbar.Brand>
                    
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="me-auto">
                            <Nav.Link 
                                as={Link} 
                                to="/" 
                                className={`nav-link-custom ${location.pathname === '/' ? 'active' : ''}`}
                            >
                                🏠 Home
                            </Nav.Link>
                            <Nav.Link 
                                as={Link} 
                                to="/tiffins" 
                                className={`nav-link-custom ${location.pathname === '/tiffins' ? 'active' : ''}`}
                            >
                                🍽️ Tiffins
                            </Nav.Link>

                            {isLoggedIn && role === 'ADMIN' && (
                                <Nav.Link 
                                    as={Link} 
                                    to="/admin/dashboard" 
                                    className={`nav-link-custom ${location.pathname === '/admin/dashboard' ? 'active' : ''}`}
                                >
                                    👑 Admin Dashboard
                                </Nav.Link>
                            )}
                            {isLoggedIn && role === 'CUSTOMER' && (
                                <Nav.Link 
                                    as={Link} 
                                    to="/customer/dashboard" 
                                    className={`nav-link-custom ${location.pathname === '/customer/dashboard' ? 'active' : ''}`}
                                >
                                    🍽️ Customer Dashboard
                                </Nav.Link>
                            )}
                            {isLoggedIn && role === 'VENDOR' && (
                                <Nav.Link 
                                    as={Link} 
                                    to="/vendor/dashboard" 
                                    className={`nav-link-custom ${location.pathname === '/vendor/dashboard' ? 'active' : ''}`}
                                >
                                    👨‍🍳 Vendor Dashboard
                                </Nav.Link>
                            )}
                        </Nav>

                        <Nav className="ms-auto">
                            {!isLoggedIn ? (
                                <>
                                    <Nav.Link 
                                        as={Link} 
                                        to="/login" 
                                        className={`nav-link-custom ${location.pathname === '/login' ? 'active' : ''}`}
                                    >
                                        🔑 Login
                                    </Nav.Link>
                                    <Nav.Link 
                                        as={Link} 
                                        to="/register" 
                                        className={`nav-link-custom ${location.pathname === '/register' ? 'active' : ''}`}
                                    >
                                        📝 Register
                                    </Nav.Link>
                                </>
                            ) : (
                                <Button 
                                    className="logout-btn"
                                    onClick={handleLogout}
                                >
                                    🚪 Logout
                                </Button>
                            )}
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>

            {/* Spacer to prevent content from going under fixed navbar */}
            <div style={{ height: '69px' }}></div>
        </>
    );
};

export default AppNavbar;