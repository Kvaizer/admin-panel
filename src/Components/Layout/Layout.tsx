import React from 'react';
import {NavLink, Outlet} from 'react-router-dom';
import styles from './Layout.module.sass'
import {Container} from '@mui/material';

export const Layout: React.FC = () => {
    return (
        <Container
            sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                flexFlow: 'column nowrap'
            }}
            maxWidth={'xl'}>
            <nav className={styles.header}>
                <NavLink to='/' className={styles.navLink}>
                    <div className={styles.link}>Home</div>
                </NavLink>
                <NavLink to='/posts' className={styles.navLink}>
                    <div className={styles.link}>Posts</div>
                </NavLink>
                <NavLink to='/albums' className={styles.navLink}>
                    <div className={styles.link}>Albums</div>
                </NavLink>
                <NavLink to='/todos' className={styles.navLink}>
                    <div className={styles.link}>Todos</div>
                </NavLink>
            </nav>
            <Outlet/>
        </Container>
    );
};

