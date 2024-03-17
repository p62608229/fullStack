import { useSelector } from "react-redux"
import { useState } from "react"

import { FailedConnectToDB } from "../components/shared/failedConnectToDB"
import { Button } from 'primereact/button';
import { Spinner } from "../components/shared/sppiner."
import { CommentsTable } from "../components/comments/commentsTabel"
import { Addcomment } from "../components/comments/addComment";

export const CommentPage = () => {

    const status = useSelector(s => s.comments.status)
    const currentUser = useSelector(s => s.users.currentUser)

    const [isAddOpen, setIsAddOpen] = useState(false);

    function closeAddPanel() {
        setIsAddOpen(false);
    }
    return (<div  style={{margin: "30px"}}>
        {currentUser && <div  >
            <Button style={{margin: "0px 10px"}} icon={isAddOpen ? "pi pi-times" : "pi pi-plus"} rounded text raised aria-label="Filter" onClick={() => setIsAddOpen(prev => !prev)} />
            {isAddOpen && <Addcomment closeMe={closeAddPanel} />}
        </div>}
        <CommentsTable  />
        {status == 'error' && <FailedConnectToDB />}
        {status == 'pending' && <Spinner />}
    </div>)
}
