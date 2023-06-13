import { useState } from "react";
import { auth } from "../firebase-config";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from 'firebase/auth';



export const Auth = () => {

    const [registerEmail, setRegisterEmail] = useState("")
    const [registerPassword, setRegisterPassword] = useState("")
    const [loginEmail, setLoginEmail] = useState("");
    const [loginPassword, setLoginPassword] = useState("");
    const [test, setTest] = useState("");



    const createUser = async () => {

        await createUserWithEmailAndPassword(auth, registerEmail, registerPassword);

    }

    const login = async () => {
        try {
            const userCredential = await signInWithEmailAndPassword(
                auth,
                loginEmail,
                loginPassword
            );
            const user = userCredential.user;
            setTest(user.email);
        } catch (error) {
            console.log(error.message);
        }
    };

    const logOut = async () => {
        try {
            await signOut(auth);
            setTest("");
        } catch (err) {
            console.log(err);
        }
    }

    return (
        <div>
            <input type="email" value={registerEmail} onChange={(e) => setRegisterEmail(e.target.value)} />
            <input type="password" value={registerPassword} onChange={(e) => setRegisterPassword(e.target.value)} />
            <button onClick={createUser}>Log In</button>
            <button onClick={logOut}>Log out</button>
            <input type="email" value={loginEmail} onChange={(e) => setLoginEmail(e.target.value)} />
            <input type="password" value={loginPassword} onChange={(e) => setLoginPassword(e.target.value)} />
            <button onClick={login}>Login</button>
            {test}
        </div>
    )
}