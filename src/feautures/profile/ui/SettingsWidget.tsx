import { useGetProfileInfo } from "../profileAPI"
import { ChangePassword } from "./ChangePasswordForm";
import { ChangeProfileForm } from "./ChangeProfileInfo";


export function SettingsWidget() {
    const user = useGetProfileInfo({}).data;

    if (!user) {
        return (<p>Загрузка...</p>)
    }

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
            <ChangeProfileForm user={user} />
            <ChangePassword />
        </div>
    )
}