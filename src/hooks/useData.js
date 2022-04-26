import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { addDoc, collection, query, getDocs, orderBy } from "firebase/firestore";
import { firebaseDB } from '../firebase';

export const useData = () => {

    const user = useSelector((state) => state.user); // reducers/index.js

    const navigate = useNavigate();

    const saveData = async ({videoTitle, videoUrl}) => {

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

    const getAllData = async () => {

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
        saveData,
        getAllData
    }

}
