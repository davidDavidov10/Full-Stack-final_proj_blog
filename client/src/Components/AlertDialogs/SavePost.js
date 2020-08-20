import React from 'react';
import {
    Button,
    Dialog,
    DialogActions,
    DialogTitle,
    IconButton,
} from '@material-ui/core';

import SaveRoundedIcon from '@material-ui/icons/SaveRounded';


export default function AlertDialog(props) {
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };


    return (
        <div>
            <Button title="save Post" onClick={handleClickOpen} >
                Save Post
            </Button>
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">{"Save this post?"}</DialogTitle>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        NO!
                    </Button>
                    <Button onClick={props.handleEditPost} color="primary" autoFocus>
                        YES!
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}