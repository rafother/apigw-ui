import React from 'react';
import Badge from '@material-ui/core/Badge';
import Avatar from '@material-ui/core/Avatar';
import { Theme, makeStyles, withStyles, createStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            display: 'flex',
            justifyContent: 'center',
            '& > *': {
                margin: theme.spacing(1),
            },
        },
        large: {
            width: theme.spacing(12),
            height: theme.spacing(8),
        }
    }),
);

type Props = {
    avatarPath: string
    connected: boolean
}

export default function BadgeAvatars(props: Props) {
    const classes = useStyles();

    const StyledBadge = withStyles((theme: Theme) =>
        createStyles({
            badge: {
                backgroundColor: () => props.connected ? "#44b700" : "red",
                color: () => props.connected ? "#44b700" : "red",
                boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
                '&::after': {
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    borderRadius: '50%',
                    animation: '$ripple 1.2s infinite ease-in-out',
                    border: '1px solid currentColor',
                    content: '""',
                },
            },
            '@keyframes ripple': {
                '0%': {
                    transform: 'scale(.8)',
                    opacity: 1,
                },
                '100%': {
                    transform: 'scale(2.4)',
                    opacity: 0,
                },
            },
        }),
    )(Badge);

    return (
        <div className={classes.root}>
            <StyledBadge
                overlap="rectangle"
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'right',
                }}
                variant="dot"
                color="secondary"
            >
                <Avatar variant="square" src={props.avatarPath} className={classes.large} />
            </StyledBadge>
        </div>
    );
}