import axios from "axios";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../utils/URLs";
import { ProfessionSelector } from "../components/profession";
import offer, { addNewOffer } from "../Redux/slices/offer";


export const Offer = () => {

    const currentUser = useSelector(s => s.users.currentUser)
    const [professionCode, setProfessionCode] = useState()
    const [newUserError, setnewUserError] = useState(null);
    const [PriceForWork, setPriceForWork] = useState();
    const [Note, setNote] = useState();
    const [PricePerVisit, setPricePerVisit] = useState();
    const [Profession, setprofession] = useState();
    const [DateTime, SetDateTime] = useState();
    const [FromHour, setFromHour] = useState();
    const [ToHour, SetToHour] = useState();
    const [offerCode, SetofferCode] = useState();
    const [offerUserId, SetofferUserId] = useState();


    // const currentUser = useSelector(s => s.users.currentUser)

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

    const getAllREquestByOffer = async (offer) => {
        const url = `${BASE_URL}/Offer`
        // לבדוק האם הבדיקה היא נכונה אם לא לזמן את הפונקציה הנכונה מטבל היוזר
        const allRequestResponse = await axios.get(url, offer)
        console.log(allRequestResponse, "response from chek request")
        return allRequestResponse.data
    }

    const hundleSubmit = async () => {
        const Offer = { offerUserId: currentUser.id, PriceForWork, Note, PricePerVisit, DateTime, professionCode, FromHour, ToHour }
        // const DayTo = {DateTime,FromHour,ToHour}
        const url = `${BASE_URL}/Offer/newoffer`
        const response = await axios.put(url, Offer);
        console.log(response, "response offer")

        console.log(response.data, "proffetion response")
        // const responseDayTo = await axios.get(url, DayTo);
        if (response.data == false) {
            dispatch(addNewOffer(offer));
            const requests = await getAllREquestByOffer(offer)
            navigate("/checkreq", { state: {requests: requests} });
        }
        else {
            setnewUserError("some error")
        }

    }
    return (
        <div>
            <input placeholder="PriceForWork" onChange={(e) => { setPriceForWork(e.target.value) }} onBlur={(e) => handlBlur(e)} id="PriceForWork" />
            <input placeholder="Note" onChange={(e) => { setNote(e.target.value) }} onBlur={(e) => handlBlur(e)} id="Note" />
            <input placeholder="PricePerVisit" onChange={(e) => { setPricePerVisit(e.target.value) }} onBlur={(e) => handlBlur(e)} id="PricePerVisit" />
            <input placeholder="FromHour" onChange={(e) => { setFromHour(e.target.value) }} onBlur={(e) => handlBlur(e)} id="FromHour" />
            <input placeholder="ToHour" onChange={(e) => { SetToHour(e.target.value) }} onBlur={(e) => handlBlur(e)} id="ToHour" />
            {/* <input placeholder="offercode" onChange={(e) => { SetofferCode(e.target.value) }} onBlur={(e) => handlBlur(e)} id="offercode" /> */}
            <input placeholder="DateTime" onChange={(e) => { SetDateTime(e.target.value) }} onBlur={(e) => handlBlur(e)} id="DateTime" />
            
            <button onClick={hundleSubmit}>submit</button>
            {newUserError ? <>{newUserError}</> : <></>}


            <ProfessionSelector setProfessionCode={setProfessionCode} />

            professionCode {professionCode}
        </div>
    )
}
