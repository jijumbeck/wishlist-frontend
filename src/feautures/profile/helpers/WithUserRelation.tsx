import { useContext } from "react";

import { UserRelationStatus, UserRelationStatusContext } from "./useUserRelation";



export function WithUserRelation({
    renderMe,
    renderFriend,
    renderNone
}: {
    renderMe: () => JSX.Element, renderFriend: () => JSX.Element, renderNone: () => JSX.Element
}) {
    const userRelation = useContext(UserRelationStatusContext);

    if (userRelation === UserRelationStatus.Me) {
        return renderMe();
    }

    if (userRelation === UserRelationStatus.Friend) {
        return renderFriend();
    }

    return renderNone();
}