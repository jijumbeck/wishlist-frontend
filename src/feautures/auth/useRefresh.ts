import { useEffect } from "react";
import { useAppDispatch } from "../../app/store";
import { checkAuth } from "./auth.slice";


export function useRefresh() {
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(checkAuth());
    }, [dispatch]);
}