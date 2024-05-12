import { useEffect, useId, useReducer, useRef, useState } from "react";
import { Button, IconButton, MenuItem, Select, TextField } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import AddIcon from '@mui/icons-material/Add';
import CheckIcon from '@mui/icons-material/Check';
import { Link, useNavigate } from "react-router-dom";

import { CURRENCIES, Gift, giftExample } from "../gift.dto";
import { useChangeGift, useDeleteGift, useGetUrlGift, useUploadGiftImage } from "../giftAPI";
import { IMAGE_API } from "../../../shared/api";
import { AddGift } from "./AddGift";


// Widget for editing gift.

export function EditGift({ gift }: { gift: Gift }) {
    const [giftState, dispatch] = useReducer(function (state: Gift, action: Partial<Gift>) {
        return {
            ...state,
            ...action,
            id: state.id
        } as Gift
    }, gift);

    const [urlGift, setGiftInfoByUrl] = useState<Partial<Gift>>({});


    return (
        <>
            <div
                style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '20px'
                }}
            >
                <div style={{ marginRight: 'auto' }}>
                    <EditGift.Title gift={giftState} setTitle={(newTitle) => dispatch({ title: newTitle })} />
                </div>
                <DeleteGiftButton gift={gift} />
                <SaveChangesButton gift={gift} newGiftInfo={giftState} />
            </div>
            <div
                style={{
                    display: 'flex',
                    gap: '20px',
                    margin: '40px'
                }}>

                <EditGiftImage gift={giftState} />

                <div
                    style={{
                        display: 'flex',
                        flexDirection: 'column',
                        width: '50%',
                        gap: '10px'
                    }}>

                    <GiftURL gift={giftState} setUrl={(url) => dispatch({ URL: url })} urlGift={urlGift} setUrlGift={setGiftInfoByUrl} dispatch={dispatch} />
                    <EditGiftForm gift={giftState} dispatch={dispatch} />
                    <AddGift gift={gift} />
                </div>
            </div>
        </>
    )
}


// Form for editing gift fields.

export function EditGiftForm({ gift, dispatch }: { gift: Gift, dispatch: (params: Partial<Gift>) => any }) {

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

    return (
        <>
            <div style={{ display: 'flex', borderRadius: '30px' }}>
                <TextField
                    id='price'
                    name='price'
                    label='Цена'
                    type='number'
                    value={gift.price}
                    onChange={e => {
                        if (handleNewPrice(e.target.value)) {
                            dispatch({ price: Number(e.target.value) })
                        }
                    }}
                    fullWidth
                    InputProps={{
                        sx: { borderRadius: '10px 0 0 10px' }
                    }}
                    InputLabelProps={{ shrink: true }}
                />
                <Select
                    variant="outlined"
                    sx={{
                        borderRadius: '0px 10px 10px 0'
                    }}
                    autoWidth
                    MenuProps={{
                        sx: {
                            height: '300px',
                            width: '200px'
                        }
                    }}

                    value={gift.currency}
                    onChange={(e, child) => dispatch({ currency: e.target.value as string})}
                >
                    {
                        CURRENCIES.map(currency =>
                            (<MenuItem key={currency} value={currency}>{currency}</MenuItem>)
                        )
                    }
                </Select>
            </div>


            <TextField
                id="description"
                name="description"
                label="Описание"
                placeholder="Описание"
                multiline
                maxRows={3}
                value={gift.description}
                onChange={(e) => dispatch({ description: e.target.value })}
                fullWidth
                InputProps={{
                    sx: { borderRadius: '10px' }
                }}
                InputLabelProps={{ shrink: true }}
            />
        </>
    )
}


// Editing gift image.

export function EditGiftImage({ gift }: { gift: Gift }) {
    const imageRef = useRef<HTMLImageElement>(null);
    const [imgSrc, setImgSrc] = useState(gift.imageURL && gift.imageURL.includes('giftImage') ? `${IMAGE_API}/${gift.imageURL}` : gift.imageURL ?? '');
    const [file, setFile] = useState<File | null>(null);
    usePasteImage({ setFile });

    console.log(gift.imageURL, imgSrc);

    useEffect(() => {
        if (imageRef.current && file) {
            console.log(file);
            const fileReader = new FileReader();
            const url = fileReader.readAsDataURL(file);

            fileReader.onloadend = function (e) {
                console.log(e);
                setImgSrc(fileReader.result ? fileReader.result.toString() : '');
            }
        }
    }, [file]);

    useEffect(() => {
        setImgSrc(gift.imageURL ?? '');
    }, [gift.imageURL]);

    return (
        <div
            className="gift-page__image"
            style={{
                position: 'relative'
            }}
        >
            <div
                style={{
                    position: 'absolute',
                    display: 'flex',
                    alignItems: 'flex-end',
                    justifyContent: 'end',
                    gap: '20px',
                    height: '100%',
                    width: '100%',
                    padding: '10px'
                }}
            >
                <EditGiftImageButton
                    setFile={setFile}
                />
                {
                    file ? <SaveImageButton gift={gift} file={file} /> : null
                }
            </div>
            {
                file || imgSrc
                    ? (<img
                        src={imgSrc}
                        ref={imageRef}
                        alt="Изображение подарка"
                        style={{
                            width: '100%',
                            height: '100%',
                            objectFit: 'cover'
                        }}
                    />)
                    : (
                        <div>
                            <p>CTRL + V</p>
                            <p>или</p>
                            <p>Перетащи сюда</p>
                            <p>или</p>
                            <p>Нажми на плюс</p>
                        </div>
                    )
            }

        </div>
    )
}

