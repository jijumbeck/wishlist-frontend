import { Link, useNavigate } from "react-router-dom"
import { useGetReservations } from "../reservationAPI";
import { Reservation } from "../gift.dto";
import { useGetGift } from "../giftAPI";
import { useGetUserInfo } from "../../profile/profileAPI";
import { RemoveReservationButton } from "./GiftPreview";

export function ReservationPreview() {
    const navigate = useNavigate();

    return (
        <div
            className="wishlist-card"
            onClick={() => {
                navigate(`/reservations`);
            }}
        >
            <div className="wishlist-card__paper">
                <h4>Планер</h4>
            </div>
        </div>
    )
}

export function ReservationWidget() {
    const reservations = useGetReservations({}).data;

    return (
        <div style={{ width: '20%', margin: '40px auto' }}>
            <h2>Планер</h2>
            {
                reservations
                    ? reservations.length > 0
                        ? reservations.map(reservation =>
                            <ReservationLine
                                key={`${reservation.userId}+${reservation.giftId}`}
                                reservation={reservation} />)
                        : <p>Нет зарезервированных Вами подарков.</p>
                    : <p>Загрузка...</p>
            }
        </div>
    )
}

function ReservationLine({ reservation }: { reservation: Reservation }) {
    const gift = useGetGift(reservation.giftId).data;
    const user = useGetUserInfo(gift ? gift.userId : '').data;

    return (
        <div
            style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                border: '1px solid #000',
                borderRadius: '20px',
                padding: '10px 20px'
            }}>
            <div>
                <Link to={`/${gift?.userId}/${gift?.wishlistId}/${gift?.id}`}>{gift ? gift.title : 'Подарок'}</Link>
                {' для '}
                <Link to={`/${user?.id}`}>{user ? user.login : 'друга'}</Link>
            </div>
            {
                gift
                    ? <RemoveReservationButton gift={gift} />
                    : null
            }
        </div>
    )
}