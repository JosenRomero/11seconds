import { Navbar, Container, Nav } from 'react-bootstrap';
import { useSelector } from 'react-redux';

const Menu = () => {

    const user = useSelector((state) => state.user); // reducers/index.js

    return(
        <Navbar expand="lg" bg="dark" variant="dark" collapseOnSelect>
            <Container fluid>
                <Navbar.Brand href="/">11seconds</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="ms-auto">
                        <Nav.Link href="/" >Home</Nav.Link>
                        <Nav.Link href="/videos" >Videos</Nav.Link>
                        <Nav.Link href="/signup" >Sign Up</Nav.Link>
                        <Nav.Link href="/login" >Log In</Nav.Link>
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