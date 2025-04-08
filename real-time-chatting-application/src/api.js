
import axios from "axios";

const BASE_URL = "http://localhost:8000";
export const fetchMessages = async (senderId, receiverId) => {
    const token = localStorage.getItem("accessToken");

    const response = await fetch(
        `http://localhost:8000/api/messages/?sender_id=${senderId}&reciever_id=${receiverId}`,
        {
            method: "GET",
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }
    );

    if (!response.ok) {
        throw new Error("Failed to fetch messages");
    }

    return await response.json();
};

export const sendMessage = async ({ sender, receiver, text }) => {
    try {
        const response = await fetch("http://localhost:8000/api/messages/create/", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${localStorage.getItem("accessToken")}`, // Assuming you're using a JWT token
            },
            body: JSON.stringify({ sender, reciever_id: receiver, text }),
        });

        if (!response.ok) {
            throw new Error("Error sending message");
        }

        return response.json();
    } catch (error) {
        throw new Error("Failed to send message: " + error.message);
    }
};
// src/api/index.js
export const fetchUsers = async () => {
    const token = localStorage.getItem("accessToken");

    const response = await fetch("http://localhost:8000/api/users/", {
        headers: {
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json"
        }
    });

    if (!response.ok) {
        throw new Error("Failed to fetch users");
    }

    return await response.json();
};

export const loginUser = async (username, password) => {
    const response = await fetch("http://localhost:8000/api/token/", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ username, password })
    });

    if (!response.ok) {
        throw new Error("Login failed");
    }

    const data = await response.json();

    // Store token and user ID
    localStorage.setItem("accessToken", data.access);
    localStorage.setItem("refreshToken", data.refresh);
    localStorage.setItem("userId", data.user_id);
};
