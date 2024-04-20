import { useAppSelector } from "../../app/store";
import { LogoutButton } from "../auth/ui/LogoutButton"
import { Notifications } from "../notifications/Notifications";
import { ProfileButton } from "../profile/ui/ProfileButton"


export function Header({ children }: { children?: React.ReactNode }) {
    return (
        <header>
            <a href="/" className="logo">Wishlist</a>
            {children}
        </header>
    )
}

export function AuthorizedHeader() {
    return (
        <Header>
            <Notifications />
            <ProfileButton />
            <LogoutButton />
        </Header>
    )
}

export function UnauthorizedHeader() {
    return (
        <Header>
            <a href="/register">Зарегистрироваться</a>
            <a href="/login">Войти</a>
        </Header>
    )
}

export function WithAuthorizedHeader() {
    const isAuth = useAppSelector(store => store.auth.isAuth);

    if (isAuth) {
        return <AuthorizedHeader />;
    }

    return <UnauthorizedHeader />;
}