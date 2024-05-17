import { createContext } from "react";
import { useGetProfileInfo } from "../profile/profileAPI";
import { useGetCoauthors } from "../wishlists/coauthoringAPI";
import { Wishlist } from "../wishlists/wishlist.dto";


export const coauthorContext = createContext(false);

export function useAddGiftRights(wishlist: Wishlist) {
    const coauthors = useGetCoauthors(wishlist.id).data;
    const user = useGetProfileInfo({}).data;

    if (user && coauthors) {
        if (wishlist.creatorId === user.id) {
            return 'creator';
        }

        if (coauthors.findIndex(coauthor => coauthor.id === user.id) >= 0) {
            return 'coauthor';
        }
    }

    return '';
}