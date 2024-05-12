import { Badge, Button, IconButton, Menu, MenuItem } from "@mui/material";
import NotificationsIcon from '@mui/icons-material/Notifications';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import CancelIcon from '@mui/icons-material/Cancel';
import React from "react";
import { Notification, NotificationType, useGetNotifications } from "./notificationAPI";
import { useGetUserInfo } from "../profile/profileAPI";
import { useAddCoauthor, useRemoveCoauthor } from "../wishlists/coauthoringAPI";
import './Notification.css';
import { Link } from "react-router-dom";
import { useAddFriend, useDeleteFriend } from "../friends/friendAPI";


export function Notifications() {
    const notifications = useGetNotifications({}).data;

    return (<NotificationsPresenter notifications={notifications} />)
}


function NotificationsPresenter({ notifications }: { notifications: Notification[] | undefined }) {
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
                <Badge color="secondary" badgeContent={notifications ? notifications.length : 0} invisible={false}>
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
                    notifications && notifications.length > 0
                        ? notifications.map(notification => <NotificationMenuItem key={`${notification.type} ${notification.requestSenderId}`} notification={notification} />)
                        : <p>Нет уведомлений.</p>
                }
            </Menu>
        </div>
    )
}

function NotificationMenuItem({ notification }: { notification: Notification }) {
    if (notification.type === NotificationType.Friend) {
        return <FriendNotification userId={String(notification.requestSenderId)} />
    }

    return <CoauthorNotification notification={notification} />
}

function FriendNotification({ userId }: { userId: string }) {
    const user = useGetUserInfo(userId).data;
    const [addFriend] = useAddFriend();
    const [deleteFriend] = useDeleteFriend();

    if (!user) {
        return <p>Загрузка...</p>
    }

    return (
        <MenuItem
            className="menu__item"
        >
            <p className="menu__item__text">
                Запрос на дружбу: {' '}
                <Link style={{ display: 'inline' }} to={`/${userId}`}>{user.login}</Link>
            </p>
            <div>
                <IconButton
                    onClick={() => addFriend(userId)}
                    color="primary"
                >
                    <CheckCircleOutlineIcon />
                </IconButton>
                <IconButton
                    onClick={() => deleteFriend(userId)}
                    color="error"
                >
                    <CancelIcon />
                </IconButton>
            </div>
        </MenuItem>
    )
}

function CoauthorNotification({ notification }: { notification: Notification }) {
    const [addCoauthor] = useAddCoauthor();
    const [removeCoauthor] = useRemoveCoauthor();

    return (
        <MenuItem
            className="menu__item"
        >
            <p className="menu__item__text">
                Запрос на соавторство
            </p>
            <IconButton
                onClick={() => addCoauthor({ coauthorId: notification.requestReceiverId, wishlistId: notification.data?.wishlistId })}
                color="primary"
            >
                <CheckCircleOutlineIcon />
            </IconButton>
            <IconButton
                onClick={() => removeCoauthor({ coauthorId: notification.requestReceiverId, wishlistId: notification.data?.wishlistId })}
                color="error"
            >
                <CancelIcon />
            </IconButton>
        </MenuItem>
    )
}