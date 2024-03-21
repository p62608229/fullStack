

import { Form, Field } from 'react-final-form';
import { useDispatch, useSelector } from 'react-redux';
import { classNames } from 'primereact/utils';
import { Button } from 'primereact/button';
import { useNavigate } from 'react-router-dom';
import { AddComment } from '../../Redux/API/comment';
import { InputTextarea } from 'primereact/inputtextarea';


export const Addcomment = (props) => {

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const currentUser = useSelector(state => state.users.currentUser);

  const validate = (data) => {
    let errors = {};

    if (!data.commentv) {
      errors.commentv = 'required provider comment.';
    }

    return errors;

};

  const onSubmit = (data) => {
    const newComment = {
      namecomment: currentUser.name,
      ContentCommentv: data.commentv,
      CommentUserId: currentUser.id,
    }
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
                  <form onSubmit={handleSubmit} className="p-fluid">
                      <Field name="commentv" render={({ input, meta }) => (
                          <div className="field">
                              <span className="p-float-label">
                                  <InputTextarea id="commentv" {...input}  autoFocus className={classNames({ 'p-invalid': isFormFieldValid(meta) })}  rows={5} cols={30} />
                                  <label htmlFor="commentv" className={classNames({ 'p-error': isFormFieldValid(meta) })}>Please add your comment:</label>
                              </span>
                              {getFormErrorMessage(meta)}
                          </div>
                      )} />
                      <Button type="submit" label="Submit" className="mt-2" />
                  </form>
              )} />
          </div>
      </div>
    </div>
  );
};

