import { Navbar, Container, Nav } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { useUser } from '../hooks/useUser';
import { Link } from 'react-router-dom';

const Menu = () => {

    const user = useSelector((state) => state.user); // reducers/index.js

    const { logoutUser } = useUser();

    return(
        <Navbar expand="lg" bg="dark" variant="dark" collapseOnSelect>
            <Container fluid>
                <Navbar.Brand as={Link} to="/">11seconds</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="ms-auto">
                        <Nav.Link as={Link} to="/">Home</Nav.Link>
                        <Nav.Link as={Link} to="/videos">Videos</Nav.Link>
                        <Nav.Link as={Link} to="/signup">Sign Up</Nav.Link>
                        <Nav.Link as={Link} to="/login">Log In</Nav.Link>
                        <Nav.Link onClick={ () => logoutUser() }>Log Out</Nav.Link>
                        {
                            console.log("menu", user)
                        }
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );

}

export default Menu