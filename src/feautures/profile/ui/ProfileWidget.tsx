import { Outlet, useLoaderData } from "react-router-dom";
import { useGetProfileInfo, useGetUserInfo } from "../profileAPI";
import { ProfileHeader } from "./ProfileHeader";
import { createContext } from "react";

export async function userIdLoader({ params }: { params: any }) {
    const userId = params?.userId;
    return userId;
}

export const enum UserRelationStatus {
    None = 'None',
    Friend = 'Friend',
    Me = 'Me'
}

export const UserRelationStatusContext = createContext(UserRelationStatus.None);


export function ProfileWidget() {
    const userId = useLoaderData() as string;

    const currentUser = useGetProfileInfo({}).data;
    const user = useGetUserInfo(userId).data;


    if (!user || !currentUser) {
        return (<p>Загрузка...</p>)
    }

    return (
        <div style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            gap: '30px',
            width: '50%',
            margin: '50px auto'
        }}>
            <UserRelationStatusContext.Provider value={userId === currentUser.id ? UserRelationStatus.Me : UserRelationStatus.None}>
                <ProfileHeader user={user} />
                <hr style={{ border: '1px solid', width: '100%' }} />
                <Outlet />
            </UserRelationStatusContext.Provider>
        </div>
    )
}
