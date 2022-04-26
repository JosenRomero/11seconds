import { useState } from 'react';
import { ref, uploadBytesResumable, getDownloadURL, deleteObject } from 'firebase/storage';
import { storage } from '../firebase';

export const useVideo = () => {

    const [loading, setLoading] = useState(false);
    const [progressBar, setProgressBar] = useState(5);
    const [videoUrl, setVideoUrl] = useState(null);

    const uploadVideo = (file) => {

        setLoading(true);

        const dateNow = Date.now()

        const storageRef = ref(storage, `videos/${dateNow}-${file.name}`);

        const uploadTask = uploadBytesResumable(storageRef, file);

        uploadTask.on('state_changed',
            (snapshot) => {
                // Observe state change events such as progress, pause, and resume
                // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
                const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                setProgressBar(progress);
            },
            (error) => {
                // Handle unsuccessful uploads
                console.log(error);
            },
            () => {
                // Handle successful uploads on complete
                getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                    setVideoUrl(downloadURL);
                    setLoading(false);
                });
            }
        );

    }

    const deleteVideo = () => {

        const deleteRef = ref(storage, videoUrl);

        deleteObject(deleteRef)
            .then(() => {
                setVideoUrl(null);
            }).catch((error) => {
                console.log(error);
            });

    }

    return {
        uploadVideo,
        deleteVideo,
        loading,
        progressBar,
        videoUrl
    }

}
