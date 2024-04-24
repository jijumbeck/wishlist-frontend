import { Link, useLoaderData } from "react-router-dom";
import { Gift } from "../gift.dto";
import { useChangeGift, useGetGift } from "../giftAPI";
import { Button, TextField } from "@mui/material";
import { useContext, useState } from "react";
import { UserRelationStatus, UserRelationStatusContext } from "../../profile/ui/ProfileWidget";
import LoadingButton from "@mui/lab/LoadingButton";
import SendIcon from '@mui/icons-material/Send';
import { EditGiftForm } from "./GiftEditForm";
import { useGetReservations } from "../reservationAPI";


export function giftIdLoader({ params }: { params: any }) {
    const giftId = params.giftId;
    return giftId;
}

export function GiftWidget() {
    const giftId = useLoaderData() as string;
    const gift = useGetGift(giftId).data;

    const relationStatus = useContext(UserRelationStatusContext);

    if (!gift) {
        return (<p>Загрузка...</p>)
    }

    return (
        <div className="gift-page">

            {
                relationStatus === UserRelationStatus.Me
                    ? <EditGiftWidget gift={gift} />
                    : <GiftCardPage gift={gift} />
            }
        </div>
    )
}

export function GiftTitle({ gift }: { gift: Gift }) {
    const [title, setTitle] = useState(gift.title);
    const [changeGiftInfo, metadata] = useChangeGift();

    return (
        <div style={{ fontSize: '32px', textAlign: 'start' }}>
            <Link to={`/${gift.userId}/${gift.wishlistId}`}>...</Link>
            {' / '}
            <TextField
                variant="standard"
                value={title}
                onChange={e => setTitle(e.target.value)}
                inputProps={{
                    style: { fontSize: '32px', width: 'auto' }
                }}
                sx={{
                    width: 'auto'
                }}
            />
            {
                title === gift.title
                    ? null
                    : (<LoadingButton
                        loading={metadata.isLoading}
                        onClick={() => {
                            changeGiftInfo({ ...gift, title: title })
                        }}
                    >
                        <SendIcon />
                    </LoadingButton>)
            }
        </div>
    )
}

function EditGiftWidget({ gift }: { gift: Gift }) {
    return (
        <>
            <GiftTitle gift={gift} />

            <div style={{ display: 'flex', gap: '20px', margin: '40px' }}>
                <div className="gift-image"></div>
                <EditGiftForm gift={gift} />
            </div>
        </>
    )
}

function GiftCardPage({ gift }: { gift: Gift }) {

    return (
        <>
            <div style={{ fontSize: '32px', textAlign: 'start' }}>
                <Link to={`/${gift.userId}/${gift.wishlistId}`}>...</Link>
                {' / '}
                {gift.title}
            </div>

            <div style={{ display: 'flex', alignItems: 'flex-start', gap: '20px', margin: '40px' }}>
                <div className="gift-image"></div>
                <div style={{ width: '50%', display: "flex", flexDirection: 'column', alignItems: 'flex-start' }}>
                    <p>Описание: {gift.description}</p>
                    {gift.URL ? <a href={gift.URL}>Ссылка на подарок</a> : null}
                    {gift.price ? <p>Цена: {gift.price}</p> : null}
                    <Button
                        variant="contained"
                    >
                        Зарезервировать
                    </Button>
                </div>
            </div>
        </>
    )
}

function ReserveButton({ gift }: { gift: Gift }) {
    const reservations = useGetReservations({}).data;

    //const isGiftReserved = reservations?.findIndex(reservation => reservation.giftId === gift.id) >= 0;
}