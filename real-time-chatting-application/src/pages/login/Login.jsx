
import React, { useState } from "react";
import { loginUser } from "../../api/auth";

function Login() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const handleLogin = async () => {
        try {
            await loginUser(username, password);
            alert("Login successful");
            window.location.href = "/";

        } catch (error) {
            alert("Login failed: " + error.message);
        }
    };

    return (
        <div>
            <h2>Login</h2>
            <input type="text" placeholder="Username" onChange={e => setUsername(e.target.value)} />
            <input type="password" placeholder="Password" onChange={e => setPassword(e.target.value)} />
            <button onClick={handleLogin}>Login</button>
        </div>
    );
}

export default Login;
