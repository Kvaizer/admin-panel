import React , {useState} from 'react';
import Modal from '@mui/material/Modal';
import {Box} from '@mui/material';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import s from './Modal.module.sass';
import Paper from "@mui/material/Paper";
import IconButton from "@mui/material/IconButton";
import EditIcon from '@mui/icons-material/Edit';
import LibraryAddIcon from '@mui/icons-material/LibraryAdd';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';

type ModalProps = {
    title: string
    description?: string
    children: React.ReactNode
}

const style = {
    position: 'absolute',
    top: '50%' ,
    left: '50%' ,
    transform: 'translate(-50%, -50%)' ,
    width: 400 ,
    bgcolor: 'background.paper' ,
    border: '2px solid #000' ,
    boxShadow: 24 ,
    p: 4 ,
};

export const ModalWindow: React.FC<ModalProps> = React.memo(({title , description , children}) => {
    const [open , setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    return (
        <div>
            <IconButton
                onClick={handleOpen}
            >
                {title === 'delete' ? <DeleteForeverIcon/> : title === 'Edit' ? <EditIcon/> : <LibraryAddIcon/>}
            </IconButton>
            <Modal open={open}
                   onClose={handleClose}
                   aria-labelledby="parent-modal-title"
                   aria-describedby="parent-modal-description">
                <Paper>
                    <Box
                        sx={style}
                        className={s.box}>
                        {description &&
                        <Typography textAlign={"center"}
                                    fontWeight={"bold"}
                                    id="modal-modal-title"
                                    variant="h6"
                                    component="h2">
                            {description}
                        </Typography>}
                        <div className={s.modal}>
                            {children}
                            <Button
                                style={{borderRadius: '30px'}}
                                onClick={handleClose}
                                sx={{mt: 3 , mb: 2}}
                                variant={'contained'}
                                color={'error'}
                                size={"small"}>
                                Close
                            </Button>
                        </div>
                    </Box>
                </Paper>
            </Modal>
        </div>
    );
})