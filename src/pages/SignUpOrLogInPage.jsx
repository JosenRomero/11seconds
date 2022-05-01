import { useState } from 'react';
import { Container, Form, Button, Row, Card, Col } from 'react-bootstrap';
import { useUser } from '../hooks/useUser';
import validationEmailAndPassword from '../utils/validationEmailAndPassword';

const SignUpOrLogInPage = ({title}) => {

    const [validated, setValidated] = useState(false); // if validated is false then hide Form.Control.Feedback

    const [errors, setErrors] = useState({
        emailError: "",
        passwordError: ""
    });

    const [user, setUser] = useState({
        email: "",
        password: ""
    });

    const { registerUser, loginUser } = useUser();

    const validateEmailAndPassword = () => {
        let { emailError, passwordError } = validationEmailAndPassword(user.email, user.password);
        setErrors({ emailError, passwordError });
        return (emailError === "" && passwordError === "") ? true : false
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        let validate = validateEmailAndPassword()
        setValidated(validate); // show Form.Control.Feedback
        if(validate) {
            (title === "Sign Up") ? registerUser(user) : loginUser(user)
        }
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
                                        isInvalid={!!errors.emailError}
                                        required
                                    /> {/* id="email" */}
                                    <Form.Control.Feedback type="invalid">
                                        {errors.emailError}
                                    </Form.Control.Feedback>
                                </Form.Group>
                                <Form.Group className="mb-3" controlId="password">
                                    <Form.Label>Password</Form.Label> {/* for="password" */}
                                    <Form.Control
                                        type="password"
                                        placeholder="Password"
                                        onChange={handleChange}
                                        isInvalid={!!errors.passwordError}
                                        required
                                    /> {/* id="password" */}
                                    <Form.Control.Feedback type="invalid">
                                        {errors.passwordError}
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