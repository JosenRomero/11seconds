import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { save, getAll, getOne } from '../services/DataService';
import { addErrorMessageAction } from '../redux/actions/Actions';

export const useData = () => {

    const user = useSelector((state) => state.user); // reducers/index.js

    const dispatch = useDispatch();

    const navigate = useNavigate();

    const saveData = async ({videoTitle, videoUrl}) => {
        try {
            await save(videoTitle, videoUrl, user.uid);
            navigate('/videos');
        } catch(error) {
            dispatch(addErrorMessageAction(error.message));
        }
    }

    const getAllData = async () => {
        try {
            return await getAll(user.uid);
        } catch(error) {
            dispatch(addErrorMessageAction(error.message));
        }
    }

    const getOneData = async (videoId) => {
        try {
            return await getOne(videoId); 
        } catch(error) {
            dispatch(addErrorMessageAction(error.message));
        }
    }

    return {
        saveData,
        getAllData,
        getOneData
    }

}
