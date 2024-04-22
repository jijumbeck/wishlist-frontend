import { useLoaderData } from "react-router-dom";



export async function wishlstIdLoader({ params }: { params: any }) {
    const wishlistId = params?.wishlistId;
    return wishlistId;
}

export function WishlistWidget() {
    const wishlistId = useLoaderData() as string;

    return (
        <div>
            Wishlist {wishlistId}
        </div>
    )
}