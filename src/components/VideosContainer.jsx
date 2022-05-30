import { Link } from 'react-router-dom';
import { Card, Col } from 'react-bootstrap';

const VideosContainer = ({ videos, moreContent }) => {

    return (
        <>
            {videos && videos.map((video, i) => {
                return (
                    <Col key={i}>
                        <Card className="border-0">
                            <Card.Body>
                                <Link to={`/video/${video.id}`}>
                                    <div>
                                        <img src={video.videoThumbnailUrl} className="w-100 h-100" alt="videoThumbnailUrl" />
                                    </div>
                                </Link>
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