function SaveImageButton({ gift, file }: { gift: Gift, file: File }) {
    const [uploadImage, metadata] = useUploadGiftImage();

    function handleClick() {
        const formData = new FormData();
        formData.append('giftId', gift.id);
        formData.append('giftImage', file);
        uploadImage(formData);
    }

    return (
        <IconButton
            style={{
                backgroundColor: '#fff',
            }}
            onClick={handleClick}
        >
            <CheckIcon />
        </IconButton>
    )
}

function EditGiftImageButton(props: {
    setFile: (a: File | null) => void
}) {
    const id = useId();
    const inputRef = useRef<HTMLInputElement>(null);

    return (
        <form>
            <IconButton
                style={{
                    backgroundColor: '#fff',
                }}
                onClick={() => {
                    if (inputRef) {
                        inputRef.current?.click();
                    }
                }}
                onKeyDown={e => {
                    console.log(e.key);
                }}
            >
                <AddIcon />
            </IconButton>
            <label htmlFor={id}>
                <input
                    id={id}
                    ref={inputRef}
                    style={{
                        display: 'none'
                    }}
                    type="file"
                    accept="image/png, image/jpeg"
                    onChange={e => {
                        props.setFile(e.target.files?.[0] ? e.target.files?.[0] : null);
                    }}
                    onPaste={e => console.log('onPaste')}
                />
            </label>
        </form>
    )
}

function usePasteImage(props: {
    setFile: (a: File | null) => void
}) {
    useEffect(() => {
        const handlePaste = (e: ClipboardEvent) => {
            const items = e.clipboardData?.items;

            if (items) {
                for (let i = 0; i < items.length; i++) {
                    if (items[i].type.indexOf("image") === 0) {
                        props.setFile(items[i].getAsFile());
                        return;
                    }
                }
            }
        }

        document.addEventListener('paste', handlePaste);
        return () => document.removeEventListener('paste', handlePaste);
    }, []);
}


// Gift Title.

EditGift.Title = ({ gift, setTitle }: { gift: Gift, setTitle: (newTitle: string) => any }) => {
    return (
        <div style={{ fontSize: '32px', textAlign: 'start' }}>
            <Link to={`/${gift.userId}/${gift.wishlistId}`}>...</Link>
            {' / '}
            <TextField
                variant="standard"
                value={gift.title}
                onChange={e => setTitle(e.target.value)}
                inputProps={{
                    style: { fontSize: '32px', width: 'auto' }
                }}
                sx={{
                    width: 'auto'
                }}
            />
        </div>
    )
}

// Gift URL.

function GiftURL({
    gift, setUrl, urlGift, setUrlGift, dispatch
}: {
    gift: Gift,
    setUrl: (url: string) => any,
    urlGift: Partial<Gift>,
    setUrlGift: (gift: Partial<Gift>) => any,
    dispatch: (params: Partial<Gift>) => any
}) {

    const [getUrlGift, metadata] = useGetUrlGift();

    const URLButton = Object.keys(urlGift).length
        ? (<Button
            variant='contained'
            onClick={() => setUrlGift({})}
            sx={{
                borderRadius: '0px 10px 10px 0px'
            }}
        >
            Убрать
        </Button>)
        : (<LoadingButton
            variant='contained'
            loading={metadata.isLoading}
            onClick={async () => {
                try {
                    if (gift.URL) {
                        const url = new URL(gift.URL);
                        console.log(url.href);
                        const response = await getUrlGift(url.href);
                        console.log(response);
                        if ('data' in response) {
                            dispatch(response.data);
                            setUrlGift(response.data);
                        }
                    }
                } catch (e) {

                }
            }}
            sx={{
                borderRadius: '0px 10px 10px 0px'
            }}
        >
            Заполнить
        </LoadingButton>)

    return (
        <div style={{ display: 'flex', borderRadius: '30px' }}>
            <TextField
                id="url"
                name="url"
                label="URL"
                placeholder="Ссылка на подарок"
                value={gift.URL}
                onChange={e => setUrl(e.target.value)}
                fullWidth

                InputProps={{
                    endAdornment: <IconButton></IconButton>,
                    sx: {
                        borderRadius: '10px 0px 0px 10px'
                    }
                }}
            />

            {
                URLButton
            }
        </div>
    )
}


// Gift Managing Buttons.

function DeleteGiftButton({ gift }: { gift: Gift }) {
    const [deleteGift, metadata] = useDeleteGift();
    const navigate = useNavigate();

    return (
        <LoadingButton
            variant='outlined'
            color='error'
            loading={metadata.isLoading}
            onClick={async () => {
                const result = await deleteGift(gift);
                if ("data" in result) {
                    navigate(`/${gift.userId}/${gift.wishlistId}`);
                }
            }}
        >
            Удалить
        </LoadingButton>
    )
}

function SaveChangesButton({ gift, newGiftInfo }: { gift: Gift, newGiftInfo: Gift }) {
    const [changeGiftInfo, metadata] = useChangeGift();

    const areEqual = Object.keys(giftExample).reduce((accumulator, current) => accumulator && gift[current as keyof Gift] === newGiftInfo[current as keyof Gift], true);

    return (
        <LoadingButton
            color='primary'
            variant="outlined"
            disabled={areEqual}
            loading={metadata.isLoading}

            onClick={async () => {
                if (!areEqual) {
                    await changeGiftInfo(newGiftInfo);
                }
            }}
        >
            {
                areEqual
                    ? 'Сохранено'
                    : 'Сохранить'
            }
        </LoadingButton>
    )
}
