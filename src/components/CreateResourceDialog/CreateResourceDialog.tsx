import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import {DialogContentText} from "@material-ui/core";

type Props = {
    open: boolean;
    resource: string
    fields: string[];
    handleClose: () => void;
    handleConfirm: () => void;
};

export default function CreateResourceDialog(props: Props) {

    const handleClose = () => {
        props.handleClose()
    }
    const handleConfirm = () => {
        props.handleConfirm()
    }

    return (
        <div>
            <Dialog open={props.open} onClose={handleClose} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">Create {props.resource}</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        To subscribe to this website, please enter your email address here. We will send updates
                        occasionally.
                    </DialogContentText>
                    {props.fields.map((field: string) => <TextField
                        // autoFocus
                        margin="dense"
                        id={field}
                        label={field}
                        type=""
                        fullWidth

                    />)}
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={handleConfirm} color="primary">
                        Create
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}