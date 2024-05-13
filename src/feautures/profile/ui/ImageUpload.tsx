import { useEffect, useId, useRef, useState } from "react";
import { IMAGE_API } from "../../../shared/api";
import { IconButton } from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import { UserInfo } from "../profile.dto";
import { useUploadUserImage } from "../profileAPI";
import CheckIcon from '@mui/icons-material/Check';



export function ImageUpload({ imageURL }: { imageURL?: string }) {
    const imageRef = useRef<HTMLImageElement>(null);
    const [imgSrc, setImgSrc] = useState(imageURL && imageURL[0] === '/' ? `${IMAGE_API}/${imageURL}` : imageURL ?? '');
    const [file, setFile] = useState<File | null>(null);
    const [uploadImage] = useUploadUserImage();
    usePasteImage({ setFile });

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
        setImgSrc(imageURL ?? '');
    }, [imageURL]);


    useEffect(() => {
        if (file) {
            const formData = new FormData();
            formData.append('userImage', file);
            uploadImage(formData);
        }
    }, [imgSrc]);

    return (
        <div
            style={{
                height: '100%',
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
                <UploadImageFromFSButton
                    setFile={setFile}
                />
            </div>
            {
                file || imgSrc
                    ? (<img
                        src={imgSrc}
                        ref={imageRef}
                        style={{
                            width: '100%',
                            height: '100%',
                            objectFit: 'cover'
                        }}
                    />)
                    : (
                        <div
                            style={{
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                                justifyContent: 'center',
                                height: '100%'
                            }}
                        >
                            <p>CTRL + V</p>
                            <p>или</p>
                            <p>Нажми на кнопку</p>
                        </div>
                    )
            }

        </div>
    )
}

export function UploadImageFromFSButton(props: {
    setFile: (a: File | null) => void
}) {
    const id = useId();
    const inputRef = useRef<HTMLInputElement>(null);

    return (
        <form
            style={{
                height: '100%',
                width: '100%'
            }}

            onSubmit={(e) => e.preventDefault()}
        >
            <button
                style={{
                    backgroundColor: 'transparent',
                    border: '0px',
                    height: '100%',
                    width: '100%',
                    cursor: 'pointer'
                }}
                onClick={() => {
                    if (inputRef) {
                        inputRef.current?.click();
                    }
                }}
            >
            </button>
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

export function UploadImageButton({ file }: { file: File }) {
    const [uploadImage, metadata] = useUploadUserImage();

    function handleClick() {
        const formData = new FormData();
        formData.append('userImage', file);
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