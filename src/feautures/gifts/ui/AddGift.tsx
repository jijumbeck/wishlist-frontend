import { Button, IconButton, Menu, MenuItem } from "@mui/material";
import { useGetProfileInfo } from "../../profile/profileAPI";
import { useGetWishlists } from "../../wishlists/wishlistAPI";
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import { useState } from "react";


export function AddGift() {
    const user = useGetProfileInfo({}).data;
    const wishlists = useGetWishlists(user ? user.id : 'undefined').data;

    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <div>
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
                                    justifyContent: 'space-between'
                                }}
                            >
                                {wishlist.title}
                                <IconButton>
                                    <AddCircleOutlineIcon />
                                </IconButton>
                            </MenuItem>))
                        : <p>У Вас нет вишлистов.</p>
                }
            </Menu>
        </div>
    )
}