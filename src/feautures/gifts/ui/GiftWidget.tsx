import { Link, useLoaderData } from "react-router-dom";
import { Gift } from "../gift.dto";
import { useChangeGift, useDeleteGift, useGetGift } from "../giftAPI";
import { TextField } from "@mui/material";
import { useContext, useReducer, useState } from "react";
import { UserRelationStatus } from "../../profile/ui/ProfileWidget";
import LoadingButton from "@mui/lab/LoadingButton";
import SendIcon from '@mui/icons-material/Send';
import { EditGift, EditGiftForm, EditGiftImage } from "./GiftEditForm";
import { AddGift } from "./AddGift";
import { ReservationCardComponent } from "./GiftPreview";
import { WithUserRelation } from "../../profile/helpers/WithUserRelation";
import { WishlistContext } from "../../wishlists/ui/WishlistWidget";
import { WishlistAccessType } from "../../wishlists/wishlist.dto";
import { useGetWishlistInfo } from "../../wishlists/wishlistAPI";
import { ReservationGiftWidget } from "./ReservationControl";


export function giftIdLoader({ params }: { params: any }) {
    const giftId = params.giftId;
    const wishlistId = params.wishlistId;
    return { giftId, wishlistId };
}

export function GiftWidget() {
    const { giftId, wishlistId } = useLoaderData() as { giftId: string, wishlistId: string };
    const gift = useGetGift(giftId).data;
    const wishlist = useGetWishlistInfo(wishlistId).data;

    if (!gift) {
        return (<p>Загрузка...</p>)
    }

    if (!wishlist) {
        return (<p>Загрузка...</p>)
    }

    return (
        <div className="gift-page">
            <WishlistContext.Provider value={wishlist}>
                <WithUserRelation
                    renderMe={() => <EditGift gift={gift} />}
                    renderFriend={() => <GiftCardPage gift={gift} />}
                    renderNone={() => <GiftCardPage gift={gift} />}
                />
            </WishlistContext.Provider>
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


export function GiftCardPage({ gift }: { gift: Gift }) {
    const wishlist = useContext(WishlistContext);

    return (
        <>
            <div style={{ fontSize: '32px', textAlign: 'start' }}>
                <Link to=".." relative="path">...</Link>
                {' / '}
                {gift.title}
            </div>

            <div style={{ display: 'flex', alignItems: 'flex-start', gap: '20px', margin: '40px' }}>
                <div
                    className="gift-page__image gift-card__image_default"
                >
                    <img
                        src={gift.imageURL ?? ''}
                        alt="Изображение подарка"
                        style={{
                            width: '100%',
                            height: '100%',
                            objectFit: 'cover'
                        }}
                    />
                </div>
                <div style={{ width: '50%', display: "flex", flexDirection: 'column', alignItems: 'flex-start', gap: '10px' }}>
                    <p>Описание: {gift.description}</p>
                    {gift.URL ? <a href={gift.URL}>Ссылка на подарок</a> : null}
                    {gift.price ? <p>Цена: {gift.price}</p> : null}
                    <AddGift gift={gift} />
                    {
                        wishlist?.wishlistAccess === WishlistAccessType.ForFriends || wishlist?.wishlistAccess === WishlistAccessType.Custom
                            ? (<>
                                <Propmts />
                                <ReservationGiftWidget gift={gift} />
                            </>)
                            : null
                    }
                </div>
            </div>
        </>
    )
}

function Propmts() {
    const prompts = ['Связано ли это с каким-то воспоминанием?', 'Может добавить вкусняшек?', 'Подпишите открытку!'];

    return (
        <div
            style={{
                display: 'flex',
                flexWrap: 'wrap',
                gap: '20px'
            }}
        >
            {
                prompts.map(text => (
                    <p
                        style={{
                            padding: '5px 5px',
                            margin: '0',
                            backgroundColor: '#c37ede',
                            borderRadius: '10px'
                        }}
                    >
                        {text}
                    </p>
                ))
            }
        </div>
    )
}