import { useLoaderData } from "react-router-dom";
import { useGetWishlistInfo, useGetWishlistsGifts } from "../../wishlists/wishlistAPI";
import { CreateGiftButton, GiftPreview } from "./GiftPreview";
import { useContext } from "react";
import { UserRelationStatusContext } from "../../profile/ui/ProfileWidget";
import { useAddGiftRights } from "../useAddGiftRight";
import { Wishlist } from "../../wishlists/wishlist.dto";


export function GiftList({ wishlist }: { wishlist: Wishlist }) {
    const wishlistId = useLoaderData() as string;
    const gifts = useGetWishlistsGifts(wishlistId).data;

    const hasRights = useAddGiftRights(wishlist);
    const relationStatus = useContext(UserRelationStatusContext);


    return (
        <div
            style={{
                display: 'flex',
                flexWrap: 'wrap',
                gap: '35px',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '30px 0 0 0'
            }}
        >
            {wishlist && hasRights ? <CreateGiftButton wishlist={wishlist} /> : null}
            {
                gifts && gifts.length > 0
                    ? gifts.map(gift => <GiftPreview key={gift.id} gift={gift} />)
                    : <p>Подарков нет.</p>
            }
        </div>
    )
}