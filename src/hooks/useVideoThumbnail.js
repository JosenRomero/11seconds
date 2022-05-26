import { getThumbnails } from 'video-metadata-thumbnails';
import { useFile } from './useFile';

export const useVideoThumbnail = () => {

    const { fileUrl: imageUrl, uploadFile, deleteTheNewlyUploadedFile} = useFile();

    const getAndUploadVideoThumbnail = async (file) => {
        const image = await getVideoThumbnail(file);
        uploadFile(image, "videoThumbnail");
    }

    const getVideoThumbnail = async (file) => {
        
        let blob = new Blob([file], {type: "video/mp4"});
        const thumbnails = await getThumbnails(blob, {start: 1, end: 1});

        let image = new File([thumbnails[0].blob], "VideoThumbnail.png", { type: "image/png" });
        return image
    }

    const deleteVideoThumbnail = () => {
        deleteTheNewlyUploadedFile();
    }

    return {
        getAndUploadVideoThumbnail,
        deleteVideoThumbnail,
        imageUrl
    }

}
