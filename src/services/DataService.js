import { addDoc, collection, query, getDocs, orderBy, doc, getDoc } from "firebase/firestore";
import { firebaseDB } from '../firebase';
import errorMessageHandler from '../utils/errorMessageHandler';

export const save = async (videoTitle, videoUrl, uid) => {
    try {
        const data = {
            userId: uid,
            title: videoTitle,
            videoUrl
        }
        // with a generated id
        await addDoc(collection(firebaseDB, "videos"), data);
    } catch(error) {
        const message = errorMessageHandler(error.code);
        return Promise.reject({message});
    }
}

export const getAll = async () => {
    try {
        const q = query(collection(firebaseDB, "videos"), orderBy("title", "desc"));
        const res = await getDocs(q);
        const videos = res.docs.map((doc) => { 
            return { ...doc.data(), id: doc.id } 
        })
        return videos
    } catch(error) {
        const message = errorMessageHandler(error.code);
        return Promise.reject({message});
    }
}

export const getOne = async (videoId) => {
    try {
        const videoRef = doc(firebaseDB, "videos", videoId);
        const videoSnap = await getDoc(videoRef);
        if(videoSnap.exists()) return videoSnap.data();
    } catch(error) {
        const message = errorMessageHandler(error.code);
        return Promise.reject({message});
    }
}