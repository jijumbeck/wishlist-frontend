
export interface Gift {
    id: string;
    title: string;
    URL?: string;
    imageURL?: string;
    price?: number;
    currency?: string;
    description?: string;

    userId: string;
    wishlistId: string;
}

export const giftExample = {
    id: '1',
    title: '',
    URL: '',
    imageURL: '',
    price: 0,
    currency: '',
    description: '',

    userId: '',
    wishlistId: ''
}

export interface Reservation {
    userId: string;
    giftId: string;
}