
import { useState } from 'react';
import { Form, Field } from 'react-final-form';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { Calendar } from 'primereact/calendar';
import { classNames } from 'primereact/utils';
import '../css/form.css'
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { searchrequest, updateCurrentUser } from '../Redux/slices/users';
import { BASE_URL } from '../utils/URLs';
import axios from 'axios';
import moment from 'moment';
import { InputNumber } from 'primereact/inputnumber';
import { ProfessionSelector } from "../components/profession";



export const Offer = () => {
    const [professionCode, setProfessionCode] = useState()
    const [loginError, setLoginError] = useState(false);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const validate = (data) => {
        let errors = {};

        if (!data.PriceForWork && !data.PricePerVisit) { 
            errors.PricePerVisit = 'Price for work or price per visit is required.'; 
            errors.PriceForWork = "Price for work or price per visit is required.            "
        }
        else {
            if (data.PriceForWork && !/^\d+$/.test(data.PriceForWork)) { errors.PriceForWork = 'Price for work can be only numbers.'; }
            if (data.PricePerVisit && !/^\d+$/.test(data.PricePerVisit)) { errors.PricePerVisit = 'Price per visite can be only numbers.'; }
        }

        if (!data.FromHour) { errors.FromHour = 'From hour is required.'; }
        else if (!/^(0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$/.test(data.FromHour)) { errors.FromHour = 'From hour not mutch to HH:mm format or not valdate hour.'; }
        if (!data.ToHour) { errors.ToHour = 'From hour is required.'; }
        else if (!/^(0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$/.test(data.ToHour)) { errors.ToHour = 'To hour not mutch to HH:mm format or not valdate hour.'; }
           



        return errors;
    };

    const onSubmit = async (data, form) => {
        const date = moment('', "dd/mm/yyyy")
        const hour = moment()
        // try {
        //     const url = `${BASE_URL}/User/${data.name}/${data.password}`
        //     console.log("log in", url)
        //     const response = await axios.get(url);
        //     const currentUser = response.data
        //     console.log(response.data)

        //     if (currentUser) {
        //         dispatch(updateCurrentUser(currentUser));
        //         navigate("/");
        //     }
        //     else
        //         setLoginError(true);
        // }
        // catch {
        //     setLoginError(true);

        // }
       try{
         const url = `${BASE_URL}/User/searchrequest`
            console.log("searchrequest", url)
            const response = await axios.post(url);
            const currentoffer = response.data
            console.log(response.data)

            if (currentoffer) {
                dispatch(searchrequest(currentoffer));
                navigate("/");
            }
            else
                setLoginError(true);
       }
                catch {
                        setLoginError(true);

    }}

    const isFormFieldValid = (meta) => !!(meta.touched && meta.error);
    const getFormErrorMessage = (meta) => {
        return isFormFieldValid(meta) && <small className="p-error">{meta.error}</small>;
    };


    return (
        <div className="form-demo" style={{ padding: "30px" }}>
            <div className="flex justify-content-center">
                <div className="card">
                    <Form onSubmit={onSubmit} initialValues={{ PriceForWork: '', Note: '' }} validate={validate} render={({ handleSubmit }) => (
                        <form onSubmit={handleSubmit} className="p-fluid">
                            <Field name="PriceForWork" render={({ input, meta }) => (
                                <div className="field">
                                    <span className="p-float-label">
                                        <InputText id="PriceForWork" {...input} autoFocus className={classNames({ 'p-invalid': isFormFieldValid(meta) })} />
                                        <label htmlFor="PriceForWork" className={classNames({ 'p-error': isFormFieldValid(meta) })}>Price for hour*</label>
                                    </span>
                                    {getFormErrorMessage(meta)}
                                </div>
                            )} />
                            <Field name="PricePerVisit" render={({ input, meta }) => (
                                <div className="field">
                                    <span className="p-float-label">
                                        <InputText id="PricePerVisit" {...input} autoFocus className={classNames({ 'p-invalid': isFormFieldValid(meta) })} />
                                        <label htmlFor="PricePerVisit" className={classNames({ 'p-error': isFormFieldValid(meta) })}>Price per visit</label>
                                    </span>
                                    {getFormErrorMessage(meta)}
                                </div>
                            )} />
                            <Field name="Note" render={({ input, meta }) => (
                                <div className="field">
                                    <span className="p-float-label">
                                        <InputText id="Note" {...input} autoFocus className={classNames({ 'p-invalid': isFormFieldValid(meta) })} />
                                        <label htmlFor="Note" className={classNames({ 'p-error': isFormFieldValid(meta) })}>Note</label>
                                    </span>
                                    {getFormErrorMessage(meta)}
                                </div>
                            )} />
                            <Field name="FromHour" render={({ input, meta }) => (
                                <div className="field">
                                    <span className="p-float-label">
                                        <InputText id="FromHour" {...input}  className={classNames({ 'p-invalid': isFormFieldValid(meta) })} />
                                        <label htmlFor="FromHour" className={classNames({ 'p-error': isFormFieldValid(meta) })}>From hour (HH:mm format)*</label>
                                    </span>
                                    {getFormErrorMessage(meta)}
                                </div>
                            )} />
                             <Field name="ToHour" render={({ input, meta }) => (
                                <div className="field">
                                    <span className="p-float-label">
                                        <InputText id="ToHour" {...input}  className={classNames({ 'p-invalid': isFormFieldValid(meta) })} />
                                        <label htmlFor="ToHour" className={classNames({ 'p-error': isFormFieldValid(meta) })}>To hour (HH:mm format)*</label>
                                    </span>
                                    {getFormErrorMessage(meta)}
                                </div>
                       
                            )} />

                            <Field name="date" render={({ input }) => (
                                <div className="field">
                                    <span className="p-float-label">
                                        <Calendar id="date" {...input} dateFormat="dd/mm/yy" mask="99/99/9999" showIcon />
                                        <label htmlFor="date">Date</label>

                                    </span>
                                </div>
                             )} />
                                  <Field name="choose" render={({ input,meta }) => (
                                <div className="field">
                                    <span className="p-float-label">
                                    <InputText id="choose" {...input}  className={classNames({ 'p-invalid': isFormFieldValid(meta) })} />                              
                                   
                                    <label htmlFor="choose" className={classNames({ 'p-error': isFormFieldValid(meta) })}>profession</label>

                            {setProfessionCode}
                           <ProfessionSelector setProfessionCode={setProfessionCode} />

                                    </span>
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