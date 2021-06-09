import React from 'react';
import {createStyles, Theme, makeStyles} from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import DomainIcon from '@material-ui/icons/Domain';
import DnsIcon from '@material-ui/icons/Dns';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ClusterBadge from '../../components/ClusterBadge/ClusterBadge'
import ResourceList from "../../components/ResourceList/ResourceList";
import {Fab} from "@material-ui/core";
import {Add} from "@material-ui/icons";

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

export default function ResourceManagement() {
    const classes = useStyles();

    const [showAPIs, setShowAPIs] = React.useState(true)
    const [showCustomDomains, setShowCustomDomains] = React.useState(false)

    return (
        <div className={classes.root}>
            <CssBaseline/>
            <Drawer
                className={classes.drawer}
                variant="permanent"
                classes={{
                    paper: classes.drawerPaper,
                }}
            >
                <Toolbar/>
                <div className={classes.drawerContainer}>
                    <ClusterBadge/>
                    <List>
                        <ListItem>
                            <ListItemText primary="Cluster Name" secondary="Demo"/>
                        </ListItem>
                    </List>
                    <Divider/>
                    <List>
                        <ListItem button>
                            <ListItemIcon> <DnsIcon/></ListItemIcon>
                            <ListItemText primary="APIs"/>
                        </ListItem>
                        <ListItem button>
                            <ListItemIcon> <DomainIcon/></ListItemIcon>
                            <ListItemText primary="Custom Domains"/>
                        </ListItem>
                    </List>
                </div>
            </Drawer>
            <main className={classes.content}>
                <Typography className={classes.tableTitle}>Custom Domains:</Typography>
                <ResourceList/>
                <Fab className={classes.floatingBtn} color="primary" aria-label="add">
                    <Add />
                </Fab>
            </main>
        </div>
    );
}