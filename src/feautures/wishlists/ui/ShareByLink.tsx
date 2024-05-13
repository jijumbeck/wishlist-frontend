import { Wishlist, WishlistAccessType } from "../wishlist.dto";
import { useUpdateWishlist } from "../wishlistAPI";
import { Checkbox, IconButton } from "@mui/material";
import LinkIcon from '@mui/icons-material/Link';
import { useEffect, useState } from "react";


export function ShareByLink({ wishlist }: { wishlist: Wishlist }) {
    const [checked, setChecked] = useState(wishlist.hasAccessByLink);
    const [updateWishlistInfo, metadata] = useUpdateWishlist();

    const handleCopy = () => {
        navigator.clipboard.writeText(`http://localhost:3000/wishlist-by-link/${wishlist.id}`);
    }

    useEffect(() => {
        updateWishlistInfo({ ...wishlist, hasAccessByLink: checked })
    }, [checked]);

    if (wishlist.wishlistAccess === WishlistAccessType.Private || wishlist.wishlistAccess === WishlistAccessType.Public) {
        return null;
    }

    return (
        <div
            style={{
                display: 'flex',
                alignItems: 'center',
                alignSelf: 'flex-end',
                borderRadius: '15px',
                padding: '0 20px',
                margin: '10px 0',
                backgroundColor: 'rgba(68, 68, 68, 0.26)',
                gap: '10px'
            }}
        >
            <p>
                {
                    wishlist.hasAccessByLink
                        ? 'Вишлист доступен по ссылке.'
                        : 'Вишлист недоступен по ссылке.'
                }
            </p>
            {
                wishlist.hasAccessByLink
                    ? (<IconButton
                        onClick={handleCopy}
                    >
                        <LinkIcon />
                    </IconButton>)
                    : null
            }
            <Checkbox
                checked={checked}
                onChange={(e) => setChecked(e.target.checked)}
            />
        </div >
    )
}