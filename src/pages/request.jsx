
import { useState } from 'react';
import { Form, Field } from 'react-final-form';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { Calendar } from 'primereact/calendar';
import { classNames } from 'primereact/utils';
import '../css/form.css'
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { updateCurrentUser } from '../Redux/slices/users';
import { BASE_URL } from '../utils/URLs';
import axios from 'axios';
import moment from 'moment';

import { searchOffer } from '../Redux/slices/request';
import { convertStringToNumber } from '../utils/convertStirngToNumber';
import { ProfessionSelector } from '../components/profession';
import { profession } from '../Redux/API/profession';


export const Request = () => {

    const [professionCode, setProfessionCode] = useState()
    const [loginError, setLoginError] = useState(false);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const currentUser = useSelector(s => s.users.currentUser)

    const validate = (data) => {
        let errors = {};

        // if (!data.PriceForWork && !data.PricePerVisit) { 
        //     errors.PricePerVisit = 'Price for work or price per visit is required.'; 
        //     errors.PriceForWork = "Price for work or price per visit is required.            "
        // }
        // else {
        //     if (data.PriceForWork && !/^\d+$/.test(data.PriceForWork)) { errors.PriceForWork = 'Price for work can be only numbers.'; }
        //     if (data.PricePerVisit && !/^\d+$/.test(data.PricePerVisit)) { errors.PricePerVisit = 'Price per visite can be only numbers.'; }
        // }

        if (!data.fromhour) { errors.fromhour = 'From hour is required.'; }
        else if (!/^(0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$/.test(data.fromhour)) { errors.fromhour = 'From hour not mutch to HH:mm format or not valdate hour.'; }
        if (!data.tohour) { errors.tohour = 'From hour is required.'; }
        else if (!/^(0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$/.test(data.tohour)) { errors.tohour = 'To hour not mutch to HH:mm format or not valdate hour.'; }




        return errors;
    };

    const onSubmit = async (data, form) => {

        console.log('data', data)
        debugger

        try {
            // add the req to the database

            debugger
            // const newreq = { ...data, date: "2024-05-07T09:56:38.754Z",  fromhour: convertStringToNumber(data.fromhour), tohour: convertStringToNumber(data.tohour), requestUserId: currentUser.id }
            const newreq = { ...data, date: data.date.toISOString(), fromhour: 0, tohour: 0, requestUserId: currentUser.id, city: currentUser.city, profession: professionCode }

            const ADD_REQ_URL = `${BASE_URL}/Request`
            const addOfferResponse = await axios.put(ADD_REQ_URL, newreq)
            debugger

            if (addOfferResponse.data) {
                const SERCH_OFFER_URL = `${BASE_URL}/User/searchoffer`
                const response = await axios.post(SERCH_OFFER_URL, newreq);
                debugger
                const allOffers = response.data
                console.log('all offers', allOffers)

                if (allOffers) {
                    dispatch(searchOffer(allOffers));
                    navigate("/cheqoffer");
                }
                else
                    setLoginError(true);
            }
            else {
                setLoginError(true);
            }
        }
        catch {
            setLoginError(true);

        }
    }



    const isFormFieldValid = (meta) => !!(meta.touched && meta.error);
    const getFormErrorMessage = (meta) => {
        return isFormFieldValid(meta) && <small className="p-error">{meta.error}</small>;
    };


    return (
        <div className="form-demo" style={{ padding: "30px" }}>
            <div className="flex justify-content-center">
                <div className="card">
                    <Form onSubmit={onSubmit} initialValues={null} validate={validate} render={({ handleSubmit }) => (
                        <form onSubmit={handleSubmit} className="p-fluid">
                            <Field name="note" render={({ input, meta }) => (
                                <div className="field">
                                    <span className="p-float-label">
                                        <InputText id="note" {...input} autoFocus className={classNames({ 'p-invalid': isFormFieldValid(meta) })} />
                                        <label htmlFor="note" className={classNames({ 'p-error': isFormFieldValid(meta) })}>Note</label>
                                    </span>
                                    {getFormErrorMessage(meta)}
                                </div>
                            )} />
                            <Field name="fromhour" render={({ input, meta }) => (
                                <div className="field">
                                    <span className="p-float-label">
                                        <InputText id="fromhour" {...input} className={classNames({ 'p-invalid': isFormFieldValid(meta) })} />
                                        <label htmlFor="fromhour" className={classNames({ 'p-error': isFormFieldValid(meta) })}>From hour (HH:mm format)*</label>
                                    </span>
                                    {getFormErrorMessage(meta)}
                                </div>
                            )} />
                            <Field name="tohour" render={({ input, meta }) => (
                                <div className="field">
                                    <span className="p-float-label">
                                        <InputText id="tohour" {...input} className={classNames({ 'p-invalid': isFormFieldValid(meta) })} />
                                        <label htmlFor="tohour" className={classNames({ 'p-error': isFormFieldValid(meta) })}>To hour (HH:mm format)*</label>
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

                            <Field name="choose" render={({ input, meta }) => (
                                <div className="field">
                                    <span className="p-float-label">
                                        <InputText id="choose" {...input} className={classNames({ 'p-invalid': isFormFieldValid(meta) })} />

                                        <label htmlFor="choose" className={classNames({ 'p-error': isFormFieldValid(meta) })}>profession</label>

                                        {setProfessionCode}
                                        <ProfessionSelector setProfessionCode={setProfessionCode} />

                                    </span>
                                </div>
                            )} />

                            {/* <Field name="choose" render={({ input, meta }) => (
                                <div className="field">
                                    <span className="p-float-label">
                                        <InputText id="choose" {...input} className={classNames({ 'p-invalid': isFormFieldValid(meta) })} />

                                        <label htmlFor="choose" className={classNames({ 'p-error': isFormFieldValid(meta) })}>profession</label>

                                        {setProfessionCode}
                                        <ProfessionSelector setProfessionCode={setProfessionCode} />
                                    </span>
                                </div>
                            )} /> */}

                            <Button type="submit" label="Submit" className="mt-2" />
                            {loginError ? <div style={{ padding: "5px", color: "red" }}>Some error in connected</div> : <></>}
                        </form>
                    )} />
                </div>
            </div>
        </div>
    );
}