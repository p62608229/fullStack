
import axios from "axios";
// import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { BASE_URL } from "../utils/URLs";
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import React, { useState } from 'react';
import offer from "../Redux/slices/offer";
import moment from 'moment';




export const CheckReq = ({ requestss }) => {

    // פונקציה זו מחזירה את התאריך בלבד בפורמט הנדרש
    const formatDate = (rowData) => { 
        debugger
        return moment(rowData.date).format('YYYY-MM-DD');
    }

    const [expandedRows, setExpandedRows] = useState([]);
    const requests = useSelector(s => s.offer.searchrequest);
    const professions = useSelector(s => s.profession.profession);


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
                <Column field="date" header="Days To Work" body={formatDate} />
                <Column field="fromhour" header="fromhour"/>
                <Column field="tohour" header="tohour"/>

                <Column field="note" header="Note" />
                {/* Button column */}
                <Column headerStyle={{ width: '8rem' }} body={(rowData) => (
                    <button onClick={() => toggleDetails(rowData)}>
                        {isRowExpanded(rowData) ? 'סגור' : 'ליצירת קשר'}
                    </button>
                )} />
                {/* Details column */}
                <Column expander body={detailsTemplate} />

                {/* <Column expander body={(rowData)=>(isRowExpanded(rowData)? detailsTemplate : <div></div>)
                } /> */}

            </DataTable>
        </>
    );
};

export default CheckReq;