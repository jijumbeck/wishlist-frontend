
export const enum FriendRequestStatus {
    None = "NONE",
    Subscriber = "SUBSCRIBER",
    Friend = "FRIEND"
}

export interface FriendshipRequest {
    userIdFirst: string;
    userIdSecond: string;
    status: FriendRequestStatus
}