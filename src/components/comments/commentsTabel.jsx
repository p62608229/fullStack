import { useSelector } from "react-redux"
import { useLocation } from "react-router-dom"

export const CommentsTable = (props) => {

    const location = useLocation()
    const { id } = location.state | props
    const allComments = useSelector(state => state.comments.comments);
    const commentsToShow = id ? allComments.filter(c => c.id == id) : allComments

    return <>
        show all comments table
        {commentsToShow.map(c =>
            <div>{c.namecomment} : {c.contentCommentv}</div>
        )}
    </>
}
