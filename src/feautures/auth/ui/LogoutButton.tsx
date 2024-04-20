import { IconButton } from "@mui/material";
import LogoutIcon from '@mui/icons-material/Logout';
import { useAppDispatch } from "../../../app/store";
import { logout } from "../auth.slice";

export function LogoutButton() {
    const dispatch = useAppDispatch()

    return (
        <IconButton
            onClick={() => dispatch(logout())}
        >
            <LogoutIcon />
        </IconButton>
    )
}