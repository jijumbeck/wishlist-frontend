import { Outlet } from "react-router-dom";

import './Layout.css';
import { WithAuthorizedHeader } from "./Header";


export function Layout({ children }: { children?: React.ReactNode }) {
    return (
        <>
            <WithAuthorizedHeader />
            <main>
                <Outlet />
            </main>
            <footer>
                @jijumbeck
            </footer>
        </>
    )
}