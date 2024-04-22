import { Link, useLoaderData } from "react-router-dom";
import { useGetWishlistInfo } from "../wishlistAPI";
import { TextField } from "@mui/material";
import { Wishlist } from "../wishlist.dto";
import { useState } from "react";
import { GiftList } from "../../gifts/ui/GiftList";



export async function wishlstIdLoader({ params }: { params: any }) {
    const wishlistId = params?.wishlistId;
    return wishlistId;
}

export function WishlistWidget() {
    const wishlistId = useLoaderData() as string;
    const wishlist = useGetWishlistInfo(wishlistId).data;

    if (!wishlist) {
        return (<p>Загрузка...</p>)
    }

    return (
        <div>
            <WishlistTitleInput wishlist={wishlist} />
            <GiftList />
        </div>
    )
}

function WishlistTitleInput({ wishlist }: { wishlist: Wishlist }) {
    const [title, setTitle] = useState(wishlist.title);

    return (
        <div style={{ fontSize: '32px', textAlign: 'start' }}>
            <Link to={`/${wishlist.creatorId}`}>...</Link>
            {' / '}
            {/* <TextField
                variant="standard"
                value={title}
                onChange={e => setTitle(e.target.value)}
                inputProps={{
                    style: { fontSize: '32px', width: 'auto' }
                }}
                sx={{
                    width: 'auto'
                }}
            /> */}
            {wishlist.title}
        </div>
    )
}