import { Outlet } from "react-router-dom";

export function Layout({ children }: { children?: React.ReactNode }) {
    return (
        <>
            <header>
                Wishlist
            </header>
            <main>
                <Outlet />
            </main>
            <footer>
                @jijumbecks
            </footer>
        </>
    )
}