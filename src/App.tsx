import React from 'react';
import {AppBar, makeStyles, Theme, Toolbar, Typography} from "@material-ui/core";
import Kubeconfig from './pages/Kubeconfig/Kubeconfig'
// import ConfirmationDialog from "./components/ConfirmationDialog/ConfirmationDialog";
import ResourceManagement from "./pages/ResourceManagement/ResourceManagement";
import {getClusterData} from "./services/general-http.service";
import * as yaml from "js-yaml";

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

    // const [isShowKubeconfigPage, setIsShowKubeconfigPage] = React.useState(true);
    // const [isShowManagementPage, setIsShowManagementPage] = React.useState(false);
    const [isShowKubeconfigPage, setIsShowKubeconfigPage] = React.useState(true);
    const [isShowManagementPage, setIsShowManagementPage] = React.useState(false);
    // const [openDialog, setOpenDialog] = React.useState(false);
    // const handleDialogOpen = () => {
    //     setOpenDialog(true);
    // };
    //
    // const handleDialogClose = () => {
    //     setOpenDialog(false);
    // };

    const showManagementPage = () => {
        setIsShowKubeconfigPage(false)
        setIsShowManagementPage(true)
    };

    const onAcceptedKubeconfig = async (kubeconfig: any) => {
        let reader = new FileReader();
        reader.onload = async (e) => {
            if ( e && e.target) {
                const res = e.target.result
                if (typeof res === "string") {
                    const content = yaml.load(res) as any
                    if (content["kind"] === "Config"){
                        //Todo check connectivity to cluster?
                        // what data on a cluster we can achieve?
                        const res = await getClusterData();
                        const clusterData = res.data;
                        console.log(clusterData);
                        // const kubecfgContext = content["current-context"]

                        showManagementPage();
                    }
                }
            }
        };
        reader.readAsText(kubeconfig[0]);
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
                    isShowKubeconfigPage ? <Kubeconfig onAcceptedKubeconfig={onAcceptedKubeconfig}/> :
                        isShowManagementPage ? <ResourceManagement/> : <div/>
                }
                {/*<ConfirmationDialog open={openDialog} handleClose={handleDialogClose}*/}
                {/*                    handleConfirm={handleDialogConfirm}></ConfirmationDialog>*/}
            </div>
        </div>
    );
}

export default App;
