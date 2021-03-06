import { useGetVideos } from '../hooks/useGetVideos';
import { Card, Col, Container, Row } from 'react-bootstrap';
import VideosContainer from '../components/VideosContainer';
import Loading from '../components/Loading';
import VideoThumbnail from '../components/VideoThumbnail';

const HomePage = () => {

    const { videos, loading, moreContent } = useGetVideos();
    const firstVideo = videos && videos[0]
    const otherVideos = videos 
    
    if (!videos && loading && moreContent) return <Loading />

    return (
        <Container className="mt-3 bg-white">
            <Row xs={1} sm={2} md={2} lg={2}>
                {firstVideo && (
                    <>
                        <Col>
                            <Card className="border-0">
                                <Card.Body>
                                    <VideoThumbnail videoId={firstVideo.id} videoUrl={firstVideo.videoThumbnailUrl} />
                                </Card.Body>
                            </Card>
                        </Col>
                        <Col>
                            <Card className="border-0 pt-3">
                                <Card.Title>{firstVideo.title}</Card.Title>
                            </Card>
                        </Col>
                    </>
                )}
            </Row>
            <Row xs={1} sm={2} md={3} lg={4}>
                <VideosContainer videos={otherVideos} moreContent={moreContent} />
            </Row>
        </Container>
    );

}

export default HomePage