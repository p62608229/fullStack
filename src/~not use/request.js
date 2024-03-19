import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { BASE_URL } from "../utils/URLs";


export const Request = ()=> { 
  
        const pro = [{code: 5, name: "hhh"}, {code: 54, name: "hh"}]
        const [selectedProCode, setSelectedProCode] = useState()
        const [newUserError, setnewUserError] = useState(null);
        const [requestCode, setrequestCode] = useState();
        const [date, setdate] = useState();
        const [userCodeOffers, setuserCodeOffers] = useState();
        const [profession, setprofession] = useState();
        const [FromHour, SetFromHour] = useState();
        const [ToHour, setToHour] = useState();
        const [cameThroughFriend, SetcameThroughFriend] = useState();
        const [city, Setcity] = useState();
        const [note, Setnote] = useState();
        const [offerUserId, SetofferUserId] = useState();
    
        // const currentUser = useSelector(s => s.users.currentUser)
    
        const navigate = useNavigate();
        const dispatch = useDispatch();
        const handlBlur = (e) => {
            console.log(e.target.id)
            if (!e.target.value)
                setnewUserError(`${e.target.id} not can be null`)
                else{
                    setnewUserError(null)
                }
        }
        
       
        const hundleSubmit = async () => {
           
            const Request = { requestCode,date,userCodeOffers, profession,ToHour,FromHour,cameThroughFriend,city,note,offerUserId}
            // const DayTo = {DateTime,FromHour,ToHour}
            const url = `${BASE_URL}/Request`
            const response = await axios.put(url, Request);
            // const responseDayTo = await axios.get(url, DayTo);
    
            if (response.data) {
                // dispatch(addNewOffer(response.data))
                navigate("/homeUser");
            }
            else {
                setnewUserError("some error")
            }
            
        }
        return (
            <div>
                <input placeholder="requestCode" onChange={(e) => { setrequestCode(e.target.value) }} onBlur={(e) => handlBlur(e)} id="requestCode" />
                <input placeholder="date" onChange={(e) => { setdate(e.target.value) }} onBlur={(e) => handlBlur(e)} id="date" />
                <input placeholder="userCodeOffers" onChange={(e) => { setuserCodeOffers(e.target.value) }} onBlur={(e) => handlBlur(e)} id="userCodeOffers" />
                <input placeholder="Profession" onChange={(e) => { setprofession(e.target.value) }} onBlur={(e) => handlBlur(e)} id="Profession" />
                <input placeholder="ToHour" onChange={(e) => { setToHour(e.target.value) }} onBlur={(e) => handlBlur(e)} id="ToHour" />
                <input placeholder="FromHour" onChange={(e) => { SetFromHour(e.target.value) }} onBlur={(e) => handlBlur(e)} id="FromHour" />
                <input placeholder="city" onChange={(e) => { Setcity(e.target.value) }} onBlur={(e) => handlBlur(e)} id="city" />
                <input placeholder="note" onChange={(e) => { Setnote(e.target.value) }} onBlur={(e) => handlBlur(e)} id="note" />
                <input placeholder="offerUserId" onChange={(e) => { SetofferUserId(e.target.value) }} onBlur={(e) => handlBlur(e)} id="offerUserId" />
                <input placeholder="cameThroughFriend" onChange={(e) => { SetcameThroughFriend(e.target.value) }} onBlur={(e) => handlBlur(e)} id="cameThroughFriend" />
                <button onClick={hundleSubmit}>submit</button>
                {newUserError ? <>{newUserError}</> : <></>}
                {}
    
                {pro && <select onChange={(e) => setSelectedProCode(e.target.value)}><option >choose pro</option>   {pro.map((p, index)=> {
                    return <option value={p.code}  key={index} >{p.name}</option>
                }) }</select>} 
                selected pro code {selectedProCode}
            </div>
            
        )
    }
    