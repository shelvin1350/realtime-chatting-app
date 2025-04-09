import React from 'react'
import styles from './Sidebar.module.css'
function Sidebar() {
    return (
        <div className={styles.sidebar}>
            <i className="fa fa-envelope" style={{ position: 'absolute', top: '5%' }}></i>
            <div className={styles.option__container__chat}>
                <i className="fa fa-comment"></i>
                <p>Chat</p>
            </div>
            <div className={styles.option__container}>
                <a href="/login"><i className="fa fa-sign-in"></i></a>
                <p>Logout</p>
            </div>

        </ div >
    )
}

export default Sidebar