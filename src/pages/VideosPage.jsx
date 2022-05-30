import { Link } from 'react-router-dom';
import { useGetVideos } from '../hooks/useGetVideos';
import { Button, Card, Col, Container, Row } from 'react-bootstrap';
import Loading from '../components/Loading';

const VideosPage = () => {

    const {videos, loading, moreContent, moreVideos} = useGetVideos();

    if(!videos && loading && moreContent) return <Loading />

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

            <Row>
                {moreContent && (
                    <Button onClick={() => moreVideos()} variant="primary">More Videos</Button>
                )}

                {!videos && !moreContent && (
                    <h3 className="text-center">no content</h3>
                )}
            </Row>

        </Container>
    );

}

export default VideosPage