import { Link, useNavigate } from "react-router-dom";

export const DefualtMenu = () => {
    const navigate = useNavigate();

    return (
        <>
            <button onClick={(e) => navigate("/login")}>sign in</button>
            <button onClick={(e) => navigate("/register")}>sign up</button>
            <button onClick={(e) => navigate("/about")}>about</button>
            <button onClick={(e) => navigate("/")}>home</button>
            <Link to="calendar" >calnder</Link>
        </>
    )
}
