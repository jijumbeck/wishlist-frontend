import { Outlet, useLoaderData } from "react-router-dom";

import { useGetUserInfo } from "../profileAPI";
import { ProfileHeader } from "./ProfileHeader";
import { UserRelationStatus, UserRelationStatusContext, useUserRelation } from "../helpers/useUserRelation";


export async function userIdLoader({ params }: { params: any }) {
    const userId = params?.userId;
    return userId;
}

export function ProfileWidget() {
    const userId = useLoaderData() as string;
    
    const user = useGetUserInfo(userId).data;
    const userRelation = useUserRelation(userId);

    if (!user) {
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
            <UserRelationStatusContext.Provider value={userRelation}>
                <ProfileHeader user={user} />
                <hr style={{ border: '1px solid', width: '100%' }} />
                <Outlet />
            </UserRelationStatusContext.Provider>
        </div>
    )
}
export { UserRelationStatus };

