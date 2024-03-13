
import { useEffect } from "react";
import { useSelector } from "react-redux";

export const HomeUser = () => {
    const currentUser = useSelector(state => state.users.currentUser);
    useEffect(() => {
        const newUser = {
          nameuser: currentUser,
}})}
//     return         <>?
    

// {data.currentUser.map(c =>
//     <div>שלום ל{c.FirstName} </div>
    
// )}
// </>
// }
{/* <div>שלום ל{newComment.map(b=>
    <div>b.nameuser)}</div></div> */}
                   {/* home  user page */}
                   