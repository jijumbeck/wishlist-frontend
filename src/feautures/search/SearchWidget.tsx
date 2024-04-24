import { TextField } from "@mui/material";
import { useState } from "react";
import { useGetPublicWishlists } from "../wishlists/wishlistAPI";
import { WishlistPreview } from "../wishlists/ui/WishlistPreview";

export function SearchWidget() {
    const [input, setInput] = useState('');
    const wishlists = useGetPublicWishlists(input.toLowerCase()).data;

    if (!wishlists) {
        return (<p>Загрузка...</p>)
    }

    return (
        <div
            style={{
                width: '50%',
                display: 'flex',
                flexDirection: 'column',
                margin: '40px auto'
            }}>

            <TextField
                variant='standard'
                fullWidth
                inputProps={{
                    style: {
                        fontSize: '46px'
                    }
                }}
                sx={{
                    fontSize: '46px'
                }}

                value={input}
                onChange={e => setInput(e.target.value)}
            />

            <div
                style={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    gap: '35px',
                    alignItems: 'center',
                    justifyContent: 'center'
                }}
            >
                {input}
                {
                    wishlists && wishlists.length > 0
                        ? wishlists.map(wishlist => <WishlistPreview key={wishlist.id} wishlist={wishlist} />)
                        : <p>Нет публичных вишлистов.</p>
                }
            </div>
        </div>
    )
}
