import { Button, IconButton, Menu, MenuItem } from "@mui/material";
import { useGetProfileInfo } from "../../profile/profileAPI";
import { useAddOtherGift, useGetWishlists } from "../../wishlists/wishlistAPI";
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import { useState } from "react";
import { Gift } from "../gift.dto";


export function AddGift({ gift }: { gift: Gift }) {
    const user = useGetProfileInfo({}).data;
    const wishlists = useGetWishlists(user ? user.id : 'undefined').data;
    const [addOtherGift, metadata] = useAddOtherGift();

    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    if (!user) {
        return null;
    }

    return (
        <div
            style={{
                alignSelf: 'flex-start',
                margin: '10px 0'
            }}
        >
            <Button
                id="add-gift-button"
                variant="outlined"
                onClick={handleClick}
            >
                Добавить в вишлист
            </Button>
            <Menu
                id="add-gift-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                sx={{
                    maxHeight: '300px',
                }}
            >
                {
                    wishlists
                        ? wishlists?.map(wishlist => (
                            <MenuItem
                                key={wishlist.id}
                                sx={{
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                    width: '300px'
                                }}
                            >
                                <p
                                    style={{
                                        margin: '0',
                                        textOverflow: 'ellipsis',
                                        whiteSpace: 'nowrap',
                                        overflow: 'hidden'
                                    }}
                                >
                                    {wishlist.title}
                                </p>
                                <IconButton
                                    onClick={() => addOtherGift({ wishlistId: wishlist.id, giftId: gift.id })}
                                >
                                    <AddCircleOutlineIcon />
                                </IconButton>
                            </MenuItem>))
                        : <p>У Вас нет вишлистов.</p>
                }
            </Menu>
        </div>
    )
}