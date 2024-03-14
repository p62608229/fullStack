import { useSelector } from "react-redux"
import { Outlet } from "react-router-dom"
import { UserMenu } from "./userMenu";
import { DefualtMenu } from "./defualtMenu";


export const Menu = () => {

    const currentUser = useSelector(s => s.users.currentUser);

    return (
        <>
            {currentUser ? <UserMenu /> : <DefualtMenu />}
            <Outlet />
        </>
    )
}
