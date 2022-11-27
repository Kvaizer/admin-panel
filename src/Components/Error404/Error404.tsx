import React, {useCallback} from 'react';
import {useNavigate} from 'react-router-dom';
import styles from './Error404.module.sass';
import {Button} from '@mui/material';
import errorPage from '../../assets/img/error_page404.png'

export const Error404: React.FC = () => {
    const navigate = useNavigate();

    const toLogin = useCallback(() => {
        navigate(`/`,{ replace: true });
    }, [])

    return (
        <div className={styles.container}>
            <div className={styles.image}>
                <img src={errorPage} alt="not_found_404"/>
            </div>
            <Button
                style={{position: 'fixed', bottom: '20px', right: '90px'}}
                onClick={toLogin}
                type={'submit'}
                variant="contained"
                sx={{mt: 3 , mb: 2}}>
                Go back
            </Button>
        </div>
    )
}