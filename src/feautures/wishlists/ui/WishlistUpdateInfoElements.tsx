import { LoadingButton } from "@mui/lab";
import { Checkbox, FormControl, InputLabel, ListItemText, MenuItem, Select, SelectChangeEvent, ToggleButton, ToggleButtonGroup } from "@mui/material";
import { useEffect, useState } from "react";
import { Wishlist, WishlistAccessType } from "../wishlist.dto";
import { useUpdateWishlist } from "../wishlistAPI";

import SendIcon from '@mui/icons-material/Send';
import PublicIcon from '@mui/icons-material/Public';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import SettingsSuggestIcon from '@mui/icons-material/SettingsSuggest';
import { useGetFriends } from "../../friends/friendAPI";


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
                setAccess(newValue)
            }}
        >
            <ToggleButton value={WishlistAccessType.Public}>
                <PublicIcon />
            </ToggleButton>

            <ToggleButton value={WishlistAccessType.ForFriends}>
                <PeopleAltIcon />
            </ToggleButton>

            <ToggleButton value={WishlistAccessType.Private}>
                <VisibilityOffIcon />
            </ToggleButton>

            <ToggleButton value={WishlistAccessType.Custom}>
                <SettingsSuggestIcon />
            </ToggleButton>
        </ToggleButtonGroup>
    )
}

export function CustomFriendAccess({ userId }: { userId: string }) {
    const friends = useGetFriends(userId).data;


    const [userIds, setUserIds] = useState<string[]>([]);
    const handleChange = (event: SelectChangeEvent<typeof userIds>) => {
        const {
            target: { value },
        } = event;
        console.log(value);
        setUserIds(
            // On autofill we get a stringified value.
            typeof value === 'string' ? value.split(',') : value,
        );
    };


    return (
        <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Age</InputLabel>
            <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                multiple
                value={userIds}
                renderValue={(selected) => selected.join(', ')}
                label="Друзья"
                onChange={handleChange}
            >
                {
                    friends
                        ? friends.map((friend) => (
                            <MenuItem key={friend.id} value={friend.login}>
                                <Checkbox checked={userIds.indexOf(friend.id) > -1} />
                                <ListItemText primary={friend.login} />
                            </MenuItem>))
                        : <p>Загрузка...</p>
                }
            </Select>
        </FormControl>
    )
}