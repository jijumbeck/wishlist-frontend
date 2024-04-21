import { useGetFriends, useGetSubscribers, useGetSubscripiants } from "../friendAPI"

export function FriendProfileComponent({ userId }: { userId: string }) {

    const friendsCount = useGetFriends(userId).data?.length;
    const subscribersCount = useGetSubscribers(userId).data?.length;
    const subscripiantsCount = useGetSubscripiants(userId).data?.length;

    return (
        <div style={{ display: 'flex', gap: '15px' }}>
            <FriendElement count={friendsCount} label="друзей" />
            <FriendElement count={subscribersCount} label="подписок" />
            <FriendElement count={subscripiantsCount} label="подписчиков" />
        </div>
    )
}

const FriendElement = ({ count, label }: { count?: number, label: string }) => {
    return (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <p style={{ margin: 0 }}>{count}</p>
            <p style={{ margin: 0 }}>{label}</p>
        </div>
    )
}