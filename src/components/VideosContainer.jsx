import { Card, Col } from 'react-bootstrap';
import VideoThumbnail from './VideoThumbnail';

const VideosContainer = ({ videos, moreContent }) => {

    return (
        <>
            {videos && videos.map((video, i) => {
                return (
                    <Col key={i}>
                        <Card className="border-0">
                            <Card.Body>
                                <VideoThumbnail videoId={video.id} videoUrl={video.videoThumbnailUrl} />
                                <Card.Title>{video.title}</Card.Title>
                            </Card.Body>
                        </Card>
                    </Col>
                );
            })}
            
            {!videos && !moreContent && (
                <h3 className="text-center w-100">no content</h3>
            )}
        </>
    );

}

export default VideosContainer