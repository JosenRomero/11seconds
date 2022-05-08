import { useState } from 'react';
import { useSelector } from 'react-redux';
import { Button, Card, Col, Container, Form, Row } from 'react-bootstrap';
import { useUploadFile } from '../hooks/useUploadFile';
import { useUser } from '../hooks/useUser';

const EditProfilePage = () => {

    const user = useSelector((state) => state.user); // reducers/index.js
    const [username, setUsername] = useState("");
    const { uploadFile, loading, fileUrl } = useUploadFile();
    const { updateUserProfile } = useUser();

    const handleSubmit = (event) => {
        event.preventDefault();
        let updateProfile = {}
        if (fileUrl) updateProfile.photoURL = fileUrl
        if (username !== "") updateProfile.displayName = username
        updateUserProfile(updateProfile)
    }

    return (
        <Container className="mt-5">
            <Row className="justify-content-md-center">
                <Col md="6">

                    <Card>
                        <Card.Body>
            
                            <Card.Title>Edit Profile</Card.Title>
                            <Form onSubmit={handleSubmit}>
                                {!fileUrl ? (
                                    <>
                                        {loading ? (
                                            <>
                                                <p className="mb-2 text-center">Uploading Your Image</p>
                                            </>
                                        ) : (
                                            <>
                                                <Form.Group className="mb-3" controlId="file">
                                                    <Form.Label>Choose file</Form.Label>
                                                    <Form.Control
                                                        type="file"
                                                        onChange={(e) => uploadFile(e.target.files[0], "images")}
                                                        accept="image/*"
                                                    />
                                                </Form.Group>
                                            </>
                                        )}

                                    </>
                                ) : (
                                    <>
                                        <div className="text-center mb-3">
                                            <img src={fileUrl} alt="img" width="90%" height="90%" />
                                        </div>
                                    </>
                                )}
                                <Form.Group className="mb-3" controlId="name">
                                    <Form.Label>Name</Form.Label>
                                    <Form.Control
                                        type="text"
                                        placeholder={user.username ? user.username : "username"}
                                        onChange={(e) => setUsername(e.target.value)}
                                    />
                                </Form.Group>
                                <Button variant="primary" type="submit">
                                    Save
                                </Button>
                            </Form>

                        </Card.Body>
                    </Card>

                </Col>
            </Row>
        </Container>
    );

}

export default EditProfilePage