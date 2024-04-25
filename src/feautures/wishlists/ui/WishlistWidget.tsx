import { Link, useLoaderData } from "react-router-dom";
import { useGetWishlistInfo } from "../wishlistAPI";
import { TextField } from "@mui/material";
import { Wishlist, WishlistAccessType } from "../wishlist.dto";
import { useContext, useState } from "react";
import { GiftList } from "../../gifts/ui/GiftList";
import { ChangeWishlistAccess, ChangeWishlistTitle } from "./WishlistUpdateInfoElements";
import { CoauthoringMenu } from "./Coauthoring";
import { UserRelationStatus, UserRelationStatusContext } from "../../profile/ui/ProfileWidget";


export async function wishlstIdLoader({ params }: { params: any }) {
    const wishlistId = params?.wishlistId;
    return wishlistId;
}

export function WishlistWidget() {
    const wishlistId = useLoaderData() as string;
    const wishlist = useGetWishlistInfo(wishlistId).data;

    const relationStatus = useContext(UserRelationStatusContext);

    if (!wishlist) {
        return (<p>Загрузка...</p>)
    }

    return (
        <div style={{ display: 'flex', flexDirection: 'column' }}>
            {
                relationStatus === UserRelationStatus.Me
                    ? <>
                        <WishlistTitleInput wishlist={wishlist} />
                        <CoauthoringMenu wishlist={wishlist} />
                    </>
                    : <div style={{ fontSize: '32px', textAlign: 'start' }}>
                        <Link to={`/${wishlist.creatorId}`}>...</Link>
                        {' / '}{wishlist.title}
                    </div>
            }
            <GiftList wishlist={wishlist} />
        </div>
    )
}

function WishlistTitleInput({ wishlist }: { wishlist: Wishlist }) {
    const [title, setTitle] = useState(wishlist.title);

    return (
        <div style={{
            textAlign: 'start',
            display: 'flex',
            justifyContent: 'space-between'
        }}>
            <div style={{ fontSize: '32px', }}>
                <Link to={`/${wishlist.creatorId}`}>...</Link>

                {' / '}

                <TextField
                    variant="standard"
                    value={title}
                    onChange={e => setTitle(e.target.value)}
                    inputProps={{
                        style: { fontSize: '32px', width: 'fit-content' }
                    }}
                    sx={{
                        width: 'fit-content'
                    }}
                />

                {
                    title === wishlist.title
                        ? null
                        : <ChangeWishlistTitle wishlist={wishlist} newTitle={title} />
                }
            </div>

            <ChangeWishlistAccess wishlist={wishlist} />
        </div>
    )
}
