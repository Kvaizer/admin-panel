import React from 'react';
import gif from  '../../assets/img/gif.gif';
import styles from './HomePage.module.sass';

export const HomePage = () => {
    return (
            <div className={styles.container}>
                <h1>Admin Page</h1>
                <h2>Plz choose any category</h2>
                <img src={gif} alt=""/>
            </div>
    );
};

