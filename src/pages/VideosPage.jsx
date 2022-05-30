import { useGetVideos } from '../hooks/useGetVideos';
import { Button, Container, Row } from 'react-bootstrap';
import VideosContainer from '../components/VideosContainer';
import Loading from '../components/Loading';

const VideosPage = () => {

    const {videos, loading, moreContent, moreVideos} = useGetVideos();

    if (!videos && loading && moreContent) return <Loading />

    return (
        <Container className="mt-3 bg-white">
            <Row xs={1} sm={2} md={3} lg={4}>
                <VideosContainer videos={videos} moreContent={moreContent} />
            </Row>

            <Row>
                {videos && moreContent && (
                    <Button onClick={() => moreVideos()} variant="primary">More Videos</Button>
                )}
            </Row>

        </Container>
    );

}

export default VideosPage