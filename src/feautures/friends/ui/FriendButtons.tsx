import Button from "@mui/material/Button";
import { useAddFriend, useDeleteFriend, useGetFriends, useGetFriendshipRequest } from "../friendAPI";
import { useGetProfileInfo, useGetUserInfo } from "../../profile/profileAPI";
import { FriendRequestStatus, FriendshipRequest } from "../friend.dto";

export function AddFriendButton({ userToAddId, text }: { userToAddId: string, text?: string }) {
    const [addFriend, metadata] = useAddFriend();

    return (
        <Button
            variant='outlined'
            onClick={() => {
                addFriend(userToAddId);
            }}
            disabled={metadata.isLoading}
        >
            {metadata.isSuccess ? "Запрос отправлен"
                : (metadata.isError ? "Произошла ошибка" : "Добавить в друзья")}
        </Button>
    )
}

export function DeleteFriendButton({ userTodeleteId, friendshipRequest }: { userTodeleteId: string, friendshipRequest: FriendshipRequest }) {
    const [deleteFriend, metadata] = useDeleteFriend();

    const buttonText = friendshipRequest.status === FriendRequestStatus.Friend ? "Удалить из друзей" : "Отменить запрос";

    return (
        <Button
            variant='outlined'
            onClick={() => {
                deleteFriend(userTodeleteId);
            }}
            disabled={metadata.isLoading}
            color='error'
        >
            {metadata.isSuccess ? "Запрос отправлен"
                : (metadata.isError ? "Произошла ошибка" : buttonText)}
        </Button>
    )
}

export function FriendButton({ userId }: { userId: string }) {
    let friendshipRequest = useGetFriendshipRequest(userId).data;

    if (!friendshipRequest) {
        return (<AddFriendButton userToAddId={userId} text='Добавить в друзья' />)
    }

    if (friendshipRequest.status === FriendRequestStatus.None) {
        return (<AddFriendButton userToAddId={userId} text='Добавить в друзья' />)
    }

    if (friendshipRequest.userIdFirst === userId && (friendshipRequest.status === FriendRequestStatus.Subscriber || friendshipRequest.status === FriendRequestStatus.Declined)) {
        return (
            <AddFriendButton userToAddId={userId} text="Добавить в друзья" />
        )
    }

    return (
        <DeleteFriendButton userTodeleteId={userId} friendshipRequest={friendshipRequest} />
    )
}