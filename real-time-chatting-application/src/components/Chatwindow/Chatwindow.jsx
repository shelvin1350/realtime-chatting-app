import React, { useState, useEffect } from "react";
import style from "./Chatwindow.module.css";
import Chatarea from "../Chatarea/Chatarea";
import profile from "../../assets/images/profilepicture.png";
import { sendMessage } from "../../api";

function ChatWindow({ receiver }) {
    const [newMessage, setNewMessage] = useState("");
    const [reloadMessages, setReloadMessages] = useState(false);
    const currentUserId = 1; 

    const handleSend = async () => {
        if (!newMessage.trim()) return;

        try {
            await sendMessage({
                sender: currentUserId,
                receiver: receiver?.id,
                text: newMessage,
            });
            setNewMessage("");
            setReloadMessages((prev) => !prev);
        } catch (error) {
            console.error("Failed to send message:", error);
        }
    };

    return (
        <div className={style.chatwindow}>
            <div className={style.chatwindow__header}>
                <div className={style.profile__image}>
                    <img src={profile} alt="Profile" />
                </div>
                <h2>{receiver ? receiver.username : "Select a user"}</h2>
            </div>

            {receiver && (
                <Chatarea
                    selectedUserId={receiver.id}
                    currentUserId={currentUserId}
                    reloadTrigger={reloadMessages}
                />
            )}

            <div className={style.chatwindow__footer}>
                <input
                    type="text"
                    placeholder="Type a message"
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && handleSend()}
                    disabled={!receiver}
                />
                <button type="button" onClick={handleSend} disabled={!receiver}>
                    Send
                </button>
            </div>
        </div>
    );
}

export default ChatWindow;
