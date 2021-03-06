import { useState } from 'react';
import { Container, Card, Col, Row, Form, Button, ProgressBar } from 'react-bootstrap';
import { useFile } from '../hooks/useFile';
import { useVideoThumbnail } from '../hooks/useVideoThumbnail';
import { useData } from '../hooks/useData';
import FormGroup from '../components/FormGroup';

const UploadVideoPage = () => {

    const [validated, setValidated] = useState(false); // if validated is false then hide Form.Control.Feedback
    const { uploadFile, deleteTheNewlyUploadedFile, loading, progressBar, fileUrl } = useFile();
    const { getAndUploadVideoThumbnail, deleteVideoThumbnail, imageUrl } = useVideoThumbnail();
    const { saveData } = useData();
    const [videoTitle, setVideoTitle] = useState("");

    const handleAdd = (event) => {
        event.preventDefault();
        saveData(videoTitle, fileUrl, imageUrl);
        setValidated(true); // show Form.Control.Feedback
    }

    const handleVideo = (event) => {
        let video = event.target.files[0];
        uploadFile(video, "videos");
        getAndUploadVideoThumbnail(video);
    }

    const deleteVideo = () => {
        deleteTheNewlyUploadedFile();
        deleteVideoThumbnail();
    }

    return (
        <Container className="pt-5">
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
                                        onChange={(e) => handleVideo(e)}
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

                                {imageUrl && (
                                    <div className="text-center mb-3">
                                        <p>Video Thumbnail</p>
                                        <img src={imageUrl} className="w-50 h-50" alt="Video Thumbnail"/>
                                    </div>
                                )}

                                {fileUrl && (
                                    <div className="text-center mb-3">
                                        <p>Video Preview</p>
                                        <video src={fileUrl} width="90%" height="90%" controls />
                                        <Button onClick={() => deleteVideo()} variant="danger">Delete Video</Button>
                                    </div>
                                )}
                                <Button variant="primary" type="submit" disabled={(videoTitle.length > 0 && fileUrl && imageUrl) ? false : true}>Publish</Button>
                            </Form>

                        </Card.Body>
                    </Card>

                </Col>
            </Row>
        </Container>
    );

}

export default UploadVideoPage