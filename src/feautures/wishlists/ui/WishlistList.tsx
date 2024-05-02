import { useLoaderData } from "react-router-dom";

import { useGetWishlists } from "../wishlistAPI";
import { CreateWishlistButton, WishlistPreview } from "./WishlistPreview";
import { ReservationPreview } from "../../gifts/ui/Reservation";
import { WithUserRelation } from "../../profile/helpers/WithUserRelation";


export function WishlistListWidget() {
    const userId = useLoaderData() as string;
    console.log(userId);
    const { data } = useGetWishlists(userId);

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
            <WithUserRelation
                renderMe={() => (
                    <>
                        <CreateWishlistButton />
                        <ReservationPreview />
                    </>
                )}
                renderFriend={() => <></>}
                renderNone={() => <></>}
            />
            {
                data && data.length > 0
                    ? data.map(wishlist => <WishlistPreview key={wishlist.id} wishlist={wishlist} />)
                    : <p>У пользователя нет вишлистов.</p>
            }
        </div>
    )
}
