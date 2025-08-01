// src/pages/Home.jsx

import { Container, Row, Col, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const Home = () => {
    const navigate = useNavigate();

    return (
        <Container className="mt-5">
            <Row className="align-items-center">
                <Col md={6}>
                    <h1 className="mb-4">Welcome to Annapurna 🍱</h1>
                    <p>
                        Annapurna is your trusted online tiffin service platform, connecting users with hygienic,
                        affordable, and home-cooked meals delivered to their doorsteps.
                    </p>
                    <p>
                        Whether you're a student, working professional, or just looking for quality meals, we’ve got you covered.
                    </p>

                    <div className="mt-4">
                        <Button variant="primary" className="me-2" onClick={() => navigate('/login')}>
                            Login
                        </Button>
                        <Button variant="outline-success" onClick={() => navigate('/register')}>
                            Register
                        </Button>
                    </div>
                </Col>

                <Col md={6}>
                    <img
                        src="https://cdn.pixabay.com/photo/2016/03/05/19/02/hungry-1238258_960_720.jpg"
                        alt="Tiffin Service"
                        className="img-fluid rounded shadow"
                    />
                </Col>
            </Row>
        </Container>
    );
};

export default Home;
