
import React, { useState } from 'react';
import { Form, Field } from 'react-final-form';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { Password } from 'primereact/password';
import { Divider } from 'primereact/divider';
import { classNames } from 'primereact/utils';
import '../css/form.css'
import { useNavigate } from 'react-router';
import { useDispatch } from 'react-redux';
import axios from 'axios';
import { BASE_URL } from '../utils/URLs';
import { updateCurrentUser } from '../Redux/slices/users';
import { InputMask } from 'primereact/inputmask';


export const Register = () => {

    const [newUserError, setnewUserError] = useState(null);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const validate = (data) => {
        let errors = {};

        if (!data.id) { errors.name = 'id is required.'; }
        if (!data.firstName) { errors.firstName = 'First name is required.'; }
        if (!data.lastName) { errors.lastName = 'Last name is required.'; }
        if (!data.password) { errors.password = 'Password is required.'; }
        if (!data.address) { errors.address = 'address is required.'; }
        if (!data.postalcode) { errors.postalcode = 'postalcode is required.'; }
        if (!data.city) { errors.city = 'city is required.'; }
        if (!data.phone) { errors.phone = 'phone is required.'; }
        // else if (/^[0-9\b]+$/.test(data.phone)) { errors.phone = 'Invalid phone number/ put only numbers' }
        if (!data.mail) { errors.mail = 'Email is required.'; }
        else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(data.mail)) { errors.mail = 'Invalid email address. E.g. example@email.com'; }

        return errors;
    };

    const onSubmit = async (data, form) => {
        try {
            const user = { ...data }
            const url = `${BASE_URL}/User`

            console.log("newUser", typeof (JSON.stringify(user)))
            const response = await axios.put(url, user);

            const currentUser = response.data
            console.log(response.data, "response")
            dispatch(updateCurrentUser(currentUser));
            if (response.data) {
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
                    <Form onSubmit={onSubmit} initialValues={{ id: "", firstName: '', lastName: '', password: '', address: '', postalcode: '', city: '', houseNumber: null, mail: '', phone: null }} validate={validate} render={({ handleSubmit }) => (
                        <form onSubmit={handleSubmit} className="p-fluid">
                            {/*        ======= id ===== */}
                            <Field name="id" render={({ input, meta }) => (
                                <div className="field">
                                    <span className="p-float-label">
                                        <InputText id="id" {...input} autoFocus className={classNames({ 'p-invalid': isFormFieldValid(meta) })} />
                                        <label htmlFor="id" className={classNames({ 'p-error': isFormFieldValid(meta) })}>id*</label>
                                    </span>
                                    {getFormErrorMessage(meta)}
                                </div>
                            )} />
                            {/*        ======= first name ===== */}
                            <Field name="firstName" render={({ input, meta }) => (
                                <div className="field">
                                    <span className="p-float-label">
                                        <InputText id="firstName" {...input} className={classNames({ 'p-invalid': isFormFieldValid(meta) })} />
                                        <label htmlFor="firstName" className={classNames({ 'p-error': isFormFieldValid(meta) })}>First Name*</label>
                                    </span>
                                    {getFormErrorMessage(meta)}
                                </div>
                            )} />
                            {/*        ======= last name ===== */}
                            <Field name="lastName" render={({ input, meta }) => (
                                <div className="field">
                                    <span className="p-float-label">
                                        <InputText id="lastName" {...input} className={classNames({ 'p-invalid': isFormFieldValid(meta) })} />
                                        <label htmlFor="lastName" className={classNames({ 'p-error': isFormFieldValid(meta) })}>Last Name*</label>
                                    </span>
                                    {getFormErrorMessage(meta)}
                                </div>
                            )} />
                            {/*        ======= eamil ===== */}
                            <Field name="mail" render={({ input, meta }) => (
                                <div className="field">
                                    <span className="p-float-label p-input-icon-right">
                                        <i className="pi pi-envelope" />
                                        <InputText id="mail" {...input} className={classNames({ 'p-invalid': isFormFieldValid(meta) })} />
                                        <label htmlFor="mail" className={classNames({ 'p-error': isFormFieldValid(meta) })}>Email*</label>
                                    </span>
                                    {getFormErrorMessage(meta)}
                                </div>
                            )} />
                            {/*        ======= password ===== */}
                            <Field name="password" render={({ input, meta }) => (
                                <div className="field">
                                    <span className="p-float-label">
                                        <Password id="password" {...input} toggleMask className={classNames({ 'p-invalid': isFormFieldValid(meta) })} header={passwordHeader} footer={passwordFooter} />
                                        <label htmlFor="password" className={classNames({ 'p-error': isFormFieldValid(meta) })}>password*</label>
                                    </span>
                                    {getFormErrorMessage(meta)}
                                </div>
                            )} />
                            {/*        ======= phone  ===== */}
                            <Field name="phone" render={({ input, meta }) => (
                                <div className="field">
                                    <span className="p-float-label">
                                        <i className="pi pi-phone" />
                                        <InputText id="phone" {...input} className={classNames({ 'p-invalid': isFormFieldValid(meta) })}></InputText>
                                        <label htmlFor="phone" className={classNames({ 'p-error': isFormFieldValid(meta) })}>phone*</label>
                                    </span>
                                    {getFormErrorMessage(meta)}
                                </div>
                            )} />
                            {/*        ======= adrsee  ===== */}
                            <Field name="address" render={({ input, meta }) => (
                                <div className="field">
                                    <span className="p-float-label">
                                        <InputText id="address" {...input} className={classNames({ 'p-invalid': isFormFieldValid(meta) })} />
                                        <label htmlFor="address" className={classNames({ 'p-error': isFormFieldValid(meta) })}>address*</label>
                                    </span>
                                    {getFormErrorMessage(meta)}
                                </div>
                            )} />
                            {/*        ======= city  ===== */}
                            <Field name="city" render={({ input, meta }) => (
                                <div className="field">
                                    <span className="p-float-label">
                                        <InputText id="city" {...input} className={classNames({ 'p-invalid': isFormFieldValid(meta) })} />
                                        <label htmlFor="city" className={classNames({ 'p-error': isFormFieldValid(meta) })}>city*</label>
                                    </span>
                                    {getFormErrorMessage(meta)}
                                </div>
                            )} />
                            {/*        ======= houseNumber  ===== */}
                            <Field name="houseNumber" render={({ input, meta }) => (
                                <div className="field">
                                    <span className="p-float-label">
                                        <InputText id="houseNumber" {...input} className={classNames({ 'p-invalid': isFormFieldValid(meta) })} />
                                        <label htmlFor="houseNumber" className={classNames({ 'p-error': isFormFieldValid(meta) })}>houseNumber*</label>
                                    </span>
                                    {getFormErrorMessage(meta)}
                                </div>
                            )} />
                            {/*        ======= postalcode  ===== */}
                            <Field name="postalcode" render={({ input, meta }) => (
                                <div className="field">
                                    <span className="p-float-label">
                                        <InputText id="postalcode" {...input} className={classNames({ 'p-invalid': isFormFieldValid(meta) })} />
                                        <label htmlFor="postalcode" className={classNames({ 'p-error': isFormFieldValid(meta) })}>postalcode*</label>
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
