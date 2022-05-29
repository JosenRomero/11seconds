import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { save, getFirstPage, getNextPage, getOne, deleteOne } from '../services/DataService';
import { addErrorMessageAction } from '../redux/actions/Actions';
import { useFile } from './useFile';

export const useData = () => {

    const user = useSelector((state) => state.user); // reducers/index.js
    const { deleteFile } = useFile();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const saveData = async (videoTitle, videoUrl, videoThumbnailUrl) => {
        try {
            await save(videoTitle, videoUrl, videoThumbnailUrl, user.uid);
            navigate('/videos');
        } catch(error) {
            dispatch(addErrorMessageAction(error.message));
        }
    }

    const getFirstPageData = async () => {
        try {
            return await getFirstPage(user.uid);
        } catch(error) {
            dispatch(addErrorMessageAction(error.message));
        }
    }

    const getNextPageData = async (lastVideo) => {
        try {
            return await getNextPage(user.uid, lastVideo);
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

    const deleteOneData = async (videoId, videoUrl) => {
        try {
            await deleteOne(videoId);
            await deleteFile(videoUrl);
            navigate('/videos');
        } catch(error) {
            dispatch(addErrorMessageAction(error.message));
        }
    }

    return {
        saveData,
        getFirstPageData,
        getNextPageData,
        getOneData,
        deleteOneData
    }

}
