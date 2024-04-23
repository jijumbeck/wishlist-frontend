import { Button, TextField } from "@mui/material";
import { Gift } from "../gift.dto";
import { useEffect, useReducer, useState } from "react";
import { LoadingButton } from "@mui/lab";
import { useChangeGift, useDeleteGift } from "../giftAPI";
import { useNavigate } from "react-router-dom";

export function EditGiftForm({ gift }: { gift: Gift }) {
    const [url, setUrl] = useState(gift.URL ?? '');
    const [description, setDescription] = useState(gift.description ?? '');

    const [price, setPrice] = useState(gift.price ?? 0);
    const [priceError, setPriceError] = useState('');
    const handleNewPrice = (newPrice: string) => {
        try {
            const price = Number(newPrice);
            if (price >= 0) {
                return true;
            }
        } catch (e) {
            console.log(e);
        }
        return false;
    }

    const [changeGiftInfo, metadata] = useChangeGift();

    const [deleteGift, metadataForDelete] = useDeleteGift();
    const navigate = useNavigate();


    return (
        <form
            onSubmit={(e) => {
                e.preventDefault();
                changeGiftInfo({ ...gift, URL: url, price, description })
            }}
            style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'flex-start',
                width: '50%'
            }}
        >
            <TextField
                id="url"
                name="url"
                label="URL"
                placeholder="Ссылка на подарок"
                value={url}
                onChange={e => setUrl(e.target.value)}
                fullWidth
                margin="normal"
            />

            <TextField
                id='price'
                name='price'
                label='Цена'
                type='number'
                value={price}
                onChange={e => {
                    if (handleNewPrice(e.target.value)) {
                        setPrice(Number(e.target.value));
                    }
                }}
                fullWidth
                margin="normal"
            />

            <TextField
                id="description"
                name="description"
                label="Описание"
                placeholder="Описание"
                multiline
                maxRows={5}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                fullWidth
                margin="normal"
            />

            {
                (!gift.URL && !url || gift.URL === url) &&
                    (!gift.price && !price || gift.price === price) &&
                    (!gift.description && !description || gift.description === description)

                    ? null
                    : <LoadingButton
                        type='submit'
                        loading={metadata.isLoading}

                    >
                        Сохранить
                    </LoadingButton>

            }

            <Button
                variant='outlined'
                color='error'
                onClick={async () => {
                    const result = await deleteGift(gift.id);
                    navigate(`/${gift.userId}/${gift.wishlistId}`);
                    if (metadata.isSuccess) {
                        console.log('hete');
                    }
                }}
                sx={{
                    alignSelf: 'flex-end'
                }}
            >
                Удалить
            </Button>
        </form>
    )
}