import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { BASE_URL } from "../utils/URLs";
import axios from "axios";
import { useDispatch } from "react-redux";
import { updateCurrentUser } from "../Redux/slices/users";

export const Register = () => {

    const [newUserError, setnewUserError] = useState(null);
    const [id, setid] = useState();
    const [firstName, setfirstName] = useState();
    const [lastName, setlasttName] = useState();
    const [city, setcity] = useState();
    const [street, setstreet] = useState();
    const [email, setemail] = useState();
    const [phone, setphone] = useState();
    const [password, setPassword] = useState();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const handlBlur = (e) => {
        console.log(e.target.id)
        if (!e.target.value)
            setnewUserError(`${e.target.id} not can be null`)
    }

    const hundleSubmit = async () => {

        const user = { id, firstName, lastName, password, email, city, street, phone }
        const url = `${BASE_URL}/User`
        console.log("newUser", user)
        const response = await axios.put(url, user);

        const currentUser = response.data
        console.log(response.data, "response")
        dispatch(updateCurrentUser(currentUser));
        navigate("/homeUser");

    }

    return (
        <div>
            <input placeholder="id" onChange={(e) => { setid(e.target.value) }} onBlur={(e) => handlBlur(e)} id="id" />
            <input placeholder="first name" onChange={(e) => { setfirstName(e.target.value) }} onBlur={(e) => handlBlur(e)} id="first name" />
            <input placeholder="input lastName" onChange={(e) => { setlasttName(e.target.value) }} onBlur={(e) => handlBlur(e)} id="Last name" />
            <input placeholder="input city" onChange={(e) => { setcity(e.target.value) }} onBlur={(e) => handlBlur(e)} id="city" />
            <input placeholder="input street" onChange={(e) => { setstreet(e.target.value) }} onBlur={(e) => handlBlur(e)} id="street" />
            <input placeholder="input email" onChange={(e) => { setemail(e.target.value) }} onBlur={(e) => handlBlur(e)} id="email" />
            <input placeholder="input phone" onChange={(e) => { setphone(e.target.value) }} onBlur={(e) => handlBlur(e)} id="phone" />
            <input placeholder="input password" onChange={(e) => { setPassword(e.target.value) }}onBlur={(e) => handlBlur(e)} id="password"  />
            <button onClick={hundleSubmit}>submit</button>
            <Link to='/login'>sign in</Link>
            {newUserError ? <>{newUserError}</> : <></>}
        </div>
    )

}
