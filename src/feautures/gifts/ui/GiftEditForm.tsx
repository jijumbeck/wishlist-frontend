import { Button, IconButton, TextField } from "@mui/material";
import { Gift } from "../gift.dto";
import { useEffect, useId, useReducer, useRef, useState } from "react";
import { LoadingButton } from "@mui/lab";
import { useChangeGift, useDeleteGift, useUploadGiftImage } from "../giftAPI";
import { useNavigate } from "react-router-dom";
import AddIcon from '@mui/icons-material/Add';
import { ref } from "yup";
import { IMAGE_API } from "../../../shared/api";
import CheckIcon from '@mui/icons-material/Check';



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



export function EditGiftImage({ gift }: { gift: Gift }) {
    const imageRef = useRef<HTMLImageElement>(null);
    const [imgSrc, setImgSrc] = useState(gift.imageURL ? `${IMAGE_API}/${gift.imageURL}` : '');
    const [file, setFile] = useState<File | null>(null);

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
                />
            </label>
        </form>
    )
}