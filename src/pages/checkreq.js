
import axios from "axios";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { BASE_URL } from "../utils/URLs";


//  POST // serchoffer  / - POST  serchRequest   - 
export const CheckReq = () => {

    const location = useLocation()
    const requests = location.state.requests.map(r => {
        const { priceForWork, pricePerVisit, note } = r;
        return { priceForWork, pricePerVisit, note };
    })


    // const [requests, setRequests] = useState()
    const { offer } = location.state
    useEffect(() => {
        //  const {name, user}  
        const url = `${BASE_URL}/Offer`

        const response = axios.get(url, offer)
        // setRequests(response.data)


    })

    const req = useSelector(s => s.request.request);
    return (
        <>

            {
                requests.map(c =>
                    <div>note:  {c.note} {c.priceForWork} {c.pricePerVisit}</div>)
            }
            <h1> המערכת מצאה עבורך{requests.length}אפשרויות</h1>
                {/* req.map(c =>
                    <div>{c.Profession}  {c.AddressProfession}      </div>)


            } */}
            {/* <h1> המערכת מצאה עבורך{requests.lenght}`אפשרויות</h1> */}

        </>

    )
}  