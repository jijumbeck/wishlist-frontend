import { createContext } from "react";

import { useGetFriends } from "../../friends/friendAPI";
import { useGetProfileInfo } from "../profileAPI";


export const enum UserRelationStatus {
    None = 'None',
    Friend = 'Friend',
    Me = 'Me'
}


export const UserRelationStatusContext = createContext(UserRelationStatus.None);


export function useUserRelation(userId: string) {
    const currentUser = useGetProfileInfo({}).data;
    const friends = useGetFriends(currentUser ? currentUser.id : 'undefined').data;
    const isFriend = friends ? friends.findIndex(friend => friend.id === userId) >= 0 : false;

    const userRelation =
        userId === currentUser?.id
            ? UserRelationStatus.Me
            : (isFriend
                ? UserRelationStatus.Friend
                : UserRelationStatus.None)

    return userRelation;
}