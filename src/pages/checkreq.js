
import axios from "axios";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { BASE_URL } from "../utils/URLs";


export const CheckReq = () => {

    const requests = useSelector(s => s.offer.searchrequest);
console.log(requests, "reqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqq")
    return (
        <>

            {
                requests.map(r =>
                    <div>{r.offerCode}</div>)
            }
            <h1> המערכת מצאה עבורך{requests.length}אפשרויות</h1>
                {/* req.map(c =>
                    <div>{c.Profession}  {c.AddressProfession}      </div>)


            } */}
            {/* <h1> המערכת מצאה עבורך{requests.lenght}`אפשרויות</h1> */}

        </>

    )
}  