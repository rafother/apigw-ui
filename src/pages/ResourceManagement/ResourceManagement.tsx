import React, {useEffect} from 'react';
import {createStyles, Theme, makeStyles} from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import DnsIcon from '@material-ui/icons/Dns';
import {Fab} from "@material-ui/core";
import {Add} from "@material-ui/icons";
import CreateResourceDialog from "../../components/CreateResourceDialog/CreateResourceDialog";
import ClusterDrawer, {ResourceView} from "../ClusterDrawer/ClusterDrawer"
import DomainIcon from "@material-ui/icons/Domain";
import {useInterval} from "../../utils";
import {getAllAPIs} from "../../services/api-http.service";
import {getAllCDs} from "../../services/customdomain-http.service";
import ResourceTable from "../../components/ResourceTable/ResourceTable";
import {axiosInstance} from "../../axios-instance";

const drawerWidth = 240;

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            display: 'flex',
        },
        drawer: {
            width: drawerWidth,
            flexShrink: 0,
        },
        drawerPaper: {
            width: drawerWidth,
        },
        drawerContainer: {
            overflow: 'auto',
        },
        content: {
            flexGrow: 1,
            padding: theme.spacing(3),
        },
        tableTitle: {
            marginBottom: "1rem"
        },
        floatingBtn: {
            position: 'absolute',
            bottom: theme.spacing(6),
            right: theme.spacing(6),
        }
    }),
);

const APIs = "APIs"
const CDs = "Custom Domains"


export default function ResourceManagement() {
    const classes = useStyles();

    const resourcesViews: ResourceView[] = [
        {
            id: "apis",
            name: APIs,
            icon: <DnsIcon/>,
            data: [],
            configurableProps: [
                "name",
                "namespace",
                "source-prefix",
                "source-domain",
                "target-host",
                "target-port"
            ]
        },
        {
            id: "customdomains",
            name: CDs,
            icon: <DomainIcon/>,
            data: [],
            configurableProps: ["name", "namespace", "domain"]
        }
    ];

    const [currentView, setCurrentView] = React.useState<ResourceView>(resourcesViews[0])

    const [openDialog, setOpenDialog] = React.useState(false);
    let [delay, setDelay] = React.useState(10000);

    useEffect(() => {
        updateData()
    }, [currentView.name])


    useInterval(async () => {
        await updateData()
        setDelay(1000 * 10)
    }, delay);

    const handleDialogOpen = () => {
        setOpenDialog(true);
    };

    const handleDialogClose = () => {
        setOpenDialog(false);
    };

    const handleCreateDialogConfirm = async () => {
        // data
        // await axiosInstance.post(currentView.id, data);
        //Todo
    };

    const onAddResource = () => {
        //Todo check connectivity to cluster and get details
        handleDialogOpen();
    };

    const handleResourceListChange = async (resName: string) => {
        const newView = resourcesViews.find(view => view.name === resName)
        if (newView !== undefined) {
            setCurrentView(newView)
        }
    }

    const updateData = async () => {
        const res = await axiosInstance.get(`/${currentView.id}`)

        currentView.data = res.data
        let newView = {...currentView} // must create new object so react will re-render with the new data
        setCurrentView(newView)
    }

    return (
        <div className={classes.root}>

            <CssBaseline/>
            <ClusterDrawer currentView={currentView.name} list={resourcesViews} clusterName="TBD"
                           clusterConnected={true} clusterIconPath="TBD" onClickListItem={handleResourceListChange}/>
            <main className={classes.content}>
                <ResourceTable listName={currentView.name} list={currentView.data}/>
                <Fab className={classes.floatingBtn} color="primary" aria-label="add" onClick={onAddResource}>
                    <Add/>
                </Fab>
                <CreateResourceDialog open={openDialog} resource={currentView.name} fields={currentView.configurableProps} handleClose={handleDialogClose}
                                      handleConfirm={handleCreateDialogConfirm}/>
            </main>
        </div>
    );
}