import { useContext } from "react";
import { UserRelationStatus, UserRelationStatusContext } from "./ProfileWidget";
import { Button } from "@mui/material";
import { UserInfo } from "../profile.dto";
import { FriendButton } from "../../friends/ui/FriendButtons";
import { useNavigate } from "react-router-dom";

export function ProfileHeaderButton({ user }: { user: UserInfo }) {
    const userRelationStatus = useContext(UserRelationStatusContext);
    const navigate = useNavigate();

    if (userRelationStatus === UserRelationStatus.Me) {
        return (<Button variant="outlined" onClick={() => navigate('/settings')}>Редактировать профиль</Button>);
    } else {
        return (<FriendButton userId={user.id} />)
    }
}