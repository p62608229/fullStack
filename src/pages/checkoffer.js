
import axios from "axios";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { BASE_URL } from "../utils/URLs";


export const CheckOffer = () => {

    const offers = useSelector(s => s.request.searchOffer);
    console.log(offers, "oferrrrrrrrrrrr")
    return (
        <>

            {
                offers.map(r =>
                    <div>{r.offerCode}</div>)
            }
            <h1> המערכת מצאה עבורך{offers.length}אפשרויות</h1>
            {/* req.map(c =>
                    <div>{c.Profession}  {c.AddressProfession}      </div>)


            } */}
            {/* <h1> המערכת מצאה עבורך{requests.lenght}`אפשרויות</h1> */}

        </>

    )
}  