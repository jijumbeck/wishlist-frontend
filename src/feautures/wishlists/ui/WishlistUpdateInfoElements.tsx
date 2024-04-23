import { LoadingButton } from "@mui/lab";
import { ToggleButton, ToggleButtonGroup } from "@mui/material";
import { useEffect, useState } from "react";
import { Wishlist, WishlistAccessType } from "../wishlist.dto";
import { useUpdateWishlist } from "../wishlistAPI";

import SendIcon from '@mui/icons-material/Send';
import PublicIcon from '@mui/icons-material/Public';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import SettingsSuggestIcon from '@mui/icons-material/SettingsSuggest';


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