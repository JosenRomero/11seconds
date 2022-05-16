import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { ref, uploadBytesResumable, getDownloadURL, deleteObject } from 'firebase/storage';
import { storage } from '../firebase';
import errorMessageHandler from '../utils/errorMessageHandler';
import { addErrorMessageAction } from '../redux/actions/Actions';

export const useFile = () => {

    const dispatch = useDispatch();
    const [loading, setLoading] = useState(false);
    const [progressBar, setProgressBar] = useState(5);
    const [fileUrl, setFileUrl] = useState(null);

    const uploadFile = (file, folder) => {
        try {

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
                    const message = errorMessageHandler(error.code);
                    dispatch(addErrorMessageAction(message));
                    resetInputFile();
                },
                () => {
                    // Handle successful uploads on complete
                    getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                        setFileUrl(downloadURL);
                        setLoading(false);
                    });
                }
            );

        } catch(error) {
            const message = errorMessageHandler(error.code);
            dispatch(addErrorMessageAction(message));
            resetInputFile();
        }
    }

    const resetInputFile = () => {
        setLoading(false);
        setProgressBar(5);
        setFileUrl(null);
    }

    const deleteFile = async (url) => {
        try {
            const deleteRef = ref(storage, url);
            await deleteObject(deleteRef);
        } catch(error) {
            const message = errorMessageHandler(error.code);
            return Promise.reject({ message });
        }
    }
    
    const deleteTheNewlyUploadedFile = async () => {
        try {
            await deleteFile(fileUrl);
            setFileUrl(null);
        } catch(error) {
            dispatch(addErrorMessageAction(error.message));
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
