import React from 'react'
import {useSelector} from 'react-redux'
import {AppRootStateType} from '../../../Store/store';
import {setAppError} from '../../../Store/reducers/appReducer';
import {AlertProps} from '@mui/material';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import {useAppDispatch} from '../../../utils/hooks';


export const ErrorSnackbar = () => {
    const error = useSelector<AppRootStateType, string | null>(state => state.appState.error);
    const dispatch = useAppDispatch();

    const handleClose = (event: React.SyntheticEvent | Event, reason?: string) => {
        if (reason === 'clickaway') {
            return
        }
        dispatch(setAppError({error: null}));
    }


    const isOpen = error !== null;

    return (
        <Snackbar open={isOpen} autoHideDuration={6000} onClose={handleClose}>
            <Alert onClose={handleClose} severity="error">
                {error}
            </Alert>
        </Snackbar>
    )
}
