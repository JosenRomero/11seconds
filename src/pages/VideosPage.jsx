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
        <Container className="mt-3 bg-white">
            <Row xs={1} sm={2} md={3} lg={4}>

                {videos && videos.map((video, i) => {
                    return (
                        <Col key={i}>
                            <Card className="border-0">
                                <Card.Body>
                                    <Link to={`/video/${video.id}`}>
                                        <div>
                                            <img src={video.videoThumbnailUrl} className="w-100 h-100" alt="videoThumbnailUrl"/>
                                        </div>
                                    </Link>
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