import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase';

export const signup = async ({email, password}) => {
    try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        return userCredential
    } catch(err) {
        console.log(err)
    }
}