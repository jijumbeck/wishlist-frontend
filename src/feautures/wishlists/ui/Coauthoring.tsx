import { Button, IconButton, Menu, MenuItem } from "@mui/material";
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import React from "react";

import './Coauthoring.css';
import { useAddCoauthor, useGetCoauthors, useRemoveCoauthor } from "../coauthoringAPI";
import { Wishlist } from "../wishlist.dto";
import { useGetFriends } from "../../friends/friendAPI";
import { UserInfo } from "../../profile/profile.dto";


function useCoauthoringData(wishlist: Wishlist) {
    const coauthours = useGetCoauthors(wishlist.id).data;
    const friends = useGetFriends(wishlist.creatorId).data;

}


export function CoauthoringMenu({ wishlist }: { wishlist: Wishlist }) {
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    const coauthours = useGetCoauthors(wishlist.id).data;
    const friends = useGetFriends(wishlist.creatorId).data;


    return (
        <div className="coauthoring">
            <div id='coauthoring-anchor' className="coauthoring__anchor">
                <p>Соавторов: {coauthours ? coauthours.length : 0}</p>
                <IconButton
                    onClick={handleClick}
                    className={open ? "open-button" : ''}
                >
                    <ArrowBackIosNewIcon />
                </IconButton>
            </div>
            <Menu
                id="basic-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                MenuListProps={{
                    'aria-labelledby': 'basic-button',
                }}
                transformOrigin={{
                    horizontal: 'center',
                    vertical: 'top'
                }}
            >
                {
                    !coauthours || !friends
                        ? <p>Загрузка...</p>
                        : friends.map(friend =>
                            <CoauthoringMenuItem
                                key={friend.id}
                                wishlist={wishlist}
                                friend={friend}
                                isCoauthor={coauthours.findIndex(coauthours => coauthours.id === friend.id) >= 0}
                            />)
                }
            </Menu>
        </div>
    );
}

function CoauthoringMenuItem({ friend, isCoauthor, wishlist }: { friend: UserInfo, isCoauthor: boolean, wishlist: Wishlist }) {
    const [addCoauthor, addMetadata] = useAddCoauthor();
    const [removeCoauthor, removeMetadata] = useRemoveCoauthor();

    return (
        <MenuItem>
            <p
                style={{
                    width: '150px',
                    margin: '0',
                    textOverflow: 'ellipsis',
                    overflow: 'hidden',
                    whiteSpace: 'wrap'
                }}
            >{friend.login}</p>
            {
                isCoauthor
                    ? (<IconButton
                        onClick={() => removeCoauthor({ coauthorId: friend.id, wishlistId: wishlist.id })}
                        color="secondary"
                    >
                        <RemoveCircleOutlineIcon />
                    </IconButton>)

                    : (<IconButton
                        onClick={() => addCoauthor({ coauthorId: friend.id, wishlistId: wishlist.id })}
                    >
                        <AddCircleOutlineIcon />
                    </IconButton>)
            }
        </MenuItem>
    )
}