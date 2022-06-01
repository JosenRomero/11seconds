import { addDoc, collection, query, getDocs, doc, getDoc, where, deleteDoc, startAfter, limit } from "firebase/firestore";
import { firebaseDB } from '../firebase';
import errorMessageHandler from '../utils/errorMessageHandler';

export const save = async (videoTitle, videoUrl, videoThumbnailUrl, uid) => {
    try {
        const data = {
            userId: uid,
            title: videoTitle,
            videoUrl,
            videoThumbnailUrl
        }
        // with a generated id
        await addDoc(collection(firebaseDB, "videos"), data);
    } catch(error) {
        const message = errorMessageHandler(error.code);
        return Promise.reject({message});
    }
}

export const getFirstPage = async (userId) => {
    try {
        const q = query(
            collection(firebaseDB, "videos"), 
            where("userId", "==", userId),
            limit(8)
        );
        const res = await getDocs(q);
        const videos = res.docs.map((doc) => { 
            return { ...doc.data(), id: doc.id } 
        })
        // Get the last visible document
        const lastVisible = res.docs[res.docs.length-1];
        return { videos, lastVisible }
    } catch(error) {
        const message = errorMessageHandler(error.code);
        return Promise.reject({message});
    }
}

export const getNextPage = async (userId, lastVideo) => {
    try {
        const q = query(
            collection(firebaseDB, "videos"),
            where("userId", "==", userId),
            startAfter(lastVideo),
            limit(8)
        );
        const res = await getDocs(q);
        const videos = res.docs.map((doc) => { 
            return { ...doc.data(), id: doc.id } 
        });
        // Get the last visible document
        const lastVisible = res.docs[res.docs.length-1];
        return { videos, lastVisible }
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

export const deleteOne = async (videoId) => {
    try {
        const videoRef = doc(firebaseDB, "videos", videoId);
        await deleteDoc(videoRef);
    } catch(error) {
        const message = errorMessageHandler(error.code);
        return Promise.reject({message});
    }
}