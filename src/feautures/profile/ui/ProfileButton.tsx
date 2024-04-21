import { IconButton } from "@mui/material";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { useNavigate } from "react-router-dom";
import { useGetProfileInfo } from "../profileAPI";

export function ProfileButton() {
    const navigate = useNavigate();
    const { data } = useGetProfileInfo({});

    return (
        <IconButton
            disabled={!data}
            onClick={() => navigate(`/${data?.id}`)}
        >
            <AccountCircleIcon />
        </IconButton>
    )
}