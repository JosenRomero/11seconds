import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { ref, uploadBytesResumable, getDownloadURL, deleteObject } from 'firebase/storage';
import { addDoc, collection, query, getDocs, orderBy } from "firebase/firestore";
import { storage, firebaseDB } from '../firebase';

export const useVideo = () => {

    const user = useSelector((state) => state.user); // reducers/index.js

    const [loading, setLoading] = useState(false);
    const [progressBar, setProgressBar] = useState(5);
    const [videoUrl, setVideoUrl] = useState(null);

    const navigate = useNavigate();

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

    const saveVideo = async ({videoTitle, videoUrl}) => {

        try {

            const data = {
                userId: user.uid,
                title: videoTitle,
                videoUrl
            }

            // with a generated id
            await addDoc(collection(firebaseDB, "videos"), data);

            navigate('/videos');

        } catch(error) {
            console.log(error);
        }
 
    }

    const getAllVideos = async () => {

        try {
            const q = query(collection(firebaseDB, "videos"), orderBy("title", "desc"));
            const res = await getDocs(q);
            const videos = res.docs.map((doc) => { 
                return { ...doc.data(), id: doc.id } 
            })
            return videos
        } catch(error) {
            console.log(error);
        }

    }

    return {
        getAllVideos,
        saveVideo,
        uploadVideo,
        deleteVideo,
        loading,
        progressBar,
        videoUrl
    }

}
