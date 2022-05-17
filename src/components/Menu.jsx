import { Navbar, Container, Nav, NavDropdown } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { useUser } from '../hooks/useUser';
import { Link } from 'react-router-dom';
import profileImg from '../images/blank_profile_image_.svg';

const Menu = () => {

    const user = useSelector((state) => state.user); // reducers/index.js

    const { logoutUser } = useUser();

    const userImg = (<img src={user.photoURL ? user.photoURL : profileImg} className="profileImage" alt="profileImg" />)

    return(
        <Navbar expand="lg" bg="dark" variant="dark" collapseOnSelect>
            <Container fluid>
                <Navbar.Brand as={Link} to="/">11seconds</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="ms-auto">
                        { user.email && 
                            <>
                                <Nav.Link as={Link} to="/">Home</Nav.Link>
                                
                                <NavDropdown title={userImg} id="nav-dropdown" align="end">
                                    <NavDropdown.Item as={Link} to="/videos">Videos</NavDropdown.Item>
                                    <NavDropdown.Item as={Link} to="/upload">Upload</NavDropdown.Item>
                                    <NavDropdown.Item as={Link} to="/editprofile">Edit Profile</NavDropdown.Item>
                                    <NavDropdown.Divider />
                                    <NavDropdown.Item onClick={ () => logoutUser() }>Log Out</NavDropdown.Item>
                                </NavDropdown>
                
                            </>
                        }
                        { !user.email && 
                            <>
                                <Nav.Link as={Link} to="/signup">Sign Up</Nav.Link>
                                <Nav.Link as={Link} to="/login">Log In</Nav.Link>
                            </>
                        }
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );

}

export default Menu