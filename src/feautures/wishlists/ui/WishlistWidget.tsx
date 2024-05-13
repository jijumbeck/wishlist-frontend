import { createContext, useState } from "react";
import { Link, useLoaderData } from "react-router-dom";
import { TextField } from "@mui/material";


import { useGetWishlistInfo } from "../wishlistAPI";
import { Wishlist } from "../wishlist.dto";
import { GiftList } from "../../gifts/ui/GiftList";
import { ChangeWishlistAccess, ChangeWishlistTitle } from "./WishlistUpdateInfoElements";
import { CoauthoringMenu } from "./Coauthoring";
import { WithUserRelation } from "../../profile/helpers/WithUserRelation";
import { ShareByLink } from "./ShareByLink";


export async function wishlstIdLoader({ params }: { params: any }) {
    const wishlistId = params?.wishlistId;
    return wishlistId;
}

export const WishlistContext = createContext<Wishlist | null>(null);

export function WishlistWidget() {
    const wishlistId = useLoaderData() as string;
    const wishlist = useGetWishlistInfo(wishlistId).data;

    if (!wishlist) {
        return (<p>Загрузка...</p>)
    }

    return (
        <div style={{ display: 'flex', flexDirection: 'column' }}>
            <WishlistContext.Provider value={wishlist}>
                <WithUserRelation
                    renderMe={() => (
                        <>
                            <WishlistTitleInput wishlist={wishlist} />
                            <ShareByLink wishlist={wishlist} />
                            <CoauthoringMenu wishlist={wishlist} />
                        </>
                    )}
                    renderFriend={() => (
                        <div style={{ fontSize: '32px', textAlign: 'start' }}>
                            <Link to={`/${wishlist.creatorId}`}>...</Link>
                            {' / '}{wishlist.title}
                        </div>
                    )}
                    renderNone={() => (
                        <div style={{ fontSize: '32px', textAlign: 'start' }}>
                            <Link to={`/${wishlist.creatorId}`}>...</Link>
                            {' / '}{wishlist.title}
                        </div>
                    )}
                />

                <GiftList wishlist={wishlist} />
            </WishlistContext.Provider>
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
