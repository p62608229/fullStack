import React, { useState } from 'react';
import { Form, Field } from 'react-final-form';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { classNames } from 'primereact/utils';
import '../../css/form.css'
import { useNavigate } from 'react-router';
import { useDispatch } from 'react-redux';
import axios from 'axios';
import { BASE_URL } from '../../utils/URLs';
import { updateOneCurrentUserRequest } from '../../Redux/slices/request';
import { updateOneCurrentUserOffers } from '../../Redux/slices/offer';
import { demoOffersList } from '../../~not use/demoValues/offers';


export const AddMatchedDetails = (props) => {

    const {showToast, setAddToCalnderStatus, type, event, setCurrentRow} = props
    const [error, setError] = useState(null);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const validate = (data) => {
        let errors = {};

        if (!data.matchedName) { errors.matchedName = 'First name is required.'; }
        if (!data.matchedPhon) { errors.matchedPhon = 'Phon is required.'; }
        if (!data.matchedEmail) { errors.matchedEmail = 'Email is required.'; }
        else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(data.matchedEmail)) { errors.matchedEmail = 'Invalid email address. E.g. example@gmail.com'; }

        return errors;
    };

    const onSubmit = async (data) => {
        try {
            // צריך להוסיף קריאת שרת שתקבל את הנתונים ותחזיר לנו הצעה או בקשה מעודבדת כולל מי שתיאמנו איתו 
            // const matchedUser = {
            //     matchedName: "Avi",
            //     matchedPhon: "052715454",
            //     matchedEmail: "Avi@gmail.com",
            // }

            // type, eventId
            
            const matchedUser = { ...event,...data}
            const url =  type  == "offer" ? `${BASE_URL}/offer` : `${BASE_URL}/Request`
            const response = await axios.put(url, { matchedUser});
            console.log(response.data, "response")
            if (response.data) {
                debugger
                const currentEvent = response.data
                type == "offer" ?  dispatch(updateOneCurrentUserOffers(response.data)) : dispatch(updateOneCurrentUserRequest({eventId: event.requestCode, currentEvent: currentEvent}))
                setCurrentRow(null)
                setAddToCalnderStatus(false)
                showToast('info', 'Matched event', 'Matched event successfully');
        }
            else {
                    setError("some error")
            }
        } catch (e) {
            setError("some error")
        }
    };

    const isFormFieldValid = (meta) => !!(meta.touched && meta.error);
    const getFormErrorMessage = (meta) => {
        return isFormFieldValid(meta) && <small className="p-error">{meta.error}</small>;
    };


    return (
        <div className="form-demo" >
            <Button style={{margin: "10px 10px"}} icon="pi pi-times" rounded text raised aria-label="Filter" onClick={() => {setAddToCalnderStatus(false); setCurrentRow(null)}} />
            <div className="flex justify-content-center">
                <div className="card">
                    <h5 className="text-center">Pls put your matched details:</h5>
                    <Form onSubmit={onSubmit} initialValues={{ id: "", matchedName: '', lastName: '', password: '', address: '', postalcode: '', city: '', houseNumber: null, matchedEmail: '', matchedPhon: null }} validate={validate} render={({ handleSubmit }) => (
                        <form onSubmit={handleSubmit} className="p-fluid">
                            {/*        ======= matchedName ===== */}
                            <Field name="matchedName" render={({ input, meta }) => (
                                <div className="field">
                                    <span className="p-float-label">
                                        <InputText id="matchedName" {...input} className={classNames({ 'p-invalid': isFormFieldValid(meta) })} />
                                        <label htmlFor="matchedName" className={classNames({ 'p-error': isFormFieldValid(meta) })}> Name*</label>
                                    </span>
                                    {getFormErrorMessage(meta)}
                                </div>
                            )} />
                            {/*        ======= eamil ===== */}
                            <Field name="matchedEmail" render={({ input, meta }) => (
                                <div className="field">
                                    <span className="p-float-label p-input-icon-right">
                                        <i className="pi pi-envelope" />
                                        <InputText id="matchedEmail" {...input} className={classNames({ 'p-invalid': isFormFieldValid(meta) })} />
                                    </span>
                                    {getFormErrorMessage(meta)}
                                </div>
                            )} />
                            {/*        ======= matchedPhon  ===== */}
                            <Field name="matchedPhon" render={({ input, meta }) => (
                                <div className="field">
                                    <span className="p-float-label p-input-icon-right">
                                        <i className="pi pi-matchedPhon" />
                                        <InputText id="matchedPhon" {...input} className={classNames({ 'p-invalid': isFormFieldValid(meta) })}></InputText>
                                        <label htmlFor="matchedPhon" className={classNames({ 'p-error': isFormFieldValid(meta) })}>Phon*</label>
                                    </span>
                                    {getFormErrorMessage(meta)}
                                </div>
                            )} />
                            <Button type="submit" label="Submit" className="mt-2" />
                            {error ? <div style={{ padding: "5px", color: "red" }}>{error}</div> : <></>}
                        </form>
                    )} />
                </div>
            </div>
        </div>
    );
}
