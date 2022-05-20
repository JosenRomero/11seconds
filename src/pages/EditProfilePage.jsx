import { useState } from 'react';
import { useSelector } from 'react-redux';
import { Button, Card, Col, Container, Form, Row } from 'react-bootstrap';
import { useFile } from '../hooks/useFile';
import { useUser } from '../hooks/useUser';
import FormGroup from '../components/FormGroup';
import profileImg from '../images/blank_profile_image_.svg';

const EditProfilePage = () => {

    const user = useSelector((state) => state.user); // reducers/index.js
    const [username, setUsername] = useState("");
    const { uploadFile, loading, fileUrl } = useFile();
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

                                {!fileUrl && !loading && (
                                    <FormGroup 
                                        id={"selectProfileImage"}
                                        btn="Upload a photo"
                                        type="file"
                                        hidden
                                        onChange={(e) => uploadFile(e.target.files[0], "images")}
                                        accept="image/*"
                                    />
                                )}

                                {!fileUrl && loading && (
                                    <p className="mb-2 text-center">Uploading Your Image</p>
                                )}

                                <div className="text-center mb-3">
                                    <img src={user.photoURL ? user.photoURL : profileImg} className="avatar rounded-circle" alt="avatar"/>
                                </div>

                                <FormGroup
                                    id={"name"}
                                    label={"Name"}
                                    type="text"
                                    placeholder={user.username ? user.username : "username"}
                                    onChange={(e) => setUsername(e.target.value)}
                                />
                                <Button variant="primary" type="submit">Save</Button>
                            </Form>

                        </Card.Body>
                    </Card>

                </Col>
            </Row>
        </Container>
    );

}

export default EditProfilePage