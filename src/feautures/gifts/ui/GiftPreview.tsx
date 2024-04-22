import { useNavigate } from "react-router-dom";
import { Gift } from "../gift.dto";
import './Gift.css';

export function GiftPreview({ gift }: { gift: Gift }) {
    const navigate = useNavigate();

    return (
        <div
            className="gift-card"
            onClick={() => {
                navigate(`/${gift.userId}/${gift.wishlistId}/${gift.id}`)
            }}
        >
            <img className="shadow" src='https://cdn-images.vetstreet.com/52/99/ca30e8b84b948d3b6ebdc7728a59/cat-next-to-christmas-present-istock-000029379338-medium-335lc113015jpg.jpg' />
            {gift.title}
        </div>
    )
}

export function CreateGiftButton() {
    return (
        <div
            className="gift-card"
        >
            <img className="shadow" src='https://clipart-library.com/new_gallery/295189_plus-icon-png.png' />
            <p>Новый подарок</p>
        </div>
    )
}