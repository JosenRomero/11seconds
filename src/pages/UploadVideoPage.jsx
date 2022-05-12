import { useState } from 'react';
import { Container, Card, Col, Row, Form, Button, ProgressBar } from 'react-bootstrap';
import { useUploadFile } from '../hooks/useUploadFile';
import { useData } from '../hooks/useData';
import FormGroup from '../components/FormGroup';

const UploadVideoPage = () => {

    const [validated, setValidated] = useState(false); // if validated is false then hide Form.Control.Feedback
    const { uploadFile, deleteFile, loading, progressBar, fileUrl } = useUploadFile();
    const { saveData } = useData();
    const [videoTitle, setVideoTitle] = useState("");

    const handleAdd = (event) => {
        event.preventDefault();
        saveData(videoTitle, fileUrl);
        setValidated(true); // show Form.Control.Feedback
    }

    return (
        <Container className="mt-5">
            <Row className="justify-content-md-center">
                <Col md="6">

                    <Card>
                        <Card.Body>

                            <Card.Title>Upload Video</Card.Title>

                            <Form noValidate validated={validated} onSubmit={handleAdd}>
                                <FormGroup
                                    id={"title"}
                                    label={"Title of Video"}
                                    errorMessage={"Title is a required field."}
                                    type="text"
                                    placeholder="Enter title"
                                    onChange={(e) => setVideoTitle(e.target.value)}
                                    required
                                />

                                {!fileUrl && !loading && (
                                    <FormGroup
                                        id={"file"}
                                        label={"Choose file"}
                                        errorMessage={"File is a required field."}
                                        type="file"
                                        onChange={(e) => uploadFile(e.target.files[0], "videos")}
                                        accept="video/mp4,video/x-m4v,video/*"
                                        required
                                    />
                                )}

                                {!fileUrl && loading && (
                                    <>
                                        <p className="mb-2 text-center">Uploading Your Video</p>
                                        <ProgressBar animated now={progressBar} className="mb-3" />
                                    </>
                                )}

                                {fileUrl && (
                                    <div className="text-center mb-3">
                                        <video src={fileUrl} width="90%" height="90%" controls />
                                        <Button onClick={() => deleteFile()} variant="danger">Delete Video</Button>
                                    </div>
                                )}

                                <Button variant="primary" type="submit">Publish</Button>
                            </Form>

                        </Card.Body>
                    </Card>

                </Col>
            </Row>
        </Container>
    );

}

export default UploadVideoPage