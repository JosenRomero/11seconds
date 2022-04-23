import { useEffect, useState } from 'react';
import { useVideo } from '../hooks/useVideo';
import { Card, Col, Container, Row } from 'react-bootstrap';
import Loading from '../components/Loading';

const VideosPage = () => {

    const [videos, setVideos] = useState(null);

    const { getAllVideos } = useVideo();

    const [loading, setLoading] = useState(false);

    useEffect(() => {

        setLoading(true);

        if (!videos) {
            getAllVideos()
                .then((data) => {
                    setVideos(data);
                    setLoading(false);
                });
        }

    }, [videos, getAllVideos]);

    if(!videos && loading) return <Loading />

    return (
        <Container className="mt-5">
            <Row xs={1} md={2}>

                {videos && videos.map((video, i) => {
                    return (
                        <Col>
                            <Card>
                                <Card.Body>
                                    <div>
                                        <video src={video.videoUrl} width="100%" height="100%" controls />
                                    </div>
                                    <Card.Title>{video.title}</Card.Title>
                                </Card.Body>
                            </Card>
                        </Col>
                    );
                })}

            </Row>
        </Container>
    );

}

export default VideosPage