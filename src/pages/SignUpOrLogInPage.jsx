import { useState } from 'react';
import { Container, Form, Button, Row, Card, Col } from 'react-bootstrap';
import { useUser } from '../hooks/useUser';

const SignUpOrLogInPage = ({title}) => {

    const [validated, setValidated] = useState(false); // if validated is false then hide Form.Control.Feedback

    const [user, setUser] = useState({
        email: "",
        password: ""
    });

    const { registerUser, loginUser } = useUser();

    const handleSubmit = async (event) => {
        event.preventDefault();
        (title === "Sign Up") ? registerUser(user) : loginUser(user)
        setValidated(true); // show Form.Control.Feedback
    }

    const handleChange = ({target: {id, value}}) => {
        setUser({
            ...user, 
            [id]: value
        })
    }

    return (

        <Container className="mt-5">
            <Row className="justify-content-md-center">
                <Col md="6">

                    <Card>
                        <Card.Body>

                            <Card.Title>{title}</Card.Title>

                            <Form noValidate validated={validated} onSubmit={handleSubmit}>
                                <Form.Group className="mb-3" controlId="email">
                                    <Form.Label>Email address</Form.Label> {/* for="email" */}
                                    <Form.Control
                                        type="email"
                                        placeholder="Enter email"
                                        onChange={handleChange}
                                        required
                                    /> {/* id="email" */}
                                    <Form.Control.Feedback type="invalid">
                                        Email address is a required field.
                                    </Form.Control.Feedback>
                                </Form.Group>
                                <Form.Group className="mb-3" controlId="password">
                                    <Form.Label>Password</Form.Label> {/* for="password" */}
                                    <Form.Control
                                        type="password"
                                        placeholder="Password"
                                        onChange={handleChange}
                                        required
                                    /> {/* id="password" */}
                                    <Form.Control.Feedback type="invalid">
                                        Password is a required field.
                                    </Form.Control.Feedback>
                                </Form.Group>
                                <Button variant="primary" type="submit">
                                    Submit
                                </Button>
                            </Form>

                        </Card.Body>
                    </Card>

                </Col>
            </Row>
        </Container>

    );

}

export default SignUpOrLogInPage