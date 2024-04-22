import { useLoaderData } from "react-router-dom";
import { useGetWishlistsGifts } from "../../wishlists/wishlistAPI";
import { CreateGiftButton, GiftPreview } from "./GiftPreview";

export function GiftList() {
    const wishlistId = useLoaderData() as string;
    const gifts = useGetWishlistsGifts(wishlistId).data;

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
            <CreateGiftButton />
            {
                gifts && gifts.length > 0
                    ? gifts.map(gift => <GiftPreview key={gift.id} gift={gift} />)
                    : <p>Подарков нет.</p>
            }
        </div>
    )
}