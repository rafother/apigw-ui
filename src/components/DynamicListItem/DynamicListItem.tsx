import React from 'react';
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";

type Props = {
    name: string;
    icon: React.ReactNode;
    selected: boolean;
    handleClick: (name: string) => void;
}


export default function DynamicListItem(props: Props) {
    const handleClick = () => {
        props.handleClick(props.name)
    }

    return (
        <ListItem key={Date.now()} selected={props.selected} button onClick={handleClick}>
            <ListItemIcon> {props.icon}</ListItemIcon>
            <ListItemText primary={props.name}/>
        </ListItem>
    );
}

