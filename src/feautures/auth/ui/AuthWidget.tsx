import { useNavigate } from "react-router-dom";
import { useAppSelector } from "../../../app/store"


export function AuthWidget({ children }: { children?: React.ReactElement }) {
    const isAuth = useAppSelector(store => store.auth.isAuth);
    const naigate = useNavigate();

    if (isAuth) {
        naigate('/');
    }
    
    return (
        <div
            style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: '50%',
                margin: 'auto'
            }}
        >
            {children}
        </div>
    )
}