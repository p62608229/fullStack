
import axios from "axios";
// import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { BASE_URL } from "../utils/URLs";
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import React, { useState } from 'react';
import offer from "../Redux/slices/offer";
import moment from 'moment';
import {eventsByCode} from '../Redux/API/calendar'





export const CheckReq = ({ requestss }) => {

    const navigate = useNavigate()  
    const dispatch = useDispatch()

    // פונקציה זו מחזירה את התאריך בלבד בפורמט הנדרש
    const formatDate = (rowData) => { 
        debugger
        return moment(rowData.date).format('YYYY-MM-DD');
    }
   
   
   
   
   
    const clickMeet=(rowData)=>{
        dispatch(eventsByCode({ RCode: offer.requestCode, offerCode: offer.offerCode }));
        navigate("/calendar");

    }
    const [expandedRows, setExpandedRows] = useState([]);
    const requests = useSelector(s => s.offer.searchrequest);
    const professions = useSelector(s => s.profession.profession);
    const offer = useSelector(s=>s.request.searchoffer)


    const toggleDetails = (rowData) => {
        const expandedRowsCopy = [...expandedRows];
        const rowIndex = expandedRowsCopy.indexOf(rowData);
        console.log("Toggling details for row:", rowData);
        console.log("Expanded rows before:", expandedRows);
        if (rowIndex !== -1) {
            const expandedRowsCopy = [...expandedRows];
            expandedRowsCopy.splice(rowIndex, 1); // מסירה את השורה מהמערך
            setExpandedRows(expandedRowsCopy);
        } else {
            setExpandedRows([...expandedRows, rowData]);
        }
    };

    const isRowExpanded = (rowData) => {
        console.log("Toggling details for row:", rowData);
        console.log("Expanded rows before:", expandedRows);

        return expandedRows.includes(rowData);
    };
   
   
   
   
   

    const detailsTemplate = (rowData) => {
        console.log('row data:', rowData)

        let show = isRowExpanded(rowData)
        return (
            <>  {show ? (<div>
                {/* <p>Additional details for {rowData.profession}</p> */}
                <p>Name: {rowData.userR.firstName}</p>
                <p>Phone: {rowData.userR.phone}</p>
                <p>Mail: {rowData.userR.mail}</p>

                {/* <div style={{ width: '100px', minWidth: '100px', minHeight: '50px', height: 'auto' }}></div> */}
                {/* <div style={{width:'100px',minWidth:'100px',  height: '120px', minHeight: '50px'}}></div> */}

            </div>) : (<div style={{ width: '100px', minWidth: '220px', height: '120px', minHeight: '50px' }}></div>)}
            </>
        );
    };
    const formathours1 = (rowData) => {
        if (rowData && rowData.fromhour) {
            const fullHour = rowData.tohour.toString();
            const hours = fullHour.slice(0, 2);
            const minutes = fullHour.slice(2);
            const formattedHour = `${hours}:${minutes}`;
            return formattedHour;
        } else {
            return '';
        }};
   
          
           
    const formathours = (rowData) => {
        if (rowData && rowData.fromhour) {
            const fullHour = rowData.fromhour.toString();
            const hours = fullHour.slice(0, 2);
            const minutes = fullHour.slice(2);
            const formattedHour = `${hours}:${minutes}`;
            return formattedHour;
        } else {
            return '';
        }};
   
    const getProfesionName = (rowData) => {
        // {professions && <select onChange={(e) => setProfessionCode(e.target.value)}><option >choose pro</option>   {professions.map((p, index) => {
        //     return <option value={p.professionCode} key={index} >{p.profession1}</option>
        // })}</select>}

        const currentProffesion = professions.find((p) => p.professionCode == rowData.profession)
        console.log('proffesion', currentProffesion)
        return (
            <>
                <p>{currentProffesion.profession1}</p>
            </>
        )
    }

    return (
        <>
        <h1>המערכת מצאה עבורך {requests.length} אפשרויות</h1>
        <DataTable value={requests} tableStyle={{ minWidth: '50rem' }}> 

    
                <Column header="Profession" field="Profession" body={getProfesionName} />
                <Column field="date" header="Days To Work" body={formatDate}/>
                 <Column field="fromhour" header="fromhour" body={formathours}/>
                 <Column field="tohour" header="To Hour" body={formathours1} />

                <Column field="note" header="Note" />
                {/* Button column */}
                <Column headerStyle={{ width: '8rem' }} body={(rowData) => (
                    <button onClick={() => toggleDetails(rowData)}>
                        {isRowExpanded(rowData) ? 'סגור' : 'ליצירת קשר'}
                    </button>
                    
                )} />
                {/* Details column */}
                <Column expander body={detailsTemplate} />
                <Column headerStyle={{ width: '8rem' }} body={(rowData) => (
      <button onClick={()=>clickMeet(rowData)}>תואמה פגישה               
      </button>
  )} />
                {/* <Column expander body={(rowData)=>(isRowExpanded(rowData)? detailsTemplate : <div></div>)
                } /> */}

            </DataTable>
        </>
    );
};

export default CheckReq;