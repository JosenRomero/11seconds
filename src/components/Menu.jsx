import { Navbar, Container, Nav, NavDropdown } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { useUser } from '../hooks/useUser';
import { Link } from 'react-router-dom';
import profileImg from '../images/blank_profile_image_.svg';

const Menu = () => {

    const user = useSelector((state) => state.user); // reducers/index.js

    const { logoutUser } = useUser();

    const userImg = (<img src={user.photoURL ? user.photoURL : profileImg} className="avatar-small rounded-circle" alt="avatar small" />)

    return(
        <Navbar expand="lg" bg="light" variant="light" collapseOnSelect>
            <Container fluid>
                <Navbar.Brand as={Link} to="/">11seconds</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="ms-auto">
                        { user.email && 
                            <>
                                <Nav.Link as={Link} to="/" eventKey={1}>Home</Nav.Link>
                                
                                <NavDropdown title={userImg} id="nav-dropdown" align="end" eventKey={2}>
                                    <NavDropdown.Item as={Link} to="/videos" eventKey={2.1}>Videos</NavDropdown.Item>
                                    <NavDropdown.Item as={Link} to="/upload" eventKey={2.2}>Upload</NavDropdown.Item>
                                    <NavDropdown.Item as={Link} to="/editprofile" eventKey={2.3}>Edit Profile</NavDropdown.Item>
                                    <NavDropdown.Divider />
                                    <NavDropdown.Item onClick={ () => logoutUser() }>Log Out</NavDropdown.Item>
                                </NavDropdown>
                
                            </>
                        }
                        { !user.email && 
                            <>
                                <Nav.Link as={Link} to="/signup" eventKey={3}>Sign Up</Nav.Link>
                                <Nav.Link as={Link} to="/login" eventKey={4}>Log In</Nav.Link>
                            </>
                        }
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );

}

export default Menu