import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useData } from '../hooks/useData';
import { Card, Col, Container, Row } from 'react-bootstrap';
import Loading from '../components/Loading';

const VideosPage = () => {

    const [videos, setVideos] = useState(null);

    const { getAllData } = useData();

    const [loading, setLoading] = useState(false);

    useEffect(() => {

        setLoading(true);

        if (!videos) {
            getAllData()
                .then((data) => {
                    setVideos(data);
                    setLoading(false);
                });
        }

    }, [videos, getAllData]);

    if(!videos && loading) return <Loading />

    return (
        <Container className="mt-5">
            <Row xs={1} md={2}>

                {videos && videos.map((video, i) => {
                    return (
                        <Col key={i}>
                            <Card>
                                <Card.Body>
                                    <div>
                                        <video src={video.videoUrl} width="100%" height="100%" controls />
                                    </div>
                                    <Link to={`/video/${video.id}`}>
                                        <Card.Title>{video.title}</Card.Title>
                                    </Link>
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