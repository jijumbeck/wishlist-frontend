import { useNavigate } from "react-router-dom";
import { Gift } from "../gift.dto";
import './Gift.css';

import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import { useAddGift } from "../../wishlists/wishlistAPI";
import { Wishlist } from "../../wishlists/wishlist.dto";


export function GiftPreview({ gift }: { gift: Gift }) {
    const navigate = useNavigate();

    return (
        <div
            className="gift-card"
            onClick={() => {
                navigate(`/${gift.userId}/${gift.wishlistId}/${gift.id}`)
            }}
        >
            <div className="gift-image shadow">
            </div>
            {gift.title}
        </div>
    )
}

export function CreateGiftButton({ wishlist }: { wishlist: Wishlist }) {
    const [addGift, metadata] = useAddGift();

    return (
        <div
            className="gift-card"
            onClick={() => addGift(wishlist.id)}
        >
            <div className="gift-image shadow">
            </div>
            Добавить подарок
        </div>
    )
}