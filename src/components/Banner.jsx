import { Link } from 'react-router-dom';
import { Col, Container, Nav, Navbar, Row } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import bannerImg from '../images/blank_banner_image.svg'
import profileImg from '../images/blank_profile_image_.svg';

const Banner = ({children}) => {

    const user = useSelector((state) => state.user); // reducers/index.js

    return (
        <Container className="pb-5">
            <Row>
                <Col>
                    <div className="position-relative">
                        <img src={bannerImg} className="w-100" alt="banner" />
                        <div className="position-absolute content-banner">
                            <img src={user.photoURL ? user.photoURL : profileImg} className=" rounded-circle avatar-banner" alt="avatar-banner"/>
                            <h3 className="ms-3">{user.username ? user.username : "username"}</h3>
                        </div>
                    </div>
                    <Navbar bg="white" variant="light">
                        <Container>
                            <Nav>
                                <Nav.Link as={Link} to="/">Home</Nav.Link>
                                <Nav.Link as={Link} to="/videos">Videos</Nav.Link>
                            </Nav>
                        </Container>
                    </Navbar>
                    {children}
                </Col>
            </Row>
        </Container>
    )

}

export default Banner