import { ImageUpload } from "./ImageUpload";
import { useGetProfileInfo } from "../profileAPI"
import { ChangePassword } from "./ChangePasswordForm";
import { ChangeProfileForm } from "./ChangeProfileInfo";
import { IMAGE_API } from "../../../shared/api";
import { useAppSelector } from "../../../app/store";
import { useNavigate } from "react-router-dom";


export function SettingsWidget() {
    const user = useGetProfileInfo({}).data;
    const isAuth = useAppSelector(state => state.auth.isAuth);
    const navigate = useNavigate();
    
    if (!isAuth) {
        navigate('/');
    }

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
            <div style={{ display: 'flex', justifyContent: 'space-evenly', width: '100%' }}>
                <div>
                    <ChangeProfileForm user={user} />
                </div>
                <div>
                    <ChangePassword />
                </div>
            </div>
        </div>
    )
}