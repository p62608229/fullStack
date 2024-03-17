import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { BASE_URL } from "../utils/URLs";
import axios from "axios";
import { useDispatch } from "react-redux";
import { updateCurrentUser } from "../Redux/slices/users";


export const Loginn = () => {

    const [loginError, setLoginError] = useState(false);
    const [name, setName] = useState();
    const [password, setPassword] = useState();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const hundleSubmit = async () => {

        const url = `${BASE_URL}/User/${name}/${password}`
        console.log("log in", url)
        const response = await axios.get(url);
        // // const response = await axios.post(`${BASE_URL}/login`, {name, password});
        const currentUser = response.data
        console.log(response.data)

        if (currentUser) {
            dispatch(updateCurrentUser(currentUser));
            navigate("/");
        }
        else
            setLoginError(true);
    }

    return (
        <div>
            <input placeholder="input name" onChange={(e) => { setName(e.target.value) }} />
            <input placeholder="input password" onChange={(e) => { setPassword(e.target.value) }} />
            <button onClick={hundleSubmit}>submit</button>
            <Link to='/register'>sign up</Link>
        </div>
    )
}
