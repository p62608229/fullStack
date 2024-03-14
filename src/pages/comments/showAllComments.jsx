import { useSelector } from "react-redux"

export const ShowAllComments = () => {

    const allCustomers = useSelector(state => state.comments.comments);
    return <>
    show all comments
        {allCustomers.map(c =>
            <div>{c.namecomment} : {c.contentCommentv}</div>
        )}
    </>
}
