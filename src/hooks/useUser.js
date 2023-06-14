import { auth } from '../firebase-config';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from 'firebase/auth';

import Cookies from 'universal-cookie';
const cookies = new Cookies();

export const useUser = () => {


    const registerUser = async (registerEmail, registerPassword, existingMember) => {
        try {
            await createUserWithEmailAndPassword(auth, registerEmail, registerPassword);
            await existingMember();
            alert('User created successfully please login');
        } catch (err) {
            alert(err.message.split("Firebase:").slice(1));
            return false;
        }
    }

    const loginUser = async (loginEmail, loginPassword, setIsAuth) => {
        try {
            const userCredential = await signInWithEmailAndPassword(
                auth,
                loginEmail,
                loginPassword
            );
            const user = userCredential.user;
            cookies.set("auth-token", user.reloadUserInfo.localId);
            const email = userCredential.user.email;
            const name = email.split("@")[0];
            cookies.set("user", name);
            setIsAuth(true);

        } catch (error) {

            alert(error.message.split("Firebase:").slice(1));
        }
    };

    const logOut = async (setIsAuth) => {
        try {
            await signOut(auth);
            cookies.remove("auth-token");
            cookies.remove("user");
            setIsAuth(false);
            window.location.reload();

        } catch (err) {

            alert(err.message.split("Firebase:").slice(1));
        }
    }

    return { registerUser, loginUser, logOut };

}