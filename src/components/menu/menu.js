import { useSelector } from "react-redux"
import { Outlet, useNavigate } from "react-router-dom"
import { UserMenu } from "./userMenu";
import { DefualtMenu } from "./defualtMenu";

export const Menu = () => {

    const currentUser = useSelector(s => s.users.currentUser);
    const navigate = useNavigate();

    return (
        <>
            logo
            <button onClick={(e) => navigate("/")}>home</button>
            {currentUser ? <UserMenu /> : <DefualtMenu />}
            <Outlet />
        </>
    )
}
