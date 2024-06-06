
// import axios from "axios";
// import { useSelector } from "react-redux";
// import { useLocation } from "react-router-dom";
// import { BASE_URL } from "../utils/URLs";
// import React, { useState, useEffect } from 'react';
// import { DataTable } from 'primereact/datatable';
// import { Column } from 'primereact/column';




// export const CheckOffer = () => {

//     const offers = useSelector(s => s.request.searchOffer);

//     console.log(offers, "oferrrrrrrrrrrr")
//     // const professions = useSelector(s => s.profession.profession);

//     return (
//         <>

//             {/* {
//                 offers.map(r =>
//                     <div>{r.pricePerVisit}{r.profession}</div>)
//             } */}
//             <h1> המערכת מצאה עבורך {offers.length} אפשרויות </h1>


//             <DataTable value={offers} tableStyle={{ minWidth: '50rem' }}>
//                 <Column field="profession" header="Profession" ></Column>
//                 <Column field="days To workst" header="DaysToworks"></Column>
//                 <Column field="note" header="Note"></Column>
//              .
                
//             </DataTable>
                

//         </>
//     )
// }


import axios from "axios";
// import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { BASE_URL } from "../utils/URLs";
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import React, { useState } from 'react';
import offer from "../Redux/slices/offer";
import moment from 'moment';
import request from "../Redux/slices/request";
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import {eventsByCode} from '../Redux/API/calendar'




export const Checkoffer = ({ offerss }) => {
   
        // פונקציה זו מחזירה את התאריך בלבד בפורמט הנדרש
       const formatDaysToWork = (rowData) => {
              const days = rowData.daysToworks.map(dayObj => dayObj.date).join(", ");
              return days;
          }
          const [formattedInput, setFormattedInput] = useState('');

          const addColonToNumbers = (str) => {
            return str.replace(/(\d{2})(?=\d)/g, '$1:');
          };
      const formatthours = (rowData) => {
              const hours = rowData.daysToworks.map(k => k.tohour).join(", ");
              return hours;
          }
      const formathours = (rowData) => {
              const hours = rowData.daysToworks.map(k => k.fromhour).join(", ");
              return hours;
          }
          const handleChange = (event) => {
            const inputValue = event.target.value; // קבלת הערך שהמשתמש מזין
            const formattedInput = addColonToNumbers(inputValue); // החלת הפורמט לערך שהוזן על ידי המשתמש
            // עכשיו נשתמש בערך המעוצב להצגה בממשק המשתמש
            console.log(formattedInput); // כדי לוודא שהפורמט נכון
            // או
            setFormattedInput(formattedInput); // אם תרצה לשמור את הערך המעוצב בסטייט או לעשות משהו אחר איתו
          };
          
          // בתוך התגית input ברוב המקרים
          <input type="text" onChange={handleChange} />
          
         
         
         
         
         
         
         
         
         
         
         
         
         
          
          
          
          
          
          
        
        
    const [expandedRows, setExpandedRows] = useState([]);
    const offers = useSelector(s => s.request.searchoffer);
    const request=useSelector(o=> o.offer.searchrequest);
    const professions = useSelector(s => s.profession.profession);
    const navigate = useNavigate()

const dispatch=useDispatch();
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
                <p>Name: {rowData.userO.firstName}</p>
                <p>Phone: {rowData.userO.phone}</p>
                <p>Mail: {rowData.userO.mail}</p>

                {/* <div style={{ width: '100px', minWidth: '100px', minHeight: '50px', height: 'auto' }}></div> */}
                {/* <div style={{width:'100px',minWidth:'100px',  height: '120px', minHeight: '50px'}}></div> */}

            </div>):(<div style={{width:'100px',minWidth:'100px',  height: '120px', minHeight: '50px'}}></div>)}
            </>
        );
    };



    const getProfesionName = (rowData) => {
        // {professions && <select onChange={(e) => setProfessionCode(e.target.value)}><option >choose pro</option>   {professions.map((p, index) => {
        //     return <option value={p.professionCode} key={index} >{p.profession1}</option>
        // })}</select>}
        
        const currentProffesion = professions.find((p)=> p.professionCode == rowData.profession )
        console.log('proffesion', currentProffesion)
        return(
            <>
            <p>{currentProffesion.profession1}</p>
            </>
        )
    }

    const clickMeet=()=>{
        navigate("/calendar");
        dispatch(eventsByCode({ RCode: 4045, offerCode: 12612 }));

    }

    return (
        <>
            <h1>המערכת מצאה עבורך {offers.length} אפשרויות</h1>
            <DataTable value={offers} tableStyle={{ minWidth: '50rem' }}>
                <Column header="Profession" field="Profession" body={getProfesionName} />
                <Column  field="date"  header="Days To Work"body={formatDaysToWork} />
                <Column header="From Hour" body={formathours}/>
                <Column header="To Hour" body={formatthours} />
                <Column field="note" header="Note" />
                <Column field="priceForWork" header="priceForWork" />
                <Column field="pricePerVisit" header="pricePerVisit" />

                {/* Button column */}
                <Column headerStyle={{ width: '8rem' }} body={(rowData) => (
                    <button onClick={() => toggleDetails(rowData)}>
                        {isRowExpanded(rowData) ? 'סגור' : 'ליצירת קשר'}
                    </button>
                )} />
                {/* Details column */}
                <Column expander body={detailsTemplate} />
                <Column headerStyle={{ width: '8rem' }} body={(rowData) => (
                    <button onClick={clickMeet}>תואמה פגישה                  

                    </button>
                )} />

                {/* <Column expander body={(rowData)=>(isRowExpanded(rowData)? detailsTemplate : <div></div>)
                } /> */}

            </DataTable>
        </>
    );
};

export default Checkoffer;