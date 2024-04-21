import { useContext } from "react";
import { UserRelationStatus, UserRelationStatusContext } from "./ProfileWidget";
import { Button } from "@mui/material";

export function ProfileFriendButton() {
    const userRelationStatus = useContext(UserRelationStatusContext);

    if (userRelationStatus === UserRelationStatus.Me) {
        return (<Button variant="outlined">Редактировать профиль</Button>);
    } else if (userRelationStatus === UserRelationStatus.Friend) {
        return (<Button variant="outlined">Удалить из друзей</Button>);
    } else {
        return (<Button variant="outlined">Добавить в друзья</Button>)
    }
}