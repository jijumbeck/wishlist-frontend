
export interface Gift {
    id: string;
    title: string;
    URL?: string;
    imageURL?: string;
    price?: number;
    description?: string;

    userId: string;
    wishlistId: string;
}