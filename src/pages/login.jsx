
import React, { useState } from 'react';
import { Form, Field } from 'react-final-form';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { Password } from 'primereact/password';
import { classNames } from 'primereact/utils';
import '../css/form.css'
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { updateCurrentUser } from '../Redux/slices/users';
import { BASE_URL } from '../utils/URLs';
import axios from 'axios';

export const Login = () => {

    const [loginError, setLoginError] = useState(false);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const validate = (data) => {
        let errors = {};

        if (!data.name) {
            errors.name = 'Name is required.';
        }

        if (!data.password) {
            errors.password = 'Password is required.';
        }

        return errors;
    };

    const onSubmit = async (data, form) => {
        try {
            const url = `${BASE_URL}/User/${data.name}/${data.password}`
            console.log("log in", url)
            const response = await axios.get(url);
            const currentUser = response.data
            console.log(response.data)

            if (currentUser) {
                dispatch(updateCurrentUser(currentUser));
                navigate("/");
            }
            else
                setLoginError(true);
        }
        catch {
            setLoginError(true);
  }
      

    };

    const isFormFieldValid = (meta) => !!(meta.touched && meta.error);
    const getFormErrorMessage = (meta) => {
        return isFormFieldValid(meta) && <small className="p-error">{meta.error}</small>;
    };


    return (
        <div className="form-demo" style={{ padding: "30px" }}>
            <div className="flex justify-content-center">
                <div className="card">
                    <h5 className="text-center">login</h5>
                    {/* <p className="text-center">new user? <Link to="/register" style={{ color: "blue" }}>register now</Link></p> */}
                    <Form onSubmit={onSubmit} initialValues={{ name: '', password: '' }} validate={validate} render={({ handleSubmit }) => (
                        <form onSubmit={handleSubmit} className="p-fluid">
                            <Field name="name" render={({ input, meta }) => (
                                <div className="field">
                                    <span className="p-float-label">
                                        <InputText id="name" {...input} autoFocus className={classNames({ 'p-invalid': isFormFieldValid(meta) })} />
                                        <label htmlFor="name" className={classNames({ 'p-error': isFormFieldValid(meta) })}>Name*</label>
                                    </span>
                                    {getFormErrorMessage(meta)}
                                </div>
                            )} />
                            <Field name="password" render={({ input, meta }) => (
                                <div className="field">
                                    <span className="p-float-label">
                                        <Password id="password" {...input}  className={classNames({ 'p-invalid': isFormFieldValid(meta) })} />
                                        <label htmlFor="password" className={classNames({ 'p-error': isFormFieldValid(meta) })}>Password*</label>
                                    </span>
                                    {getFormErrorMessage(meta)}
                                </div>
                            )} />
                            <Button type="submit" label="Submit" className="mt-2" />
                            {loginError ? <div style={{ padding: "5px", color: "red" }}>Some error in connected</div> : <></>}
                        </form>
                    )} />
                </div>
            </div>
        </div>
    );
}
