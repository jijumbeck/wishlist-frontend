import { useGetProfileInfo } from "../profileAPI"
import { ChangePassword } from "./ChangePasswordForm";
import { ChangeProfileForm } from "./ChangeProfileInfo";


export function SettingsWidget() {
    const user = useGetProfileInfo({}).data;

    const user1 = {
        id: '1',
        email: 'email@email.com',
        login: 'login'
    };

    return (
        <div
            style={{
                width: '50%',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'flex-start',
                margin: '40px auto'
            }}
        >
            <ChangeProfileForm user={user1} />
            <ChangePassword />
        </div>
    )
}