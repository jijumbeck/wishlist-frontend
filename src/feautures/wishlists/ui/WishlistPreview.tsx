import AddIcon from '@mui/icons-material/Add';

import { Wishlist } from "../wishlist.dto";
import './Wishlist.css';
import { useNavigate } from 'react-router-dom';
import { useCreateWishlist } from '../wishlistAPI';

export function WishlistPreview({ wishlist }: { wishlist: Wishlist }) {
    const navigate = useNavigate();

    return (
        <div
            className="wishlist-card"
            onClick={() => { navigate(`/${wishlist.creatorId}/${wishlist.id}`) }}
        >
            <div className="wishlist-card__paper">
                <h4>{wishlist.title}</h4>
            </div>
        </div>
    )
}

export function CreateWishlistButton() {
    const [createWishlist, metadata] = useCreateWishlist();

    return (
        <div
            className="wishlist-card"
            onClick={() => (createWishlist())}
        >
            <div className="wishlist-card__paper">
                <AddIcon
                    sx={{
                        fontSize: '54px',
                        alignSelf: 'center',
                        color: '#fff',
                        margin: 'auto 0'
                    }}
                />
            </div>
        </div>
    )
}