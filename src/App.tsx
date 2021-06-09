import React from 'react';
import './App.css';
import Button from '@material-ui/core/Button';
import {AppBar, Grid, IconButton, makeStyles, Theme, Toolbar, Typography} from "@material-ui/core";
import Kubeconfig from './pages/Kubeconfig/Kubeconfig'
import ConfirmationDialog from "./components/ConfirmationDialog/ConfirmationDialog";
import ResourceManagement from "./pages/ResourceManagement/ResourceManagement";

const useStyles = makeStyles((theme: Theme) => ({
    root: {
        flexGrow: 1,
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        flexGrow: 1,
    },
    appBar: {
        position: "sticky",
        zIndex: theme.zIndex.drawer + 1,
    },
}));

function App() {
    const classes = useStyles();

    // const [showKubeconfigPage, setShowKubeconfigPage] = React.useState(true);
    // const [showManagementPage, setShowManagementPage] = React.useState(false);
    const [showKubeconfigPage, setShowKubeconfigPage] = React.useState(false);
    const [showManagementPage, setShowManagementPage] = React.useState(true);
    const [openDialog, setOpenDialog] = React.useState(false);
    const handleDialogOpen = () => {
        setOpenDialog(true);
    };

    const handleDialogClose = () => {
        setOpenDialog(false);
    };

    const handleDialogConfirm = () => {
        //Todo navigate to managment page
        setShowKubeconfigPage(false)
        setShowManagementPage(true)
    };

    const onAcceptedKubeconfig = () => {
        //Todo check connectivity to cluster and get details
        handleDialogOpen();
    };

    return (
        <div className={"fullHeight"}>
            <AppBar position="static" className={classes.appBar}>
                <Toolbar>
                    <Typography variant="h6">
                        Central Gateway
                    </Typography>
                </Toolbar>
            </AppBar>
            <div className={"fullHeight"}>
                {
                    showKubeconfigPage ? <Kubeconfig onAcceptedKubeconfig={onAcceptedKubeconfig}/> :
                        showManagementPage ? <ResourceManagement/> : <div/>
                }
                <ConfirmationDialog open={openDialog} handleClose={handleDialogClose}
                                    handleConfirm={handleDialogConfirm}/>
            </div>
        </div>
    );
}

export default App;
