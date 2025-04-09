import React, { useEffect, useState } from 'react';
import style from './Userlist.module.css';
import profile from '../../assets/images/profilepicture.png';
import profileimage from '../../assets/images/profile.jpg';
import { fetchUsers } from '../../api';

function UserList({ onSelectUser }) {
    const [users, setUsers] = useState([]);
    const [selectedUserId, setSelectedUserId] = useState(null); // Step 1

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

    const handleUserClick = (user) => {
        setSelectedUserId(user.id); // Step 2
        onSelectUser(user);
    };

    return (
        <div className={style.userlist}>
            <div className={style.chatHeader}>
                <div className={style.input__container}>
                    <i className="fa fa-search"></i>
                    <input type="text" placeholder="Search" />
                </div>
            </div>
            <div className={style.userContainer}>

                {users.map((user) => (
                    <div
                        key={user.id}
                        className={`${style.user__container} ${selectedUserId === user.id ? style.selected : ''}`}
                        onClick={() => handleUserClick(user)}
                    >
                        <div className={style.image__container}>
                            <img src={profileimage} alt={`${user.username}'s profile`} />
                        </div>
                        <p>{user.username}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default UserList;
