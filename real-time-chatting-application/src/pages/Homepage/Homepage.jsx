import React, { useState } from 'react';
import UserList from '../../components/Userlist/Userlist';
import Chatwindow from '../../components/Chatwindow/Chatwindow';
import style from './Homepage.module.css';

function Homepage() {
    const [selectedUser, setSelectedUser] = useState(null);

    return (
        <div className={style.homepage}>
            <UserList onSelectUser={setSelectedUser} />
            <Chatwindow receiver={selectedUser} />
        </div>
    );
}

export default Homepage;
