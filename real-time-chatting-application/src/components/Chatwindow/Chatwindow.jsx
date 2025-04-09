import React, { useState, useEffect } from "react";
import style from "./Chatwindow.module.css";
import Chatarea from "../Chatarea/Chatarea";
import profile from "../../assets/images/profilepicture.png";
import profileimage from "../../assets/images/profile.jpg";
import { sendMessage } from "../../api";

function ChatWindow({ receiver }) {
    const [newMessage, setNewMessage] = useState("");
    const [reloadMessages, setReloadMessages] = useState(false);
    const currentUserId = localStorage.getItem("userId");
    console.log("Current User ID:", currentUserId);


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
                <div className={style.profile__container}>
                    <div className={style.profile__image}>
                        <img src={receiver ? profileimage : profile} alt="Profile" />
                    </div>
                    <h2>{receiver ? receiver.username : "Select a user"}</h2>
                </div>
                <div className={style.chatwindow__header__icons}>
                    {/* <i class="fa fa-search" aria-hidden="true"></i>
                    <i class="fa fa-phone" aria-hidden="true"></i> */}
                    <i class="fa fa-ellipsis-v" aria-hidden="true"></i>

                </div>
            </div>

            {receiver && (
                <Chatarea
                    selectedUserId={receiver.id}
                    // currentUserId={currentUserId}
                    reloadTrigger={reloadMessages}
                />
            )}

            <div className={style.chatwindow__footer}>

                <div className={style.text__container}>
                    <i className="fa fa-paperclip" aria-hidden="true"></i>
                    <input
                        type="text"
                        placeholder="Your message"
                        value={newMessage}
                        onChange={(e) => setNewMessage(e.target.value)}
                        onKeyDown={(e) => e.key === "Enter" && handleSend()}
                        disabled={!receiver}
                    />
                    <i
                        className={`fa fa-paper-plane ${style.sendIcon}`}
                        aria-hidden="true"
                        onClick={handleSend}
                    />

                </div>
                {/* <button type="button" onClick={handleSend} disabled={!receiver}>
                    Send
                </button> */}
            </div>
        </div>
    );
}

export default ChatWindow;
