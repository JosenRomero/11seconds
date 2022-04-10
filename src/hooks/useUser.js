import { useDispatch } from 'react-redux';
import { addUserAction } from '../redux/actions/Actions';
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
        } catch(err) {
            console.log(err);
        }
    }

    const loginUser = async ({email, password}) => {
        try {
            const { user } = await login({email, password});
            if(user) {
                dispatch(addUserAction({email: user.email})); // add User to the state
                navigate('/videos');
            }
        } catch(err) {
            console.log(err);
        }
    }

    const logoutUser = async () => {
        logout();
        navigate('/login');
    }

    return {
        registerUser,
        loginUser,
        logoutUser
    }

}