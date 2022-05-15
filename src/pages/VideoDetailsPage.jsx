import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Button, Card, Col, Container, Row } from 'react-bootstrap';
import Loading from '../components/Loading';
import { useData } from '../hooks/useData';

const VideoDetailsPage = () => {

    const { videoId } = useParams();
    const [video, setVideo] = useState(null);
    const [loading, setLoading] = useState(false);
    const { getOneData, deleteOneData } = useData();

    useEffect(() => {

        setLoading(true);

        if (videoId && !video) {
            getOneData(videoId)
                .then((data) => {
                    setVideo(data);
                    setLoading(false);
                }).catch((error) => console.log(error))
        }

    }, [videoId, video, getOneData]);

    if (!video && loading) return <Loading />

    return (
        <>
            {video && (
                <Container className="mt-5">
                    <Row className="justify-content-md-center">
                        <Col md="8">
                            <Card>
                                <Card.Body>
                                    <div>
                                        <video src={video.videoUrl} width="100%" height="100%" controls />
                                    </div>
                                    <Card.Title>{video.title}</Card.Title>
                                </Card.Body>
                            </Card>
                        </Col>
                        <Col md="4">
                            <Button onClick={() => deleteOneData(videoId, video.videoUrl)} variant="danger">Delete Video</Button>
                        </Col>
                    </Row>
                </Container>
            )}
        </>
    );

}

export default VideoDetailsPage