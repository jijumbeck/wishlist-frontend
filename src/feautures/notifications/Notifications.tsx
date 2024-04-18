import { Badge, IconButton, Menu, MenuItem } from "@mui/material";
import NotificationsIcon from '@mui/icons-material/Notifications';
import React from "react";


export interface Notification {
    text: string,
    accept: (params: any) => any,
    decline: (params: any) => any
}


export function Notifications() {

    return (<NotificationsPresenter notifications={[]} />)
}


function NotificationsPresenter({ notifications }: { notifications: Notification[] }) {
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <div>
            <IconButton
                id="basic-button"
                aria-controls={open ? 'basic-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={open ? 'true' : undefined}
                onClick={handleClick}
            >
                <Badge color="secondary" badgeContent={1} invisible={false}>
                    <NotificationsIcon />
                </Badge>
            </IconButton>
            <Menu
                id="basic-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                MenuListProps={{
                    'aria-labelledby': 'basic-button',
                }}
            >
                {
                    notifications.map(notification => <MenuItem>{notification.text}</MenuItem>)
                }
                <MenuItem onClick={handleClose}>Profile</MenuItem>
                <MenuItem onClick={handleClose}>My account</MenuItem>
                <MenuItem onClick={handleClose}>Logout</MenuItem>
            </Menu>
        </div>
    )
}