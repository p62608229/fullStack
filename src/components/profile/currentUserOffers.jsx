import { useSelector } from "react-redux"
import { CommentsTable } from "../comments/commentsTabel";

export const CurrentUserOffers = () => {

    const currentUser = useSelector(s => s.users.currentUser);

    return <>
    CurrentUser of
    </>

}
