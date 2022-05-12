import { useState } from 'react';
import { Container, Form, Button, Row, Card, Col } from 'react-bootstrap';
import { useUser } from '../hooks/useUser';
import validationEmailAndPassword from '../utils/validationEmailAndPassword';
import FormGroup from '../components/FormGroup';

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

    const handleSubmit = (event) => {
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
                                <FormGroup
                                    id={"email"}
                                    label={"Email address"}
                                    errorMessage={errors.emailError}
                                    type="email"
                                    placeholder="Enter email"
                                    onChange={handleChange}
                                    isInvalid={!!errors.emailError}
                                    required
                                />
                                <FormGroup
                                    id={"password"}
                                    label={"Password"}
                                    errorMessage={errors.passwordError}
                                    type="password"
                                    placeholder="Password"
                                    onChange={handleChange}
                                    isInvalid={!!errors.passwordError}
                                    required
                                />
                                <Button variant="primary" type="submit">Submit</Button>
                            </Form>

                        </Card.Body>
                    </Card>

                </Col>
            </Row>
        </Container>
    );

}

export default SignUpOrLogInPage