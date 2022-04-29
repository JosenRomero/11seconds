import { 
    createUserWithEmailAndPassword, 
    signInWithEmailAndPassword,
    signOut
} from 'firebase/auth';
import { auth } from '../firebase';
import errorMessageHandler from '../utils/errorMessageHandler';

export const signup = async ({email, password}) => {
    try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        return userCredential
    } catch(err) {
        console.log(err)
    }
}

export const login = async ({email, password}) => {
    try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        return userCredential
    } catch(error) {
        const message = errorMessageHandler(error.code);
        return Promise.reject({message});
    }
}

export const logout = async () => {
    try {
        await signOut(auth);
    } catch(err) {
        console.log(err);
    }
}
