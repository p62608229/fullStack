import { useEffect } from "react"
import { useDispatch } from "react-redux"
import { GetComments, getAllCustomers } from "../Redux/API/comment"
import { CommentPage, commentPage } from "./pages/commentPage"
import { Outlet, useNavigate } from "react-router-dom"

export const Main = () => {
    
    const dispatch = useDispatch();
    useEffect(() => {
         dispatch(GetComments())
    }, [])

    return <div>
     
         {/* { <AppHeader></AppHeader> }`` */}
        <CommentPage /> 
        <Outlet />
        {/* <Loggin/> */}
       {/* <Footer></Footer> */}

    </div>

}