import React, { useEffect, useState } from 'react';
import style from "./Chatarea.module.css";
import { fetchMessages } from '../../api';

function Chatarea({ selectedUserId, currentUserId, reloadTrigger }) {
    const [messages, setMessages] = useState([]);

    useEffect(() => {
        const loadMessages = async () => {
            if (!selectedUserId || !currentUserId) return;
            try {
                const data = await fetchMessages(currentUserId, selectedUserId);
                setMessages(data);
            } catch (error) {
                console.error("Error fetching messages:", error);
            }
        };
        loadMessages();
    }, [selectedUserId, reloadTrigger]);

    return (
        <div className={style.chatarea}>
            {messages.map((msg) => (
                <div
                    key={msg.id}
                    className={
                        msg.sender.id === currentUserId
                            ? style.chatarea__message_sender
                            : style.chatarea__message_receiver
                    }
                >
                    <p>{msg.text}</p>
                </div>
            ))}
        </div>
    );
}

export default Chatarea;
