import { useLoaderData } from "react-router-dom";

import { useGetWishlists } from "../wishlistAPI";
import { CreateWishlistButton, WishlistPreview } from "./WishlistPreview";
import { ReservationPreview } from "../../gifts/ui/Reservation";
import { WithUserRelation } from "../../profile/helpers/WithUserRelation";
import { useContext } from "react";
import { UserRelationStatus, UserRelationStatusContext } from "../../profile/helpers/useUserRelation";
import { useGetReservationCount } from "../../gifts/reservationAPI";


export function WishlistListWidget() {
    const userId = useLoaderData() as string;
    console.log(userId);
    const { data } = useGetWishlists(userId);
    const userRelation = useContext(UserRelationStatusContext);

    if (!data) {
        return <p>Загрузка...</p>
    }

    return (
        <>
            {
                userRelation === UserRelationStatus.Me
                    ? <ReservationCount />
                    : null
            }
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
        </>
    )
}

function ReservationCount() {
    const count = useGetReservationCount({}).data;

    if (!count) {
        return null
    }

    return (
        <p
            style={{ alignSelf: 'flex-end', margin: '0' }}
        >
            Ваши вишлисты помогли {count} {count === 1 ? 'другу': 'друзьям'} в выборе подарка.
        </p>
    )
}