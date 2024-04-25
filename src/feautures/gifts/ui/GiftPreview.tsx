import { useNavigate } from "react-router-dom";
import { Gift } from "../gift.dto";
import './Gift.css';

import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import { useAddGift } from "../../wishlists/wishlistAPI";
import { Wishlist } from "../../wishlists/wishlist.dto";
import { IconButton } from "@mui/material";
import { useGetReservations, useReserveGift } from "../reservationAPI";


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

            <div style={{ display: 'flex', alignItems: 'center', justifyContent:'center'}}>
                <ReservationButton gift={gift} />
                <ReservationCount gift={gift} />
            </div>
        </div>

    )
}

export function ReservationCount({ gift }: { gift: Gift }) {
    const reservations = useGetReservations(gift.id).data;

    return (
        <div>
            Подарят: {reservations ? reservations.length : 0}
        </div>
    )
}

export function ReservationButton({ gift }: { gift: Gift }) {
    const [reserveGift, metadata] = useReserveGift();

    return (
        <IconButton
            onClick={() => reserveGift(gift.id)}
        >
            <AddCircleOutlineIcon />
        </IconButton>
    )
}