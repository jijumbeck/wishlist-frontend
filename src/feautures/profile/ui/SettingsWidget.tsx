import { ImageUpload } from "./ImageUpload";
import { useGetProfileInfo } from "../profileAPI"
import { ChangePassword } from "./ChangePasswordForm";
import { ChangeProfileForm } from "./ChangeProfileInfo";
import { IMAGE_API } from "../../../shared/api";


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
            <div
                style={{
                    borderRadius: '50%',
                    border: '1px solid #000',
                    height: '200px',
                    width: '200px',
                    overflow: 'hidden'
                }}
            >
                <ImageUpload imageURL={`${IMAGE_API}/${user.imageURL}`} />
            </div>
            <ChangeProfileForm user={user} />
            <ChangePassword />
        </div>
    )
}