import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../firebase';
import { addUserAction } from '../redux/actions/Actions';

export const useAuth = () => {

    const [isAuth, setIsAuth] = useState("empty"); // "empty" || "signed in" || "signed out"
    const dispatch = useDispatch();

    useEffect(() => {

        setIsAuth("empty");
        
        // Check for user status
        onAuthStateChanged(auth, (user) => {
            if (user) {
                // User is signed in
                let { email, uid, photoURL, displayName } = user;
                dispatch(addUserAction({email, uid, photoURL, username: displayName})); // add User to the state
                setIsAuth("signed in");
            } else {
                // User is signed out
                setIsAuth("signed out");
            }
        });

    }, [dispatch]);

    return {
        isAuth
    }

}
