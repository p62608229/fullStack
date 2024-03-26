
import axios from "axios";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { BASE_URL } from "../utils/URLs";

export const CheckReq = () => {

    const location = useLocation();
    const requests = null;

    const { offer } = location.state

    async function getRequests(requests) {
        const url = `${BASE_URL}/User/searchrequest`
        // לבדוק האם הבדיקה היא נכונה אם לא לזמן את הפונקציה הנכונה מטבל היוזר
        const allRequest = await axios.post(url, requests)
        console.log(allRequest, " from chek request")
        requests = allRequest.data
    }


    useEffect(() => {
        getRequests()

    })

    return (
        <>

            {
                requests && requests.map(c =>
                    <div>
                        <div>note:  {c.note} </div>
                        <div>priceForWork:  {c.priceForWork}  </div>
                        <div>pricePerVisit:  {c.pricePerVisit} </div>
                    </div>

                )




            }
            <h1> המערכת מצאה עבורך{requests.length}אפשרויות</h1>
            {/* req.map(c =>
                    <div>{c.Profession}  {c.AddressProfession}      </div>)


            } */}
            {/* <h1> המערכת מצאה עבורך{requests.lenght}`אפשרויות</h1> */}

        </>

    )
}  