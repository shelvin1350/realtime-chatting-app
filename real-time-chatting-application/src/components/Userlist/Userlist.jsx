import React, { useEffect, useState } from 'react';
import style from './Userlist.module.css';
import profile from '../../assets/images/profilepicture.png';
import { fetchUsers } from '../../api';

function UserList({ onSelectUser }) {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        const loadUsers = async () => {
            try {
                const data = await fetchUsers();
                setUsers(data);
            } catch (error) {
                console.error("Error fetching users:", error);
            }
        };
        loadUsers();
    }, []);

    return (
        <div className={style.userlist}>
            <div className={style.chatHeader}>
                <h2>Chat</h2>
            </div>
            <div className={style.userContainer}>
                {users.map((user) => (
                    <div
                        key={user.id}
                        className={style.user__container}
                        onClick={() => onSelectUser(user)}
                    >
                        <div className={style.image__container}>
                            <img src={profile} alt={`${user.username}'s profile`} />
                        </div>
                        <p>{user.username}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default UserList;
