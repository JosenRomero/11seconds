import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { addUserAction } from '../redux/actions/Actions';

export const useUser = () => {

    const [authorized, setAuthorized] = useState(false);

    const dispatch = useDispatch();

    useEffect(() => {

        dispatch(addUserAction({
            username: "jose romero"
        }));

        setAuthorized(true)

    }, [dispatch]);

    return {
        authorized
    }

}