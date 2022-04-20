import { useState } from 'react';
import { Container, Card, Col, Row, Form, Button, ProgressBar } from 'react-bootstrap';
import { useVideo } from '../hooks/useVideo';

const UploadVideoPage = () => {

    const [validated, setValidated] = useState(false); // if validated is false then hide Form.Control.Feedback

    const { uploadVideo, deleteVideo, loading, progressBar, videoUrl } = useVideo();

    const [video, setVideo] = useState({
        title: "",
        file: null
    });

    const handleAdd = (event) => {
        event.preventDefault();
        console.log(video);
        setValidated(true); // show Form.Control.Feedback
    }

    const handleChange = ({ target: { id, value, files } }) => {
        if (files !== null) uploadVideo(files[0]);
        setVideo({
            ...video,
            [id]: (files !== null) ? files[0] : value
        })
    }

    return (
        <Container className="mt-5">
            <Row className="justify-content-md-center">
                <Col md="6">

                    <Card>
                        <Card.Body>

                            <Card.Title>Upload Video</Card.Title>

                            <Form noValidate validated={validated} onSubmit={handleAdd}>
                                <Form.Group className="mb-3" controlId="title">
                                    <Form.Label>Title of Video</Form.Label> {/* for="title" */}
                                    <Form.Control
                                        type="text"
                                        placeholder="Enter title"
                                        onChange={handleChange}
                                        required
                                    /> {/* id="title" */}
                                    <Form.Control.Feedback type="invalid">
                                        Title is a required field.
                                    </Form.Control.Feedback>
                                </Form.Group>

                                {!videoUrl ? (
                                    <>
                                        {loading ? (
                                            <>
                                                <p className="mb-2 text-center">Uploading Your Video</p>
                                                <ProgressBar animated now={progressBar} className="mb-3" />
                                            </>
                                        ) : (
                                            <Form.Group className="mb-3" controlId="file">
                                                <Form.Label>Choose file</Form.Label> {/* for="file" */}
                                                <Form.Control
                                                    type="file"
                                                    onChange={handleChange}
                                                    accept="video/mp4,video/x-m4v,video/*"
                                                    required
                                                /> {/* id="file" */}
                                                <Form.Control.Feedback type="invalid">
                                                    File is a required field.
                                                </Form.Control.Feedback>
                                            </Form.Group>
                                        )}
                                    </>
                                ) : (
                                    <div className="text-center mb-3">
                                        <video src={videoUrl} width="90%" height="90%" controls />
                                        <Button onClick={() => deleteVideo()} variant="danger">Delete Video</Button>
                                    </div>
                                )}

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

export default UploadVideoPage