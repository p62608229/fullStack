
import React, { useState } from 'react';
import { Form, Field } from 'react-final-form';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { Password } from 'primereact/password';
import { Divider } from 'primereact/divider';
import { classNames } from 'primereact/utils';
import '../css/form.css'
import { useNavigate } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { BASE_URL } from '../utils/URLs';
import { updateCurrentUser } from '../Redux/slices/users';
import { InputMask } from 'primereact/inputmask';


export const EditProfile = () => {

    const [newUserError, setnewUserError] = useState(null);
    const currentUser = useSelector(s => s.users.currentUser)
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const validate = (data) => {
        let errors = {};

        if (!data.Id) { errors.name = 'Id is required.'; }
        if (!data.FirstName) { errors.FirstName = 'First name is required.'; }
        if (!data.LastName) { errors.LastName = 'Last name is required.'; }
        if (!data.Password) { errors.Password = 'Password is required.'; }
        if (!data.Address) { errors.Address = 'Address is required.'; }
        if (!data.Postalcode) { errors.Postalcode = 'Postalcode is required.'; }
        if (!data.City) { errors.City = 'City is required.'; }
        if (!data.Phone) { errors.Phone = 'Phone is required.'; }
        else if (/^[0-9\b]+$/.test(data.Phone)) { errors.Phone = 'Invalid phone number/ put only numbers' }
        if (!data.Mail) { errors.Mail = 'Email is required.'; }
        else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(data.Mail)) { errors.Mail = 'Invalid email address. E.g. example@email.com'; }

        return errors;
    };

    const onSubmit = async (data, form) => {
        try {
            const user = { ...data }
            const url = `${BASE_URL}/Users`

            console.log("editUser", typeof (JSON.stringify(user)))
            const response = await axios.put(url, user);

            const currentUser = response.data
            console.log(response.data, "response")
            if (response.data) {
                dispatch(updateCurrentUser(currentUser));
                navigate("/");
            }
            else {
                setnewUserError("some error")
            }
        } catch (e) {
            setnewUserError("some error")

        }
    };

    const isFormFieldValid = (meta) => !!(meta.touched && meta.error);
    const getFormErrorMessage = (meta) => {
        return isFormFieldValid(meta) && <small className="p-error">{meta.error}</small>;
    };

    const passwordHeader = <h6>Pick a password</h6>;
    const passwordFooter = (
        <React.Fragment>
            <Divider />
            <p className="mt-2">Suggestions</p>
            <ul className="pl-2 ml-2 mt-0" style={{ lineHeight: '1.5' }}>
                <li>At least one lowercase</li>
                <li>At least one uppercase</li>
                <li>At least one numeric</li>
                <li>Minimum 8 characters</li>
            </ul>
        </React.Fragment>
    );

    return (
        <div className="form-demo">
            <div className="flex justify-content-center">
                <div className="card">
                    <h5 className="text-center">Register</h5>
                    <Form onSubmit={onSubmit} initialValues={{...currentUser }} validate={validate} render={({ handleSubmit }) => (
                        <form onSubmit={handleSubmit} className="p-fluid">
                            {/*        ======= id ===== */}
                            <Field name="Id" render={({ input, meta }) => (
                                <div className="field">
                                    <span className="p-float-label">
                                        <InputText id="Id" {...input} autoFocus className={classNames({ 'p-invalid': isFormFieldValid(meta) })} />
                                        <label htmlFor="Id" className={classNames({ 'p-error': isFormFieldValid(meta) })}>Id*</label>
                                    </span>
                                    {getFormErrorMessage(meta)}
                                </div>
                            )} />
                            {/*        ======= first name ===== */}
                            <Field name="FirstName" render={({ input, meta }) => (
                                <div className="field">
                                    <span className="p-float-label">
                                        <InputText id="FirstName" {...input} className={classNames({ 'p-invalid': isFormFieldValid(meta) })} />
                                        <label htmlFor="FirstName" className={classNames({ 'p-error': isFormFieldValid(meta) })}>First Name*</label>
                                    </span>
                                    {getFormErrorMessage(meta)}
                                </div>
                            )} />
                            {/*        ======= last name ===== */}
                            <Field name="LastName" render={({ input, meta }) => (
                                <div className="field">
                                    <span className="p-float-label">
                                        <InputText id="LastName" {...input} className={classNames({ 'p-invalid': isFormFieldValid(meta) })} />
                                        <label htmlFor="LastName" className={classNames({ 'p-error': isFormFieldValid(meta) })}>Last Name*</label>
                                    </span>
                                    {getFormErrorMessage(meta)}
                                </div>
                            )} />
                            {/*        ======= eamil ===== */}
                            <Field name="Mail" render={({ input, meta }) => (
                                <div className="field">
                                    <span className="p-float-label p-input-icon-right">
                                        <i className="pi pi-envelope" />
                                        <InputText id="Mail" {...input} className={classNames({ 'p-invalid': isFormFieldValid(meta) })} />
                                        <label htmlFor="Mail" className={classNames({ 'p-error': isFormFieldValid(meta) })}>Email*</label>
                                    </span>
                                    {getFormErrorMessage(meta)}
                                </div>
                            )} />
                            {/*        ======= password ===== */}
                            <Field name="Password" render={({ input, meta }) => (
                                <div className="field">
                                    <span className="p-float-label">
                                        <Password id="Password" {...input} toggleMask className={classNames({ 'p-invalid': isFormFieldValid(meta) })} header={passwordHeader} footer={passwordFooter} />
                                        <label htmlFor="Password" className={classNames({ 'p-error': isFormFieldValid(meta) })}>Password*</label>
                                    </span>
                                    {getFormErrorMessage(meta)}
                                </div>
                            )} />
                            {/*        ======= Phone  ===== */}
                            <Field name="Phone" render={({ input, meta }) => (
                                <div className="field">
                                    <span className="p-float-label p-input-icon-right">
                                        <i className="pi pi-phone" />
                                        <InputMask id="Phone" mask="(999) 999-9999" {...input}  className={classNames({ 'p-invalid': isFormFieldValid(meta) })}></InputMask>
                                        <label htmlFor="Phone" className={classNames({ 'p-error': isFormFieldValid(meta) })}>Phone*</label>
                                    </span>
                                    {getFormErrorMessage(meta)}
                                </div>
                            )} />
                            {/*        ======= adrsee  ===== */}
                            <Field name="Address" render={({ input, meta }) => (
                                <div className="field">
                                    <span className="p-float-label">
                                        <InputText id="Address" {...input} className={classNames({ 'p-invalid': isFormFieldValid(meta) })} />
                                        <label htmlFor="Address" className={classNames({ 'p-error': isFormFieldValid(meta) })}>Address*</label>
                                    </span>
                                    {getFormErrorMessage(meta)}
                                </div>
                            )} />
                            {/*        ======= City  ===== */}
                            <Field name="City" render={({ input, meta }) => (
                                <div className="field">
                                    <span className="p-float-label">
                                        <InputText id="City" {...input} className={classNames({ 'p-invalid': isFormFieldValid(meta) })} />
                                        <label htmlFor="City" className={classNames({ 'p-error': isFormFieldValid(meta) })}>City*</label>
                                    </span>
                                    {getFormErrorMessage(meta)}
                                </div>
                            )} />
                            {/*        ======= Postalcode  ===== */}
                            <Field name="Postalcode" render={({ input, meta }) => (
                                <div className="field">
                                    <span className="p-float-label">
                                        <InputText id="Postalcode" {...input} className={classNames({ 'p-invalid': isFormFieldValid(meta) })} />
                                        <label htmlFor="Postalcode" className={classNames({ 'p-error': isFormFieldValid(meta) })}>Postalcode*</label>
                                    </span>
                                    {getFormErrorMessage(meta)}
                                </div>
                            )} />
                            <Button type="submit" label="Submit" className="mt-2" />
                            {newUserError ? <div style={{ padding: "5px", color: "red" }}>{newUserError}</div> : <></>}
                        </form>
                    )} />
                </div>
            </div>
        </div>
    );
}
