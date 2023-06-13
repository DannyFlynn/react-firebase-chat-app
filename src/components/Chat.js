import { useState, useEffect } from "react";
import { useUser } from "../hooks/useUser";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleChevronRight } from "@fortawesome/free-solid-svg-icons";


import { addDoc, collection, serverTimestamp, onSnapshot, query, orderBy, limit } from 'firebase/firestore';
import { db } from "../firebase-config";

import Cookies from 'universal-cookie';
const cookies = new Cookies();


const Chat = ({ setIsAuth }) => {

    const [username, setUsername] = useState("");
    const [newMessage, setNewMessage] = useState("");
    const [messages, setMessages] = useState([
        { user: 'dan', text: 'testing, I am Testing to I am Testing to I am Testing to I am Testing to I am Testing to I am Testing to I am Testing to I am Testing to I am Testing to' },
        { user: 'nicki', text: 'I am Testing too' },
        { user: 'tommy', text: 'Mr testing' },
        { user: 'dan', text: 'all of us are testing' },
        { user: 'dan', text: 'testing' },
        { user: 'nicki', text: 'I am Testing too' },
        { user: 'tommy', text: 'Mr testing' },
        { user: 'dan', text: 'all of us are testing' },
        { user: 'dan', text: 'testing' },
        { user: 'nicki', text: 'I am Testing too' },
        { user: 'tommy', text: 'Mr testing' },
        { user: 'dan', text: 'all of us are testing' },
    ]);

    const messagesRef = collection(db, "messages");

    //this will display someones name when they send a message except yourself logic  inside div messages-container tenary condition 
    useEffect(() => {
        const user = cookies.get("user");
        if (user) {
            setUsername(user);
        }

    }, [])

    // useEffect(() => {
    //     console.log('snap render')
    //     const q = query(messagesRef, orderBy("createdAt"), limit(10));
    //     const unsubscribe = onSnapshot(q, (snapshot) => {
    //         const updatedMessages = snapshot.docs.map((doc) => ({
    //             id: doc.id,
    //             ...doc.data(),
    //         }));
    //         setMessages(updatedMessages);
    //     });

    //     // Clean up the listener when the component unmounts
    //     return () => unsubscribe();
    // }, [])




    // custom hook
    const { logOut } = useUser();

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (newMessage === "") return;

        await addDoc(messagesRef, {
            text: newMessage,
            createdAt: serverTimestamp(),
            user: username,
        });
        setNewMessage("");
    }
    return (
        <div className="chat-container  w-100  d-flex justify-content-center">
            <div className="screens-chat-container card bg-white">
                <div className="logout-container d-flex justify-content-between align-items-center">
                    <div>
                        <h5 className="p-2 fw-bold">InstaMessage</h5>
                    </div>
                    <div>
                        <button className="logout-btn" onClick={() => logOut(setIsAuth)}>Logout</button>
                    </div>
                </div>
                <div className="messages-container">
                    {messages.map((msg, id) => (
                        <div key={id} className={msg.user !== username ? 'my-4 left d-flex flex-column' : 'my-4 right d-flex flex-column'}>
                            {msg.user === username ? false : (<span className="message">{msg.user}:</span>)}
                            <span className="message">{msg.text}</span>
                        </div>
                    ))}
                </div>
                <div className="new-message-container">
                    <form className="new-message-form d-flex justify-content-between align-items-center" >
                        <textarea value={newMessage} onChange={(e) => setNewMessage(e.target.value)}
                            className="new-message-input"
                            placeholder="type-your-message"></textarea>

                        <FontAwesomeIcon icon={faCircleChevronRight} onClick={handleSubmit} className="font-icon-send-btn" size="3x" />

                    </form>
                </div>
            </div>
        </div>
    )
}

export default Chat