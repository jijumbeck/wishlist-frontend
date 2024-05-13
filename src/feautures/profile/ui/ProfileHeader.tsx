import { IMAGE_API } from "../../../shared/api";
import { FriendProfileComponent } from "../../friends/ui/FriendProfileComponent";
import { UserInfo } from "../profile.dto";
import { ProfileHeaderButton } from "./ProfileHeaderButton";

export function ProfileHeader({ user }: { user: UserInfo }) {
    return (
        <div style={{
            display: 'flex'
        }}>
            <UserImage user={user} />
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

function UserImage({ user }: { user: UserInfo }) {
    const isImageExists = false;

    if (user.imageURL) {
        return (
            <img
                src={`${IMAGE_API}/${user.imageURL}`}
                alt="Аватарка профиля пользователя"
                style={{
                    width: '100px',
                    height: '100px',
                    borderRadius: '50%',
                    border: '3px solid',
                    margin: '0 0 0 50px'
                }}
            />
        )
    }

    return (
        <div
            style={{
                width: '100px',
                height: '100px',
                borderRadius: '50%',
                border: '3px solid',
                margin: '0 0 0 50px',
                backgroundColor: '#fff',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
            }}
        >
            <p
                style={{
                    fontSize: '54px',
                    textTransform: 'uppercase',
                    margin: '0'
                }}
            >
                {user.login[0]}
            </p>
        </div>
    )
}