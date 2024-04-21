import AddIcon from '@mui/icons-material/Add';

import { Wishlist } from "../wishlist.dto";
import './Wishlist.css';

export function WishlistPreview({ wishlist }: { wishlist: Wishlist }) {
    return (
        <div className="wishlist-card">
            <div className="wishlist-card__paper">
                <h4>{wishlist.title}</h4>
            </div>
        </div>
    )
}

export function CreateWishlistButton() {
    return (
        <div className="wishlist-card">
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