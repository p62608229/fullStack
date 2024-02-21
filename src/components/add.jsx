

import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AddComment, createNewCustomer } from '../Redux/API/api';

export const Addcomment = (props) => {

  const dispatch = useDispatch();
  const currentUser = useSelector(state => state.addcomments.currentUser);
  const [commentv, setCommentv] = useState();

  const handleSubmit =  () => {
    const newComment = {
      namecomment: currentUser.name,
      ContentCommentv: commentv,
      CommentUserId: "12345678",
    }

    dispatch(AddComment(newComment))
    props.closeMe()
    // setNewCustomer({ });
  };

  return (
    <div className='Addcomment'>
      {/* <h2>הוספת Person חדש</h2> */}
      <label>תגובה<input type="text" name="namecomment" value={commentv} onChange={(e) => setCommentv(e.target.value)} /></label>
      {/* <label> כתובת<input type="text" name="custAddress" value={newCustomer.custAddress}  onChange={handleChange}  /></label>
      <label>עיר <input type="text" name="custCity" value={newCustomer.custCity}   onChange={handleChange} /></label>
      <label>שם העובד<input type="text" name="employeeName" value={newCustomer.employeeName}  onChange={handleChange}   /></label> */}
      <button onClick={handleSubmit}>הוסף</button>
    </div>
  );
};

