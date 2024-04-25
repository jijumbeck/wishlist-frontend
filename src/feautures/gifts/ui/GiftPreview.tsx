import { useNavigate } from "react-router-dom";
import { Gift } from "../gift.dto";
import './Gift.css';

import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import { useAddGift } from "../../wishlists/wishlistAPI";
import { Wishlist } from "../../wishlists/wishlist.dto";
import { IconButton } from "@mui/material";
import { useGetGiftReservations, useGetReservations, useRemoveReservation, useReserveGift } from "../reservationAPI";


export function GiftPreview({ gift }: { gift: Gift }) {
    const navigate = useNavigate();

    return (
        <div
            className="gift-card"
            onClick={() => {
                navigate(`/${gift.userId}/${gift.wishlistId}/${gift.id}`)
            }}
        >
            <div className="gift-image shadow">
            </div>
            {gift.title}
        </div>
    )
}

export function CreateGiftButton({ wishlist }: { wishlist: Wishlist }) {
    const [addGift, metadata] = useAddGift();

    return (
        <div
            className="gift-card"
            onClick={() => addGift(wishlist.id)}
        >
            <div className="gift-image shadow">
            </div>
            Добавить подарок
        </div>
    )
}

export function GiftPreviewForFriend({ gift }: { gift: Gift }) {
    const navigate = useNavigate();

    return (
        <div style={{
            width: 'fit-content'
        }}>
            <div
                className="gift-card"
                onClick={() => {
                    navigate(`/${gift.userId}/${gift.wishlistId}/${gift.id}`)
                }}
            >
                <div className="gift-image shadow">
                </div>
                {gift.title}
            </div>

            <ReservationCardComponent gift={gift} />
        </div>

    )
}

export function ReservationCardComponent({ gift }: { gift: Gift }) {
    const reservations = useGetGiftReservations(gift.id).data;

    return (
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            {
                reservations && reservations.findIndex(reservation => reservation.giftId === gift.id) >= 0
                    ? <RemoveReservationButton gift={gift} />
                    : <AddReservationButton gift={gift} />
            }
            <p>
                Подарят: {reservations ? reservations.length : 0}
            </p>
        </div>
    )
}

export function AddReservationButton({ gift }: { gift: Gift }) {
    const [reserveGift, metadata] = useReserveGift();

    return (
        <IconButton
            onClick={() => reserveGift(gift.id)}
        >
            <AddCircleOutlineIcon />
        </IconButton>
    )
}

export function RemoveReservationButton({ gift }: { gift: Gift }) {
    const [removeReservation, metadata] = useRemoveReservation();

    return (
        <IconButton
            onClick={() => removeReservation(gift.id)}
        >
            <RemoveCircleOutlineIcon />
        </IconButton>
    )
}