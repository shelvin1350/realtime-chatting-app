import React, { useState } from 'react';
import UserList from '../../components/Userlist/Userlist';
import Chatwindow from '../../components/Chatwindow/Chatwindow';
import style from './Homepage.module.css';
import Sidebar from '../../components/Sidebar/Sidebar';

function Homepage() {
    const [selectedUser, setSelectedUser] = useState(null);

    return (
        <div className={style.homepage}>
            <Sidebar />
            <div className={style.homepage__container}>

                <UserList onSelectUser={setSelectedUser} />
                <Chatwindow receiver={selectedUser} />
            </div>
        </div>
    );
}

export default Homepage;
