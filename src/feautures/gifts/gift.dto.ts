
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

export interface GuestReservation {
    giftId: string,
    guestId: string,
    guestName: string
}

export const CURRENCIES = [
    'RUB', 'USD', 'EUR', 'BYN',

    'AUD', 'AZN', 'AMD', 'BGN', 'BRL', 'HUF', 'KRW', 'VND', 'HKD', 
    'GEL', 'DKK', 'AED', 'EGP', 'INR', 'IDR', 'KZT', 'CAD', 'QAR',
    'KGS', 'CNY', 'MDL', 'NZD', 'TMT', 'NOK', 'PLN', 'RON', 'XDR', 
    'RSD', 'SGD', 'TJS', 'THB', 'TRY', 'UZS', 'UAH', 'GBP', 'CZK', 
    'SEK', 'CHF', 'ZAR', 'JPY', 
];