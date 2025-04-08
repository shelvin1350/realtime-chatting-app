// src/api/auth.js
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
    // Store token
    localStorage.setItem("accessToken", data.access);
    localStorage.setItem("refreshToken", data.refresh);
};
