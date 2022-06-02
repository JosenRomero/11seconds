import { Link } from 'react-router-dom';

const VideoThumbnail = ({ videoId, videoUrl }) => {

    return (
        <Link to={`/video/${videoId}`}>
            <div>
                <img src={videoUrl} className="w-100 h-100" alt="videoThumbnailUrl" />
            </div>
        </Link>
    );

}

export default VideoThumbnail