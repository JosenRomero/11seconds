import { useState } from 'react';
import { ref, uploadBytesResumable, getDownloadURL, deleteObject } from 'firebase/storage';
import { storage } from '../firebase';

export const useFile = () => {

    const [loading, setLoading] = useState(false);
    const [progressBar, setProgressBar] = useState(5);
    const [fileUrl, setFileUrl] = useState(null);

    const uploadFile = (file, folder) => {
        
        setLoading(true);

        const dateNow = Date.now();

        const storageRef = ref(storage, `${folder}/${dateNow}-${file.name}`);

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
                    setFileUrl(downloadURL);
                    setLoading(false);
                });
            }
        );

    }

    const deleteFile = async (url) => {
        try {
            const deleteRef = ref(storage, url);
            await deleteObject(deleteRef);
        } catch(error) {
            console.log(error);
        }
    }
    
    const deleteTheNewlyUploadedFile = async () => {
        try {
            await deleteFile(fileUrl);
            setFileUrl(null);
        } catch(error) {
            console.log(error);
        }
    }

    return {
        uploadFile,
        deleteFile,
        deleteTheNewlyUploadedFile,
        loading,
        progressBar,
        fileUrl
    }

}
