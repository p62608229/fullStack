import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { BASE_URL } from "../utils/URLs";
import axios from "axios";
import { useDispatch } from "react-redux";
import { updateCurrentUser } from "../Redux/slices/users";

export const Registerr = () => {

    const [newUserError, setnewUserError] = useState(null);
    const [Id, setId] = useState();
    const [FirstName, setfirstName] = useState();
    const [LastName, setlastName] = useState();
    const [City, setCity] = useState();
    const [Address, setAddress] = useState();
    const [Mail, setMail] = useState();
    const [Phone, setPhone] = useState();
    const [Password, setPassword] = useState();
    const [Postalcode, setPostalcode] = useState();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const handlBlur = (e) => {
        console.log(e.target.id)
        if (!e.target.value)
            setnewUserError(`${e.target.id} not can be null`)
        else {
            setnewUserError(null)
        }
    }

    const hundleSubmit = async () => {

        try {
            const user = { Id, FirstName, LastName, Password, Address, Postalcode, City, Mail, Phone }
            const url = `${BASE_URL}/User`

            console.log("newUser", typeof (JSON.stringify(user)))
            const response = await axios.put(url, user);

            const currentUser = response.data
            console.log(response.data, "response")
            dispatch(updateCurrentUser(currentUser));
            if (response.data) {
                navigate("/");
            }
            else {
                setnewUserError("some error")
            }
        } catch (e) {
            setnewUserError("some error")

        }

    }
    
    return (
        <div>
            {/* <input placeholder="Id" onChange={(e) => { setId(e.target.value) }} onBlur={(e) => handlBlur(e)} id="Id" />
            <input placeholder="FirstName" onChange={(e) => { setfirstName(e.target.value) }} onBlur={(e) => handlBlur(e)} id="FirstName" />
            <input placeholder="LastName" onChange={(e) => { setlastName(e.target.value) }} onBlur={(e) => handlBlur(e)} id="LastName" /> */}
            {/* <input placeholder="City" onChange={(e) => { setCity(e.target.value) }} onBlur={(e) => handlBlur(e)} id="City" /> */}
            <input placeholder="Postalcode" onChange={(e) => { setPostalcode(e.target.value) }} onBlur={(e) => handlBlur(e)} id="Postalcode" />
            {/* <input placeholder="Mail" onChange={(e) => { setMail(e.target.value) }} onBlur={(e) => handlBlur(e)} id="Mail" /> */}
            <input placeholder="Phone" onChange={(e) => { setPhone(e.target.value) }} onBlur={(e) => handlBlur(e)} id="Phone" />
            {/* <input placeholder="Password" onChange={(e) => { setPassword(e.target.value) }} onBlur={(e) => handlBlur(e)} id="Password" /> */}
            {/* <input placeholder="Address" onChange={(e) => { setAddress(e.target.value) }} onBlur={(e) => handlBlur(e)} id="Address" /> */}
            <button onClick={hundleSubmit}>submit</button>
            {newUserError ? <>{newUserError}</> : <></>}

        </div>
    )

}
