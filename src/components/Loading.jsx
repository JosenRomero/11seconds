import { Container, Spinner } from 'react-bootstrap';

const Loading = () => {

    return (
        <Container className="pt-5 text-center">
            <Spinner animation="border" role="status">
                <span className="visually-hidden">Loading...</span>
            </Spinner>
        </Container>
    );

}

export default Loading