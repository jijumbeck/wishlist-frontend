import Button from "@mui/material/Button";
import { useAddFriend, useDeleteFriend, useGetFriends, useGetFriendshipRequest } from "../friendAPI";
import { useGetProfileInfo, useGetUserInfo } from "../../profile/profileAPI";
import { FriendRequestStatus, FriendshipRequest } from "../friend.dto";

export function AddFriendButton({ userToAddId }: { userToAddId: string }) {
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
        >
            {metadata.isSuccess ? "Запрос отправлен"
                : (metadata.isError ? "Произошла ошибка" : buttonText)}
        </Button>
    )
}

export function FriendButton({ userId }: { userId: string }) {
    const friendshipRequest = useGetFriendshipRequest(userId).data;

    if (!friendshipRequest) {
        return (<p>Загрузка...</p>)
    }

    if (friendshipRequest.status === FriendRequestStatus.None ||
        (friendshipRequest.userIdFirst === userId && friendshipRequest.status === FriendRequestStatus.Subscriber)) {
        return (
            <AddFriendButton userToAddId={userId} />
        )
    }

    return (
        <DeleteFriendButton userTodeleteId={userId} friendshipRequest={friendshipRequest} />
    )
}