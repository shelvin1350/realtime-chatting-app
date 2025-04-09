import React, { useState } from "react";
import { loginUser } from "../../api/auth";
import styles from "./Login.module.css"; // Use a similar CSS module as Register

function Login() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(null);

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            await loginUser(username, password);
            alert("Login successful");
            window.location.href = "/";
        } catch (error) {
            setError("Login failed: " + (error.response?.data?.detail || error.message));
        }
    };

    return (
        <div className={styles.login}>
            <form onSubmit={handleLogin}>
                <h2>Login</h2>

                <div className={styles.formGroup}>
                    <label htmlFor="username">Username</label>
                    <input
                        id="username"
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                    />
                </div>

                <div className={styles.formGroup}>
                    <label htmlFor="password">Password</label>
                    <input
                        id="password"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>

                {error && <p className={styles.error}>{error}</p>}

                <button type="submit">Login</button>
                <p className={styles.loginLink}>
                    Not having an account? <a href="/register">Register</a>
                </p>
            </form>
        </div>
    );
}

export default Login;
