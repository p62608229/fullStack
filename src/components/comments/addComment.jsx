

import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { AddComment } from '../../Redux/API/comment';
import { InputTextarea } from 'primereact/inputtextarea';


export const Addcomment = (props) => {

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const currentUser = useSelector(state => state.users.currentUser);
  console.log(currentUser, "current user from add comments")
  const [commentv, setCommentv] = useState();

  const handleSubmit = () => {
    const newComment = {
      namecomment: currentUser.name,
      ContentCommentv: commentv,
      CommentUserId: currentUser.id,
    }
    dispatch(AddComment(newComment))
    if (props.closeMe)
      props.closeMe()
    else navigate("/")
  };

  return (

    <div  style={{border: "10px lightgray"}}>
      <label>Please add your comment:  </label> <br />
      <InputTextarea value={commentv} onChange={(e) => setCommentv(e.target.value)} rows={5} cols={30} /><br />
      <button onClick={handleSubmit} className="mt-2">הוסף</button>
    </div>
  );
};

