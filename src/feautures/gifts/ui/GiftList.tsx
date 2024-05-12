import { useLoaderData } from "react-router-dom";
import { useGetWishlistInfo, useGetWishlistsGifts } from "../../wishlists/wishlistAPI";
import { CreateGiftButton, GiftPreview, GiftPreviewForFriend } from "./GiftPreview";
import { useContext } from "react";
import { UserRelationStatus } from "../../profile/ui/ProfileWidget";
import { useAddGiftRights } from "../useAddGiftRight";
import { Wishlist, WishlistAccessType } from "../../wishlists/wishlist.dto";
import { UserRelationStatusContext } from "../../profile/helpers/useUserRelation";
import { Gift } from "../gift.dto";
import { CopyWishlistButton } from "./CopyGiftsButton";


export function GiftList({ wishlist }: { wishlist: Wishlist }) {
    const wishlistId = useLoaderData() as string;
    const gifts = useGetWishlistsGifts(wishlistId).data;

    const hasRights = useAddGiftRights(wishlist);
    const relationStatus = useContext(UserRelationStatusContext);


    return (
        <>
            <CopyWishlistButton gifts={gifts ?? []} />
            <div
                style={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    gap: '35px',
                    alignItems: 'center',
                    justifyContent: 'center',
                    margin: '30px 0 0 0'
                }}
            >
                {wishlist && hasRights ? <CreateGiftButton wishlist={wishlist} /> : null}

                {
                    relationStatus === UserRelationStatus.Friend && wishlist.wishlistAccess === WishlistAccessType.ForFriends
                        ? (gifts && gifts.length > 0
                            ? gifts.map(gift => <GiftPreviewForFriend key={gift.id} gift={gift} />)
                            : <p>Подарков нет.</p>)
                        : (gifts && gifts.length > 0
                            ? gifts.map(gift => <GiftPreview key={gift.id} gift={gift} />)
                            : <p>Подарков нет.</p>)
                }
            </div>

        </>
    )
}

export function GiftListForFriends({ gifts }: { gifts: Gift[] }) {
    return (
        <>
            {

            }
        </>
    )
}