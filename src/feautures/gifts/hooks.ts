import { useEffect } from "react";
import { useUpdateReservations } from "./reservationAPI";
import { useAppSelector } from "../../app/store";

export function useUpdateGuestReservations() {
    const [updateReservations] = useUpdateReservations();
    const isAuth = useAppSelector(state => state.auth.isAuth);

    useEffect(() => {
        if (localStorage.getItem('guestId') && isAuth) {
            updateReservations(localStorage.getItem('guestId') ?? '');
        }
    }, [isAuth]);
}