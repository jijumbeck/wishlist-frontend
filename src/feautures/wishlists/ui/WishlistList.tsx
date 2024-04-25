import { useContext } from "react";
import { UserRelationStatus, UserRelationStatusContext } from "../../profile/ui/ProfileWidget";
import { useLoaderData } from "react-router-dom";
import { useGetWishlists } from "../wishlistAPI";
import { CreateWishlistButton, WishlistPreview } from "./WishlistPreview";
import { ReservationPreview } from "../../gifts/ui/Reservation";

export function WishlistListWidget() {
    const userId = useLoaderData() as string;
    console.log(userId);
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
            {userRelationStatus === UserRelationStatus.Me && (<><CreateWishlistButton /> <ReservationPreview /></>)}
            {
                data && data.length > 0
                    ? data.map(wishlist => <WishlistPreview key={wishlist.id} wishlist={wishlist} />)
                    : <p>У пользователя нет вишлистов.</p>
            }
        </div>
    )
}
