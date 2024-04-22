import { Link, useLoaderData } from "react-router-dom";
import { Gift } from "../gift.dto";
import { useGetGift } from "../giftAPI";
import { Button } from "@mui/material";

export function giftIdLoader({ params }: { params: any }) {
    const giftId = params.giftId;
    return giftId;
}

export function GiftWidget() {
    const giftId = useLoaderData() as string;
    const gift = useGetGift(giftId).data;

    if (!gift) {
        return (<p>Загрузка...</p>)
    }

    return (
        <div>
            <GiftTitle gift={gift} />
            <p>Описание: {gift.description}</p>
            {gift.URL ? <a href={gift.URL}>Ссылка на подарок</a> : null}
            {gift.price ? <p>Цена: {gift.price}</p> : null}
            <Button>Зарезервировать</Button>
            <Button>Добавить в вишлист</Button>
        </div>
    )
}

export function GiftTitle({ gift }: { gift: Gift }) {
    return (
        <div style={{ fontSize: '32px', textAlign: 'start' }}>
            <Link to={`/${gift.userId}/${gift.wishlistId}`}>...</Link>
            {' / '}
            {/* <TextField
                variant="standard"
                value={title}
                onChange={e => setTitle(e.target.value)}
                inputProps={{
                    style: { fontSize: '32px', width: 'auto' }
                }}
                sx={{
                    width: 'auto'
                }}
            /> */}
            {gift.title}
        </div>
    )
}