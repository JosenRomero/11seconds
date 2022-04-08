import { Navbar, Container, Nav } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { useUser } from '../hooks/useUser';

const Menu = () => {

    const { authorized } = useUser();

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
                        {
                            console.log(user.username, authorized)
                        }
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );

}

export default Menu