import { useSelector } from "react-redux"
import { useState } from "react"

import { FailedConnectToDB } from "../shared/failedConnectToDB"
import { Spinner } from "../shared/sppiner."
import { CommentList } from "./commentList"
import  { AddCustomer, Addcomment } from "../add"

export const CommentPage = () => {



    const status = useSelector(s => s.comments.status)
    const currentUser = useSelector(s => s.addcomments.currentUser)
  

    const [ isAddOpen, setIsAddOpen] = useState(false);

    function closeAddPanel() {
        setIsAddOpen(false);
    }
    return <>
       { currentUser && <button onClick={() => {setIsAddOpen(prev => !prev)}}>הוספת תגובה</button> }
        <button onClick={closeAddPanel}>סגור</button>

      {isAddOpen &&  <Addcomment  closeMe={closeAddPanel}/> }
       
      { status == 'error' && <FailedConnectToDB />}
       { status == 'pending' && <Spinner />}
       { status == 'success' && <CommentList />}

      

    </>
}