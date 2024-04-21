import { FriendProfileComponent } from "../../friends/ui/FriendProfileComponent";
import { UserInfo } from "../profile.dto";
import { ProfileHeaderButton } from "./ProfileHeaderButton";

export function ProfileHeader({ user }: { user: UserInfo }) {
    return (
        <div style={{
            display: 'flex'
        }}>
            <img
                src="https://upload.wikimedia.org/wikipedia/commons/9/99/Sample_User_Icon.png"
                alt="Аватарка профиля пользователя"
                style={{
                    width: '100px',
                    height: '100px',
                    borderRadius: '50%',
                    border: '3px solid',
                    margin: '0 0 0 50px'
                }}
            />
            <div style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'flex-start',
                gap: '20px',
                margin: '0 0 0 30px'
            }}>
                <h3 style={{ margin: 0 }}>@{user?.login}</h3>
                <h5 style={{ margin: 0 }}>{user?.name} {user?.lastName}</h5>
                <FriendProfileComponent userId={user.id} />
                <ProfileHeaderButton user={user} />
            </div>
        </div>
    )
}