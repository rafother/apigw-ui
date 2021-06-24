import React from 'react';
import Drawer from "@material-ui/core/Drawer";
import Toolbar from "@material-ui/core/Toolbar";
import ClusterBadge from "../../components/ClusterBadge/ClusterBadge";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Divider from "@material-ui/core/Divider";
import {createStyles, makeStyles, Theme} from "@material-ui/core/styles";
import DynamicListItem from "../../components/DynamicListItem/DynamicListItem";

const drawerWidth = 240;

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
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
    }),
);

export interface DrawerListItem {
    name: string;
    icon: React.ReactNode;
    selected: boolean
}

type Props = {
    clusterIconPath: string;
    clusterName: string;
    clusterConnected: boolean;
    list: DrawerListItem[];
    onClickListItem: (name: string) => void;
}


export default function ClusterDrawer(props: Props) {
    const classes = useStyles();

    const handleListItemClick = (name: string) => {
        props.onClickListItem(name)
    }

    return (
        <Drawer
            className={classes.drawer}
            variant="permanent"
            classes={{
                paper: classes.drawerPaper,
            }}
        >
            <Toolbar/>
            <div className={classes.drawerContainer}>
                <ClusterBadge avatarPath="/static/images/ccslogo.png" connected={props.clusterConnected}/>
                <List>
                    <ListItem key={Date.now()}>
                        <ListItemText key={Date.now()} primary="Cluster Name" secondary={props.clusterName}/>
                    </ListItem>
                </List>
                <Divider/>
                <List>
                    {props.list.map(item =>
                        <DynamicListItem key={item.name} selected={item.selected} name={item.name} icon={item.icon}
                                         handleClick={() => handleListItemClick(item.name)}/>
                    )}
                </List>
            </div>
        </Drawer>
    );
}

