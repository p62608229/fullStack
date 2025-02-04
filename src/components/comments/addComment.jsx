

import { Form, Field } from 'react-final-form';
import { useDispatch, useSelector } from 'react-redux';
import { classNames } from 'primereact/utils';
import { Button } from 'primereact/button';
import { useNavigate } from 'react-router-dom';
import { AddComment } from '../../Redux/API/comment';
import { InputTextarea } from 'primereact/inputtextarea';
import { Rating } from 'primereact/rating';
import { useState } from 'react';


export const Addcomment = (props) => {

const [value,setValue]=useState(0);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const currentUser = useSelector(state => state.users.currentUser);

  const validate = (data) => {
    let errors = {};

    if (!data.commentv) {
      errors.commentv = 'required provider comment.';
    }
debugger
    return errors;

};

  const onSubmit = (data) => {
    const newComment = {
      namecomment: currentUser.name,
      ContentCommentv: data.commentv,
      CommentUserId: currentUser.id,
rating: value
    }
    console.log(newComment, "Data sent to API");

    dispatch(AddComment(newComment))
    if (props.closeMe)
      props.closeMe()
    else navigate("/")
  };

  const isFormFieldValid = (meta) => !!(meta.touched && meta.error);
  const getFormErrorMessage = (meta) => {
      return isFormFieldValid(meta) && <small className="p-error">{meta.error}</small>;
  };

  return (

    <div className="form-demo" style={{ padding: "5px" }}>
      <div className="flex justify-content-center">
          <div className="card">
              <Form onSubmit={onSubmit} initialValues={{ commentv: '' }} validate={validate} render={({ handleSubmit }) => (
                  <form onSubmit={handleSubmit} className="p-fluid" >
                      <Field name="commentv" render={({ input, meta }) => (
                          <div className="field">
                              <span className="p-float-label">
                                  <InputTextarea id="commentv" {...input}  autoFocus className={classNames({ 'p-invalid': isFormFieldValid(meta) })}  rows={5} cols={30} />
                                  <label htmlFor="commentv" className={classNames({ 'p-error': isFormFieldValid(meta) })}>Please add your comment:</label>
                              </span>
                              {getFormErrorMessage(meta)}
                          </div>
                      )} />
                       <Rating value={value} onChange={(e) => setValue(e.value)} style={{ width: '70px', height: '90px', marginRight: '30px',marginLeft:'120px'} } />
                      <Button type="submit"  label="Submit" className="mt-2" style={{
                   backgroundColor:'rgb(171, 146, 165)'}}/>
                     
                  </form>
              )} />
          </div>
      </div>
    </div>
  );
};

