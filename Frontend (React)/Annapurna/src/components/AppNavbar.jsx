import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Navbar, Nav, Container, Button } from 'react-bootstrap';

const AppNavbar = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [role, setRole] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('token');
        const userRole = localStorage.getItem('role');
        setIsLoggedIn(!!token);
        setRole(userRole || '');
    }, []);

    const handleLogout = () => {
        localStorage.clear();
        setIsLoggedIn(false);
        navigate('/');
    };

    return (
        <Navbar bg="dark" variant="dark" expand="lg">
            <Container>
                <Navbar.Brand as={Link} to="/">Annapurna</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <Nav.Link as={Link} to="/">Home</Nav.Link>
                        <Nav.Link as={Link} to="/tiffins">Tiffins</Nav.Link>

                        {role === 'ADMIN' && (
                            <>
                                <Nav.Link as={Link} to="/tiffins">Tiffins</Nav.Link>
                                <Nav.Link as={Link} to="/admin/dashboard">Dashboard</Nav.Link>
                            </>
                        )}

                        {role === 'CUSTOMER' && (
                            <>
                                <Nav.Link as={Link} to="/tiffins">Tiffins</Nav.Link>
                                <Nav.Link as={Link} to="/customer/dashboard">Dashboard</Nav.Link>
                            </>
                        )}

                        {role === 'VENDOR' && (
                            <>
                                <Nav.Link as={Link} to="/vendor">Dashboard</Nav.Link>
                                <Nav.Link as={Link} to="/vendor/orders">Orders</Nav.Link>
                            </>
                        )}

                        {!isLoggedIn && (
                            <>
                                <Nav.Link as={Link} to="/login">Login</Nav.Link>
                                <Nav.Link as={Link} to="/register">Register</Nav.Link>
                            </>
                        )}
                    </Nav>

                    {isLoggedIn && (
                        <Button variant="outline-light" onClick={handleLogout}>
                            Logout
                        </Button>
                    )}
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
};

export default AppNavbar;
