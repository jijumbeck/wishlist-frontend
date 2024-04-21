import { useContext } from "react";
import { UserRelationStatus, UserRelationStatusContext } from "./ProfileWidget";
import { Button } from "@mui/material";
import { UserInfo } from "../profile.dto";
import { FriendButton } from "../../friends/ui/FriendButtons";

export function ProfileHeaderButton({ user }: { user: UserInfo }) {
    const userRelationStatus = useContext(UserRelationStatusContext);

    if (userRelationStatus === UserRelationStatus.Me) {
        return (<Button variant="outlined">Редактировать профиль</Button>);
    } else {
        return (<FriendButton userId={user.id} />)
    }
}