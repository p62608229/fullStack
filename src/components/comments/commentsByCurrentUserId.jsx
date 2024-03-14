import { useSelector } from "react-redux"
import { CommentsTable } from "./commentsTabel";

export const CommentsByCurrentUserId = () => {

    const currentUser = useSelector(s => s.users.currentUser);

    return <CommentsTable id={currentUser.id} />

}
