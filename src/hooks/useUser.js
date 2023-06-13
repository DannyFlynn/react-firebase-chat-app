import { useState } from 'react';
import { auth } from '../firebase-config';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from 'firebase/auth';

import Cookies from 'universal-cookie';
const cookies = new Cookies();

export const useUser = () => {


    const registerUser = async (registerEmail, registerPassword) => {
        try {
            await createUserWithEmailAndPassword(auth, registerEmail, registerPassword);
        } catch (err) {
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
            console.log(user)
            console.log(userCredential.user.email)
            cookies.set("auth-token", user.reloadUserInfo.localId);
            const email = userCredential.user.email;
            const name = email.split("@")[0];
            console.log(name);
            cookies.set("user", name);
            setIsAuth(true);

        } catch (error) {
            console.log(error.message);
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
            console.log(err);
        }
    }

    return { registerUser, loginUser, logOut };

}