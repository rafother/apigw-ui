import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import styles from "./ConfirmationDialog.module.scss";
type Props = {
    open: boolean;
    handleClose: () => void;
    handleConfirm: () => void;
    // dialogTitle: string;
    // dialogContentText: string[];
    // children: React.ReactChildren
};

export default function ConfirmationDialog(props: Props) {
    const handleClose = () => {
        props.handleClose()
    }
    const handleConfirm = () => {
        props.handleConfirm()
    }
    return (
        <div>
            <Dialog
                open={props.open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">{"Cluster details"}</DialogTitle>
                {/*{{ children }}*/}
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        Details ...
                    </DialogContentText>
                    <DialogContentText id="alert-dialog-description">
                        Do you want continue?
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        Back
                    </Button>
                    <Button onClick={handleConfirm} color="primary" autoFocus>
                        Continue
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}