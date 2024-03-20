import { useEffect, useState } from "react";
import { BASE_URL } from "../../utils/URLs";
import axios from "axios";
import { useDispatch } from "react-redux";

export const EditProfile = (props) => {

    const [editedProfile, seteditedProfile] = useState();
    const Profile = { Firstname, LastName, adress, phone }
    const dispatch = useDispatch();
    useEffect(() => {
        seteditedProfile(props.Profile)
    }, [props.Profile])

    const handleChange = (e) => {
        const { name, value } = e.target;


    };

    const onSubmit = async () => {
        const url = `${BASE_URL}/Users`
        const res = await axios.put(url, Profile);

    };

    return (
        <div className='AddPerson'>
            edit profile

            <label>שם פרטי: <input type="text" name="Firstname" value={Profile.Firstname} onChange={handleChange} /></label>
            <label> שם משפחה<input type="text" name="LastName" value={Profile.LastName} onChange={handleChange} /></label>
            <label>כתובת <input type="text" name="adress" value={Profile.adress} onChange={handleChange} /></label>
            <label>טלפון<input type="text" name="phone" value={Profile.phone} onChange={handleChange} /></label>
            <button onClick={onSubmit}>הוסף</button>
        </div> 

    );
};


