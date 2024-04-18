import { IconButton } from "@mui/material";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { useNavigate } from "react-router-dom";

export function ProfileButton() {
    const navigate = useNavigate();

    return (
        <IconButton
            onClick={() => navigate('')}
        >
            <AccountCircleIcon />
        </IconButton>
    )
}