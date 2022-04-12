import { Col, Container, Row, Spinner } from 'react-bootstrap';

const Loading = () => {

    return (
        <Container className="mt-5">
            <Row className="justify-content-md-center">
                <Col md="6">
                    <Spinner animation="border" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </Spinner>
                </Col>
            </Row>
        </Container>
    );

}

export default Loading