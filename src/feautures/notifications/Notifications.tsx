import { Badge, Button, IconButton, Menu, MenuItem } from "@mui/material";
import NotificationsIcon from '@mui/icons-material/Notifications';
import React from "react";
import { Notification, NotificationType, useGetNotifications } from "./notificationAPI";
import { useGetUserInfo } from "../profile/profileAPI";
import { useAddCoauthor } from "../wishlists/coauthoringAPI";


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
                        ? notifications.map(notification => <NotificationMenuItem notification={notification} />)
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

    if (!user) {
        return <p>Загрузка...</p>
    }

    return (
        <MenuItem>
            <p>
                Запрос на дружбу: {user.login}
            </p>
            <div>
                <Button
                    variant="outlined"
                >
                    Принять
                </Button>
                <Button
                    variant="outlined"
                    color="error"
                >
                    Отклонить
                </Button>
            </div>
        </MenuItem>
    )
}

function CoauthorNotification({ notification }: { notification: Notification }) {
    const [addCoauthor, metadata] = useAddCoauthor();

    return (
        <MenuItem>
            Запрос на соавторство
            <Button
                variant="outlined"
                onClick={() => addCoauthor({ coauthorId: notification.requestReceiverId, wishlistId: notification.data?.wishlistId })}
            >
                Принять
            </Button>
            <Button
                variant="outlined"
                color="error"
            >
                Отклонить
            </Button>
        </MenuItem>
    )
}