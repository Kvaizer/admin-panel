import React from 'react';
import {PopUpUserPropsType} from '../../../API/users/usersTypes';
import styles from './PopUpUser.module.sass'

const PopUpUser: React.FC<PopUpUserPropsType> = ({user, avatar}) => {
    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <img src={avatar} alt="avatar" className={styles.avatar}/>
                <div className={styles.userName}>{user.username}</div>
            </div>
            <hr/>
            <div className={styles.info}>
                <div> <span className={styles.text}>name: {user.name}</span></div>
                <div> <span className={styles.text}>e-mail: {user.email}</span></div>
                <div style={{display: 'flex', flexDirection: 'column'}}>
                    <span className={styles.text}>city: {user.address.city}</span>
                    <span className={styles.text}>street: {user.address.street}</span>
                </div>
            </div>
        </div>
    );
};

export default PopUpUser;