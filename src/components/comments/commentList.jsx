import {  useSelector } from "react-redux"



export const CommentList = () => {

    const allCustomers = useSelector(state => state.comments.comments);
    return <>
    
        {allCustomers.map(c =>
            <div>{c.namecomment} : {c.contentCommentv}</div>
        )}
    </>
}