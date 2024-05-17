import { Badge, Button, IconButton, Menu, MenuItem } from "@mui/material";
import NotificationsIcon from '@mui/icons-material/Notifications';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import CancelIcon from '@mui/icons-material/Cancel';
import React from "react";
import { Notification, NotificationType, useGetNotifications } from "./notificationAPI";
import { useGetProfileInfo, useGetUserInfo } from "../profile/profileAPI";
import { useAddCoauthor, useRemoveCoauthor } from "../wishlists/coauthoringAPI";
import './Notification.css';
import { Link } from "react-router-dom";
import { useAddFriend, useDeleteFriend, useGetFriends } from "../friends/friendAPI";
import { useGetWishlistInfo } from "../wishlists/wishlistAPI";
import { UserInfo } from "../profile/profile.dto";


export function Notifications() {
    const notifications = useGetNotifications({}).data;

    return (<NotificationsPresenter notifications={notifications} />)
}


function NotificationsPresenter({ notifications }: { notifications: Notification[] | undefined }) {
    const user = useGetProfileInfo({}).data;
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    const birthdaysNotifications = useBirthdayNotifictation({ user });

    const allNotifications = [
        ...(notifications?.map(notification => <NotificationMenuItem key={`${notification.type} ${notification.requestSenderId}`} notification={notification} />) ?? []),
        ...birthdaysNotifications
    ]


    return (
        <div>
            <IconButton
                id="basic-button"
                aria-controls={open ? 'basic-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={open ? 'true' : undefined}
                onClick={handleClick}
            >
                <Badge color="secondary" badgeContent={allNotifications.length} invisible={false}>
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
                    allNotifications && allNotifications.length > 0
                        ? allNotifications
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
    const wishlist = useGetWishlistInfo(notification.data.wishlistId).data;
    const user = useGetUserInfo(wishlist?.creatorId ?? '').data;

    return (
        <MenuItem
            className="menu__item"
        >
            <p className="menu__item__text">
                Запрос на соавторство {wishlist?.title} от {user?.login}
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

function useBirthdayNotifictation({ user }: { user?: UserInfo }) {
    const friends = useGetFriends(user?.id ?? '').data;

    const birthdays = friends?.filter(friend => {
        if (!friend.birthdate) {
            return false;
        }

        const friendBirthdate = new Date(friend.birthdate);

        const now = new Date();
        if (now.getMonth() === 11) {
            now.setFullYear(now.getFullYear() + 1);
            now.setMonth(0);
        } else {
            now.setMonth(now.getMonth() + 1);
        }

        if (now >= friendBirthdate) {
            return true;
        }

        return false;
    });



    return birthdays?.map(birthday => {
        const friendBirthdate = new Date(birthday.birthdate ?? '');
        return (<MenuItem className="menu__item" key={birthday.id}>
            <p className="menu__item__text">
                У вашего друга {birthday.login} день рождения {' '}
                {friendBirthdate?.getDate() < 10 ? `0${friendBirthdate?.getDate()}` : friendBirthdate?.getDate()}
                .{friendBirthdate?.getMonth() + 1 < 10 ? `0${friendBirthdate?.getMonth() + 1}` : friendBirthdate?.getMonth() + 1}
            </p>
        </MenuItem>)
    }) ?? []
}