import React, { useEffect, useState } from 'react';
import style from "./Chatarea.module.css";
import { fetchMessages } from '../../api';

function Chatarea({ selectedUserId, reloadTrigger }) {
    const [messages, setMessages] = useState([]);
    const [currentUserId, setCurrentUserId] = useState(null);

    useEffect(() => {
        const loadMessages = async () => {
            const id = localStorage.getItem("userId");
            setCurrentUserId(id);

            if (!selectedUserId || !id) return;

            try {
                const data = await fetchMessages(id, selectedUserId);
                setMessages(data);
            } catch (error) {
                console.error("Error fetching messages:", error);
            }
        };
        loadMessages();
    }, [selectedUserId, reloadTrigger]);

    console.log("User", currentUserId);
    return (
        <div className={style.chatarea}>
            {/* Debug log for current user */}
            {console.log("Current User ID:", currentUserId)}

            {messages.map((msg) => {
                console.log("Message Data:", msg);

                const senderId = msg.sender?.id?.toString();
                const currentId = currentUserId?.toString();

                return (
                    <div
                        key={msg.id}
                        className={
                            senderId === currentId
                                ? style.chatarea__message_sender
                                : style.chatarea__message_receiver
                        }
                    >
                        <p className={style.message_text}>{msg.text}</p>
                    </div>
                );
            })}
        </div>
    );
}

export default Chatarea;
