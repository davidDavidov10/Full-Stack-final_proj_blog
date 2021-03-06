import React from 'react';
import {
    Button,
    Dialog,
    DialogActions,
    DialogTitle,
    IconButton,
} from '@material-ui/core';



export default function AlertDialog(props) {
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };


    return (
        <span className="desc" >
        <button  className="fa fa-trash-o"
                 style={{fontSize:"25px"}}
                 title="Delete Post"
                 onClick = {handleClickOpen}/>
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">{"Delete this post?"}</DialogTitle>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        NO!
                    </Button>
                    <Button onClick={props.handleDelete} color="primary" autoFocus>
                        YES!
                    </Button>
                </DialogActions>
            </Dialog>
        </span>
    );
}