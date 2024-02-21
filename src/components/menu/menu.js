import { useSelector } from "react-redux"
import { Outlet, useNavigate } from "react-router-dom"
import { UserMenu } from "./userMenu";
import { DefualtMenu } from "./defualtMenu";

export const Menu = () => {
    const currentUser = useSelector(s => s.users.currentUser);

    return (
        <>
        logo
            {currentUser ? <UserMenu /> : <DefualtMenu />}
            <Outlet />
        </>
    )
}
