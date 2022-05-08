import { useDispatch } from 'react-redux';
import { addUserAction, addErrorMessageAction } from '../redux/actions/Actions';
import { useNavigate } from 'react-router-dom';
import { signup, login, updateUser, logout } from '../services/AuthService';

export const useUser = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const registerUser = async ({email, password}) => {
        try {
            const { user } = await signup({email, password});
            if(user) {
                let { email, uid, photoURL, displayName } = user;
                dispatch(addUserAction({email, uid, photoURL, username: displayName})); // add User to the state
                navigate('/videos');
            }
        } catch(error) {
            dispatch(addErrorMessageAction(error.message));
        }
    }

    const loginUser = async ({email, password}) => {
        try {
            const { user } = await login({email, password});
            if(user) {
                let { email, uid, photoURL, displayName } = user;
                dispatch(addUserAction({email, uid, photoURL, username: displayName})); // add User to the state
                navigate('/videos');
            }
        } catch(error) {
            dispatch(addErrorMessageAction(error.message));
        }
    }

    const updateUserProfile = async (infoUser) => {
        try {
            await updateUser(infoUser);
        } catch(error) {
            dispatch(addErrorMessageAction(error.message));
        }
    }

    const logoutUser = async () => {
        logout();
        dispatch(addUserAction({}));
    }

    return {
        registerUser,
        loginUser,
        updateUserProfile,
        logoutUser
    }

}