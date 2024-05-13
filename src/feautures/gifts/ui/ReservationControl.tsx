import { Accordion, AccordionSummary, AccordionDetails, TextField, Button } from "@mui/material";
import { useAppSelector } from "../../../app/store";
import { Gift, GuestReservation, Reservation } from "../gift.dto";
import { useGetGiftReservations, useRemoveReservation, useReserveGift } from "../reservationAPI";
import { RemoveReservationButton, AddReservationButton } from "./GiftPreview";
import { useGetUserInfo } from "../../profile/profileAPI";
import { Link } from "react-router-dom";
import { useState } from "react";
import { LoadingButton } from "@mui/lab";


export function ReservationGiftWidget({ gift }: { gift: Gift }) {
    const reservations = useGetGiftReservations(gift.id).data;
    const isAuth = useAppSelector(state => state.auth.isAuth);

    if (!reservations) {
        return (<p>Загрузка...</p>)
    }

    return (
        <div style={{ width: '100%' }}>
            <hr style={{ margin: '20px 0' }} />
            {
                isAuth
                    ? null
                    : <GuestReservationInput gift={gift} reservations={reservations} />
            }
            <div
                style={{ display: 'flex' }}
            >
                {
                    isAuth
                        ? (reservations.findIndex(reservation => reservation.giftId === gift.id) >= 0
                            ? <RemoveReservationButton gift={gift} />
                            : <AddReservationButton gift={gift} />)
                        : null
                }
                <p>
                    Подарят: {reservations ? reservations.length : 0}
                </p>
            </div>
            <div>
                <ReservationUserList reservations={reservations} />
            </div>
        </div>
    )
}


const GUEST_ID_LOCAL_STORAGE_KEY = 'guestId';

function GuestReservationInput({ gift, reservations }: { gift: Gift, reservations: Array<Reservation | GuestReservation> }) {
    const guestId = localStorage.getItem(GUEST_ID_LOCAL_STORAGE_KEY) ?? undefined;
    const guestReservation = reservations.find(reservation => 'guestId' in reservation && reservation.guestId === guestId);

    if (guestReservation) {
        return (<RemoveReservation gift={gift} guestId={guestId} />)
    }

    return (<ReserveByGuest gift={gift} />)
}


function ReserveByGuest({ gift }: { gift: Gift }) {
    const [reserveGift, metadata] = useReserveGift();
    const [guestName, setGuestName] = useState('');
    const guestId = localStorage.getItem(GUEST_ID_LOCAL_STORAGE_KEY) ?? undefined;

    return (
        <>
            <p>
                Зарезервируйте подарок, чтобы остальные друзья узнали, что этот подарок уже подарят.
            </p>
            <div
                style={{ display: 'flex' }}
            >
                <TextField
                    value={guestName}
                    onChange={e => setGuestName(e.target.value)}
                    required
                    label="Ваше имя"
                    size='small'

                    InputProps={{
                        sx: {
                            borderRadius: '10px 0 0 10px'
                        }
                    }}
                />
                <LoadingButton
                    variant='contained'
                    sx={{
                        borderRadius: '0 10px 10px 0'
                    }}
                    onClick={async () => {
                        const response = await reserveGift({ giftId: gift.id, guest: { guestName: guestName, guestId } });
                        if ('data' in response) {
                            console.log(response.data);
                            localStorage.setItem(GUEST_ID_LOCAL_STORAGE_KEY, response.data.guestId);
                        }
                        setGuestName('');
                    }}
                    loading={metadata.isLoading}
                >
                    Зарезервировать
                </LoadingButton>
            </div>
        </>
    )
}

function RemoveReservation({ gift, guestId }: { gift: Gift, guestId?: string }) {
    const [removeReservation, metadata] = useRemoveReservation();

    return (
        <LoadingButton
            variant="outlined"
            loading={metadata.isLoading}
            onClick={() => removeReservation({ giftId: gift.id, guestId })}
        >
            Отменить резервирование
        </LoadingButton>
    )
}

function ReservationUserList({ reservations }: { reservations: Array<Reservation | GuestReservation> }) {
    return (
        <ul
            style={{ margin: '10px 0', textAlign: 'start' }}
        >
            {
                reservations.map(reservation => {
                    return 'userId' in reservation
                        ? <ReservationLine reservation={reservation} />
                        : <li>{reservation.guestName}</li>
                })
            }
        </ul>
    )
}

function ReservationLine({ reservation }: { reservation: Reservation }) {
    const user = useGetUserInfo(reservation.userId).data;

    if (!user) {
        return (<p>Загрузка...</p>);
    }

    return (
        <li>
            <Link to={`/${reservation.userId}`}>{user.login}</Link>
        </li>
    )
}

function GuestReservationLine({ reservation }: { reservation: GuestReservation }) {
    return (
        <div
            style={{
                flex: 'display'
            }}
        >
            <p>{reservation.guestName}</p>
        </div>
    )
}

function AuthReservation({ gift }: { gift: Gift }) {

    return (
        <Accordion>
            <AccordionSummary>

            </AccordionSummary>
            <AccordionDetails>

            </AccordionDetails>
        </Accordion>
    )
}

