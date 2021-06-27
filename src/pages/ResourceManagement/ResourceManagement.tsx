import React, {useEffect} from 'react';
import {createStyles, Theme, makeStyles} from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import DnsIcon from '@material-ui/icons/Dns';
import {Fab} from "@material-ui/core";
import {Add} from "@material-ui/icons";
import CreateResourceDialog from "../../components/CreateResourceDialog/CreateResourceDialog";
import ClusterDrawer, {DrawerListItem} from "../ClusterDrawer/ClusterDrawer"
import DomainIcon from "@material-ui/icons/Domain";
import {useInterval} from "../../utils";
import {getAllAPIs} from "../../services/api-http.service";
import {getAllCDs} from "../../services/customdomain-http.service";
import ResourceTable from "../../components/ResourceTable/ResourceTable";

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
const resources: DrawerListItem[] = [
    {
        id: "apis",
        name: APIs,
        icon: <DnsIcon/>,
        selected: true
    },
    {
        id: "customdomains",
        name: CDs,
        icon: <DomainIcon/>,
        selected: false
    }
];

export default function ResourceManagement() {
    const classes = useStyles();

    const [APIsList, setAPIsList] = React.useState([])
    const [customDomainsList, setCustomDomainsList] = React.useState([])
    const [resourceList, setResourceList] = React.useState([APIsList])
    const [currentView, setCurrentView] = React.useState(APIs)

    const [openDialog, setOpenDialog] = React.useState(false);
    let [delay, setDelay] = React.useState(1000);

    useEffect(() => {
        handleResourceListItemChange()
    })

    useInterval(async () => {
        const apis = await getAllAPIs()
        setAPIsList(apis.data)
        const cds = await getAllCDs()
        setCustomDomainsList(cds.data)
        setDelay(1000 * 10)
    }, delay);

    const handleDialogOpen = () => {
        setOpenDialog(true);
    };

    const handleDialogClose = () => {
        setOpenDialog(false);
    };

    const handleDialogConfirm = () => {
        //Todo
    };

    const onAddResource = () => {
        //Todo check connectivity to cluster and get details
        handleDialogOpen();
    };

    const handleResourceListItemClick = (resName:string) => {
        setCurrentView(resName)
        handleResourceListItemChange()
    }
    const handleResourceListItemChange = () => {
        switch (currentView) {
            case APIs: {
                resources.forEach(res => {
                    res.name === APIs ? res.selected = true : res.selected = false
                })
                setResourceList(APIsList)
                break
            }
            case CDs: {
                resources.forEach(res => {
                    res.name === CDs ? res.selected = true : res.selected = false
                })
                setResourceList(customDomainsList)
                break
            }
        }

    }

    return (
        <div className={classes.root}>
            <CssBaseline/>
            <ClusterDrawer list={resources} clusterName="TBD" clusterConnected={true} clusterIconPath="TBD" onClickListItem={handleResourceListItemClick}/>
            <main className={classes.content}>
                <ResourceTable listName={currentView} list={resourceList}/>
                <Fab className={classes.floatingBtn} color="primary" aria-label="add" onClick={onAddResource}>
                    <Add/>
                </Fab>
                <CreateResourceDialog open={openDialog} handleClose={handleDialogClose}
                                      handleConfirm={handleDialogConfirm}/>
            </main>
        </div>
    );
}