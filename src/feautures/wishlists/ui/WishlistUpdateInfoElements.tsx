import { LoadingButton } from "@mui/lab";
import { Checkbox, FormControl, InputLabel, ListItemText, Menu, MenuItem, Select, SelectChangeEvent, ToggleButton, ToggleButtonGroup, Tooltip } from "@mui/material";
import React, { useEffect, useState } from "react";
import { Wishlist, WishlistAccessType } from "../wishlist.dto";
import { useUpdateWishlist } from "../wishlistAPI";

import SendIcon from '@mui/icons-material/Send';
import PublicIcon from '@mui/icons-material/Public';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import SettingsSuggestIcon from '@mui/icons-material/SettingsSuggest';
import { useGetFriends } from "../../friends/friendAPI";
import { UserInfo } from "../../profile/profile.dto";
import { useForbidAccess, useGetUsersWithAccess, useGiveAccess } from "../accessAPI";


export function ChangeWishlistTitle({ wishlist, newTitle }: { wishlist: Wishlist, newTitle: string }) {
    const [changeWishlist, metadata] = useUpdateWishlist();

    return (
        <LoadingButton
            loading={metadata.isLoading}
            onClick={() => {
                changeWishlist({ ...wishlist, title: newTitle })
            }}
        >
            <SendIcon />
        </LoadingButton>
    )
}

export function ChangeWishlistAccess({ wishlist }: { wishlist: Wishlist }) {
    const [access, setAccess] = useState(wishlist.wishlistAccess);
    const [changeWishlist, metadata] = useUpdateWishlist();

    useEffect(() => {
        if (wishlist.wishlistAccess !== access) {
            changeWishlist({ ...wishlist, wishlistAccess: access })
        }
    }, [access]);

    return (
        <ToggleButtonGroup
            value={access}
            exclusive
            onChange={(e, newValue) => {
                if (newValue) {
                    setAccess(newValue)
                }
            }}
        >
            <Tooltip title="Вишлист будет доступен всем пользователям." placement="top" arrow>
                <ToggleButton value={WishlistAccessType.Public}>
                    <PublicIcon />
                </ToggleButton>
            </Tooltip>

            <Tooltip title="Вишлист будет доступен всем друзьям." placement="top" arrow>
                <ToggleButton value={WishlistAccessType.ForFriends}>
                    <PeopleAltIcon />
                </ToggleButton>
            </Tooltip>

            <Tooltip title="Вишлист будет доступен только Вам." placement="top" arrow>
                <ToggleButton value={WishlistAccessType.Private}>
                    <VisibilityOffIcon />
                </ToggleButton>
            </Tooltip>

            <Tooltip title="Вишлист будет доступен друзьям, которых вы выбрали." placement="top" arrow>
                <ToggleButton
                    value={WishlistAccessType.Custom}

                >
                    <ChooseCustomAccess userId={wishlist.creatorId} wishlistId={wishlist.id} />
                    {/* <SettingsSuggestIcon /> */}
                </ToggleButton>
            </Tooltip>

        </ToggleButtonGroup>
    )
}

function ChooseCustomAccess({ userId, wishlistId }: { userId: string, wishlistId: string }) {
    const friends: UserInfo[] | undefined = useGetFriends(userId).data;
    const usersWithAccess = useGetUsersWithAccess(wishlistId).data;
    const [menuAnchor, setMenuAnchor] = useState<null | HTMLElement>(null);

    return (
        <div>
            <div
                id="custom-access-button"
                onClick={e => setMenuAnchor(e.currentTarget)}
            >
                <SettingsSuggestIcon />
            </div>
            <Menu
                id="custom-access-menu"
                anchorEl={menuAnchor}
                open={Boolean(menuAnchor)}
                onClose={() => setMenuAnchor(null)}
            >
                {
                    !friends || !usersWithAccess
                        ? <p>Загрузка...</p>
                        : friends.map(friend =>
                            <CustomAccessMenuItem
                                key={friend.id}
                                user={friend}
                                wishlistId={wishlistId}
                                hasAccess={usersWithAccess.findIndex(id => id === friend.id) >= 0}
                            />)
                }
            </Menu>
        </div>
    )
}

function CustomAccessMenuItem({ user, hasAccess, wishlistId }: { user: UserInfo, hasAccess: boolean, wishlistId: string }) {
    const [checked, setChecked] = useState(hasAccess);
    const [giveAccess] = useGiveAccess();
    const [forbidAccess] = useForbidAccess();

    useEffect(() => {
        if (checked) {
            giveAccess({ userId: user.id, wishlistId });
        } else {
            forbidAccess({ userId: user.id, wishlistId });
        }
    }, [checked])

    return (
        <MenuItem>
            <Checkbox
                checked={checked}
                onChange={e => setChecked(e.target.checked)}
            />
            {user.login}
        </MenuItem>
    )
}

export function CustomFriendAccess({ userId }: { userId: string }) {

}