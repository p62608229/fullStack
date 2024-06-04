
import { useEffect, useState } from 'react';
import { Form, Field } from 'react-final-form';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { Calendar } from 'primereact/calendar';
import { classNames } from 'primereact/utils';
import '../css/form.css'
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { BASE_URL } from '../utils/URLs';
import axios from 'axios';
import moment from 'moment';
import { InputNumber } from 'primereact/inputnumber';
import { ProfessionSelector } from "../components/profession";
import { searchrequest } from '../Redux/slices/offer';
import DaysOfWeek from '../components/DaysOfWeek';
import { CurrentUserOffers } from '../components/profile/currentUserOffers';



export const Offer = () => {

    const [daysToworks, setDaysToworks] = useState()
    // const[selectedProfessionCode,setSetSelectedProfessionCode]=useState()
    const [professionCode, setProfessionCode] = useState()
    const [loginError, setLoginError] = useState(false);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const currentUser = useSelector(state => state.users.currentUser)

    useEffect(()=>{
           }, [professionCode])
    const validate = (data) => {
        let errors = {};

        if (!data.priceForWork && !data.pricePerVisit) {
            errors.pricePerVisit = 'Price for work or price per visit is required.';
            errors.priceForWork = "Price for work or price per visit is required.            "
        }
        else {
            if (data.priceForWork && !/^\d+$/.test(data.priceForWork)) { errors.priceForWork = 'Price for work can be only numbers.'; }
            if (data.pricePerVisit && !/^\d+$/.test(data.pricePerVisit)) { errors.pricePerVisit = 'Price per visite can be only numbers.'; }
        }

        // if (!data.FromHour) { errors.FromHour = 'From hour is required.'; }
        // else if (!/^(0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$/.test(data.FromHour)) { errors.FromHour = 'From hour not mutch to HH:mm format or not valdate hour.'; }
        // if (!data.ToHour) { errors.ToHour = 'From hour is required.'; }
        // else if (!/^(0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$/.test(data.ToHour)) { errors.ToHour = 'To hour not mutch to HH:mm format or not valdate hour.'; }




        return errors;
    };

    const onSubmit1 = async (data, form) => {

        debugger
        try {
            // add the offer to the database
            const newOffer = { ...data, daysToworks: daysToworks, profession: professionCode.professionCode , offerCode: Math.floor(Math.random() * 90000) + 10000, offerUserId: currentUser.id }   // for delete 
            // const newOffer = data   // offer code will be come identity
            const ADD_OFFER_URL = `${BASE_URL}/offer/newoffer`
            debugger
            const addOfferResponse = await axios.put(ADD_OFFER_URL, newOffer)


            debugger
            if (addOfferResponse.data) {
                const SERCH_REQ_URL = `${BASE_URL}/User/searchrequest`
                const response = await axios.post(SERCH_REQ_URL, newOffer);
                debugger
                const allRequest = await response.data
                console.log('requests',allRequest)
                debugger

                if (allRequest) {
                    console.log('all reqest', allRequest)
                    dispatch(searchrequest(allRequest));
                    navigate("/cheqreq");
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
                    <Form onSubmit={onSubmit1} initialValues={{ note: '' }} validate={validate} render={({ handleSubmit }) => (
                        <form onSubmit={handleSubmit} className="p-fluid">
                            <Field name="priceForWork" render={({ input, meta }) => (
                                <div className="field">
                                    <span className="p-float-label">
                                        <InputText id="priceForWork" {...input} autoFocus className={classNames({ 'p-invalid': isFormFieldValid(meta) })} />
                                        <label htmlFor="priceForWork" className={classNames({ 'p-error': isFormFieldValid(meta) })}>Price for hour*</label>
                                    </span>
                                    {getFormErrorMessage(meta)}
                                </div>
                            )} />
                            <Field name="pricePerVisit" render={({ input, meta }) => (
                                <div className="field">
                                    <span className="p-float-label">
                                        <InputText id="pricePerVisit" {...input} autoFocus className={classNames({ 'p-invalid': isFormFieldValid(meta) })} />
                                        <label htmlFor="pricePerVisit" className={classNames({ 'p-error': isFormFieldValid(meta) })}>Price per visit</label>
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
                            {/* <Field name="FromHour" render={({ input, meta }) => (
                                <div className="field">
                                    <span className="p-float-label">
                                        <InputText id="FromHour" {...input} className={classNames({ 'p-invalid': isFormFieldValid(meta) })} />
                                        <label htmlFor="FromHour" className={classNames({ 'p-error': isFormFieldValid(meta) })}>From hour (HH:mm format)*</label>
                                    </span>
                                    {getFormErrorMessage(meta)}
                                </div>
                            )} />
                            <Field name="ToHour" render={({ input, meta }) => (
                                <div className="field">
                                    <span className="p-float-label">
                                        <InputText id="ToHour" {...input} className={classNames({ 'p-invalid': isFormFieldValid(meta) })} />
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
                            )} /> */}
                            <Field name="choose" render={({ input, meta }) => (
                                    <span className="p-float-label">
                                        {/* <InputText id="choose" {...input} className={classNames({ 'p-invalid': isFormFieldValid(meta) })} /> */}

                                        {/* <label htmlFor="choose" className={classNames({ 'p-error': isFormFieldValid(meta) })}>profession</label> */}

                                        {/* {setProfessionCode } */}

                                        
                                        < ProfessionSelector setProfessionCode={setProfessionCode} professionCode={professionCode} />
                                
                                    </span >
                                    
                            )} />
                            
                            {/* <Field name="city" render={({ input, meta }) => (
                                <div className="field">
                                    <span className="p-float-label">
                                        <InputText id="city" {...input} autoFocus className={classNames({ 'p-invalid': isFormFieldValid(meta) })} />
                                        <label htmlFor="city" className={classNames({ 'p-error': isFormFieldValid(meta) })}>city</label>
                                    </span>
                                    {getFormErrorMessage(meta)}
                                </div> */}
                            {/* )} />    */}

                            <Button type="submit" label="Submit" className="mt-2" />
                            {loginError ? <div style={{ padding: "5px", color: "red" }}>Some error in connected</div> : <></>}


                        </form>
                    )} />
                    <DaysOfWeek setDaysToworks={setDaysToworks} />


                </div>
            </div>
        </div>
    );
}



