

import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AddComment, createNewCustomer } from '../Redux/API/comment';
import { useNavigate } from 'react-router-dom';

export const Addcomment = () => {

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
    navigate("/comments")
  };

  return (

    <div className='Addcomment'>
      add comments
      <label>תגובה<input type="text" name="namecomment" value={commentv} onChange={(e) => setCommentv(e.target.value)} /></label>
      {/* <label> כתובת<input type="text" name="custAddress" value={newCustomer.custAddress}  onChange={handleChange}  /></label>
      <label>עיר <input type="text" name="custCity" value={newCustomer.custCity}   onChange={handleChange} /></label>
      <label>שם העובד<input type="text" name="employeeName" value={newCustomer.employeeName}  onChange={handleChange}   /></label> */}
      <button onClick={handleSubmit}>הוסף</button>
    </div>
  );
};

