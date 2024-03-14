import { useSelector } from "react-redux"
import { CommentsTable } from "../comments/commentsTabel";

export const CurrentUserRequests= () => {

    const currentUser = useSelector(s => s.users.currentUser);

    return (<>
    CurrentUserRequests
    </>)

}
