import { useDispatch } from 'react-redux';
import { addUserAction, addErrorMessageAction } from '../redux/actions/Actions';
import { useNavigate } from 'react-router-dom';
import { signup, login, logout } from '../services/AuthService';

export const useUser = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const registerUser = async ({email, password}) => {
        try {
            const { user } = await signup({email, password});
            if(user) {
                dispatch(addUserAction({email: user.email})); // add User to the state
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
                dispatch(addUserAction({email: user.email, uid: user.uid})); // add User to the state
                navigate('/videos');
            }
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
        logoutUser
    }

}