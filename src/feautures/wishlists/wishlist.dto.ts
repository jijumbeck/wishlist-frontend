
export const enum WishlistAccessType {
    Private = "PRIVATE",
    ForFriends = "FOR_FRIENDS",
    Public = "PUBLIC",
    Custom = "CUSTOM"
}

export const enum WishlistType {
    Default = "WISHLIST",
    Antiwishlist = "ANTIWISHLIST",
    Planner = "PLANNER"
}

export interface Wishlist {
    id: string;
    creatorId: string;
    title: string;
    wishlistType: WishlistType;
    wishlistAccess: WishlistAccessType;
}