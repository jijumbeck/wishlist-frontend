import { IconButton } from "@mui/material";
import LogoutIcon from '@mui/icons-material/Logout';

export function LogoutButton() {
    return (
        <IconButton
            onClick={() => console.log('logout')}
        >
            <LogoutIcon />
        </IconButton>
    )
}