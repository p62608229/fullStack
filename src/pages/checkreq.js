
import axios from "axios";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import offer from "../Redux/slices/offer";
import { BASE_URL } from "../utils/URLs";

export const CheckReq = () => {
    const { location } = useLocation()
    const [requests, setRequests] = useState()
    const {offer}=location.state
    useEffect(() => {
        //  const {name, user}  
        const url = `${BASE_URL}/Offer`

         const response = axios.get(url, offer)
         setRequests(response.data)

       
    })          

    const req = useSelector(s => s.request.request);
     return (
     <>
    
      {     
      req.map(c=>
      <div>{c.Profession}  {c.AddressProfession}      </div>)


      }
         {/* <h1> המערכת מצאה עבורך{requests.lenght}`אפשרויות</h1> */}
           
                </>
      
     )
   
      
}  