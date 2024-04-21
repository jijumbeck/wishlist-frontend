import { useContext } from "react";
import { UserRelationStatusContext } from "../../profile/ui/ProfileWidget";
import { useLoaderData } from "react-router-dom";
import { useGetWishlists } from "../wishlistAPI";
import { CreateWishlistButton, WishlistPreview } from "./WishlistPreview";

export function WishlistListWidget() {
    const userId = useLoaderData() as string;
    const { data } = useGetWishlists(userId);

    const userRelationStatus = useContext(UserRelationStatusContext);

    if (!data) {
        return <p>Загрузка...</p>
    }

    return (
        <div
            style={{
                display: 'flex',
                flexWrap: 'wrap',
                gap: '35px',
                alignItems: 'center',
                justifyContent: 'center'
            }}
        >
            <CreateWishlistButton />
            {
                data.map(wishlist => <WishlistPreview key={wishlist.id} wishlist={wishlist} />)
            }
        </div>
    )
}