import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Toast } from 'primereact/toast';
import { Form, Field } from 'react-final-form';

import { deleteCurrentUserOneOffer, getAllCurrentUserOffers, updateCurrentUserOneOffer } from '../../Redux/API/offer';
import { InputText } from 'primereact/inputtext';
import { Calendar } from 'primereact/calendar';
import { AddMatchedDetails } from './addMatchedDetails';
import { profession } from '../../Redux/API/profession';
import moment from 'moment';
import DaysOfWeek from '../../components/DaysOfWeek';
import { Checkbox } from 'primereact/checkbox';
import { updateOneCurrentUserOffers } from '../../Redux/slices/offer';
import { updateCurrentUser } from '../../Redux/slices/users';
import { Alert } from 'react-bootstrap';
import { classNames } from 'primereact/utils';



export const CurrentUserOffers = () => {
  // const formatDate = (rowData) =>{  
  //   const days = rowData.daysToworks.map(q => q.date).join(",")
  //   return days
  // }
  const formatDate = (rowData) => {
       if (rowData && rowData.daysToworks) {
      const days = rowData.daysToworks.map(q => q.date).join(",");
      return days;
    }}
    const formatDatee = (rowData) => {
      if (rowData && rowData.daysToworks) {
     const days = rowData.daysToworks.map(q => q.fromhour).join(",");
     return days;
   }}
  // const formatDate = (rowData) => moment(rowData.daysToworks.map(dayObj => dayObj.date));
  // const days = rowData.daysToworks.map(dayObj => dayObj.date)
  const [editRowData, setEditRowData] = useState(null); // השימוש במשתנה לאירוע שורתי עריכה בלב 
  const [daysToworks, setDaysToworks] = useState()
  const [error, setError] = useState('');

const offerCode = useSelector(s => s.users.currentUser.id);
const [checkedDays, setCheckedDays] = useState([]);
  const dispatch = useDispatch();
  const offers = useSelector(s => s.offer.currentUserOffers);
  const professions = useSelector(s => s.profession.profession);
  const requests = useSelector(s => s.offer.searchrequest);
  const [currentRow, setCurrentRow] = useState(null);
   const [ errors,setErrors] = useState({});
  const [addToCalnderStatus, setAddToCalnderStatus] = useState(false);
  const toast = React.useRef(null);
    const [value, setValue] = useState(); // משתמש באסטייט לאיתחול השדה ולניהול שינויים

  useEffect(() => {
    debugger
    if (!offers)
      dispatch(getAllCurrentUserOffers());
    if (!professions)
      dispatch(profession())
  }, []);

  const validateData = (rowData) => {
    debugger
    const errors = {};

    if (!rowData.priceForWork && !rowData.pricePerVisit) {
      errors.PricePerVisit = 'Price for work or price per visit is required.';
      errors.PriceForWork = 'Price for work or price per visit is required.';
    } else {
      if (rowData.priceForWork && !/^\d+$/.test(rowData.priceForWork)) {
        errors.PriceForWork = 'Price for work can be only numbers.';
      }
      if (rowData.pricePerVisit && !/^\d+$/.test(rowData.pricePerVisit)) {
        errors.PricePerVisit = 'Price per visit can be only numbers.';
      }
    }

    if (!rowData.fromHour) {
      errors.FromHour = 'From hour is required.';
    } else if (!/^(0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$/.test(rowData.fromHour)) {
      errors.FromHour = 'From hour does not match HH:mm format or is not a valid hour.';
    }

    if (!rowData.toHour) {
      errors.ToHour = 'To hour is required.';
    } else if (!/^(0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$/.test(rowData.toHour)) {
      errors.ToHour = 'To hour does not match HH:mm format or is not a valid hour.';
    }

    return errors;
  };

  const onEdit = (rowData) => {
    setEditRowData({ ...rowData }); // שמירה של השורה הנוכחית לעריכה בלבד
  };
  
  
  

  const onDelete = (rowData) => {
    dispatch(deleteCurrentUserOneOffer(rowData.offerCode))
    showToast('success', 'Success', 'Row deleted successfully');
  };

  const showToast = (severity, summary, detail) => {
    toast.current.show({ severity, summary, detail, life: 3000 });
  };

  const onAddToCalendar = (rowData) => {
    if (rowData.Calander) {
    }
    else {
      setCurrentRow(rowData)
      setAddToCalnderStatus(true);

    }

  };

  const renderDeleteButton = (rowData) => {
    return (
      <div className="icon-button" onClick={() => onDelete(rowData)}>
        <i className="pi pi-trash"></i>
      </div>
    );
  };

  const renderAddToCalendarButton = (rowData) => {
    return (
      <div className="icon-button" onClick={() => onAddToCalendar(rowData)}>
        <i className={rowData.Calander ? "pi pi-calendar-minus" : "pi pi-calendar-plus"}></i>
      </div>
    );
  };
  const renderDaysToWork = (rowData) => {
   
           
     
         
      const handleCheckboxChange = (day) => {
        const updatedCheckedDays = checkedDays.includes(day)
          ? checkedDays.filter((d) => d !== day)
          : [...checkedDays, day];
        setCheckedDays(updatedCheckedDays);
      };
    
      const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    
      const handleSave = () => {
        const daysToWorks = checkedDays.map((day) => ({
          offerCode: offerCode,
          date: day,
        }));
        setDaysToworks(handleSave);
        dispatch(updateOneCurrentUserOffers(daysToWorks))

      };
    
      return (
        <div>
          {daysOfWeek.map((day, index) => (
            <div key={index} className="p-field-checkbox">
              <Checkbox
                inputId={`day${index}`}
                value={day}
                checked={checkedDays.includes(day)}
                onChange={() => handleCheckboxChange(day)}
              />
              <label htmlFor={`day${index}`} className="p-checkbox-label">{day}</label>
            </div>
          ))}
          
          {/* <button onClick={handleSave}>Save the days</button> */}
        </div>
      );
    };
    
    
  
  
  

  
                       

  // const selectedDay = rowData.date ? moment(rowData.date).format('dddd') : '';


  // 
  // return (
    // <div>
      {/* <select */}
        // value={selectedDay}
        // onChange={(e) => {
          // const selectedDay = e.target.value;
          // console.log(selectedDay);
        // }}
      // >
        {/* <option value="">Select Day</option> */}
        {/* {daysOfWeek.map((day) => ( */}
          // <option key={day} value={day}>
            {/* {day} */}
          {/* </option> */}
        // ))}
      {/* </select> */}
      {/* {selectedDay && ( */}
        // <div style={{ marginTop: '5px' }}>
          {/* Selected Day: {selectedDay} */}
        {/* </div> */}
      // )}
    {/* </div> */}
  // );
// };
 
                                                                                                             
                                      
 
 
  
  
   
  
        
  const renderProfession = (rowData) => {
    return (
      <div>
        {professions && professions.find(p => p.professionCode == rowData.profession)?.profession1}
      </div>
    );
  };

  const renderInputText = (rowData, field) => {
  
    
    const handleInputChange = (newValue) => {
      // בדיקה האם הערך הוא מספר ואם הוא גדול מ־1
      if (/^\d+$/.test(newValue) && parseInt(newValue) > 1) {
        dispatch(updateOneCurrentUserOffers({
          ...rowData,
          [field]: newValue
        }));
      } else {
        console.log('הסכום חייב להיות מספר וגדול מ־1');
        // אפשר להוסיף כאן טיפול נוסף, למשל להציג הודעת שגיאה
      }
    };
    
    return (
      <InputText
        onChange={(e) => handleInputChange(e.target.value)}
        placeholder="הכנס סכום"
      />
    );
  }
  
  const renderInput = (rowData, field) => {
    const handleInputChange = (e) => {

    const newValue = e.target.value; // הערך החדש שנכנס
    setValue(newValue); // עדכון הערך בסטייט המקומי

    const updatedRowData = { ...rowData, [field]: newValue }; // עדכון השורה המקורית עם הערך החדש
    dispatch(updateOneCurrentUserOffers(updatedRowData)); // שליחת פעולת Redux לעדכון המצב הגלובלי
  };

  return (
    <div className="p-field">
      <label htmlFor={field}></label>
      <InputText
        id={field} 
        value={value}
        onChange={handleInputChange}
        placeholder="Enter a comment"
      />
    </div>
  );
};
const renderInputText2 = ({ rowData, field }) => {

const handleTimeChange = (newValue) => {
  if (newValue.length > 4) {
    setError('יש להזין עד 4 ספרות בלבד');
  } else {
    setError('');
    const updatedRowData = { ...rowData, [field]: newValue };
    dispatch(updateOneCurrentUserOffers(updatedRowData))
     
  
  }
};

return (
  <div>
    <InputText
      onChange={(e) => handleTimeChange(e.target.value)}
      placeholder="hour in HHMM"
    />
    {error && <div style={{ color: 'red' }}>{error}</div>}
  </div>
);
}
 
 
  // const renderDaysToWorkEditor = (props) => {
    // return (
      // <div>
        {/* <Calendar  */}
          // value={moment(props.rowData.date).toDate()} 
          // showIcon 
          // onChange={(e) => {
            // const newDate = e.value;
            // props.editorCallback({
              // ...props.rowData,
              // date: moment(newDate).format('YYYY-MM-DD')
            // });
          // }} 
        // />
{/*       */}

{/*      */}
        {/* <InputText type="text" value={currentRow ? currentRow['fromhour'] : ''} onChange={(e) => { */}
          // const newValue = e.target.value;
          // setCurrentRow((prevState) => ({
            // ...prevState,
            // 'fromhour': newValue
          // }));
        // }} placeholder="From Hour (HH:mm)" />
        {/* <InputText type="text" value={currentRow ? currentRow['tohour'] : ''} onChange={(e) => { */}
          // const newValue = e.target.value;
          // setCurrentRow((prevState) => ({
            // ...prevState,
            // 'tohour': newValue
          // }));
        // }} placeholder="To Hour (HH:mm)" />
      {/* </div> */}
    // );
  // }

  // const onRowEditSave = (event) => {
    // const errors = validateData(editRowData);
    // if (Object.keys(errors).length === 0) {
      // dispatch(updateCurrentUserOneOffer(editRowData));
      // showToast('success', 'Success', 'Row edited successfully');
      // setEditRowData(null); // איפוס השורה הנוכחית לאחר השמירה
    // } else {
      // setErrors(errors);
    // }
  // };
  const onRowEditComplete = (event) => {
    const newData = {
      ...event.data,
      daysToworks: [
        {
          dayCode: 0,
          offerCode: 0,
          date: "sunday", // Replace "string" with the actual date value if known
          fromhour: 0,
          tohour: 0
        }
      ]
    };
    debugger
    console.log("event********************",newData)
    dispatch(updateCurrentUserOneOffer(newData));
    showToast('success', 'Success', 'Row edited successfully');
    console.log("----------12")
    // dispatch(searchOffer(event.data));
    // navigate("/cheqoffer");
 };                                                     //  
  
                  
  const onRowEditCancel = () => {
    setCurrentRow(null);
    setErrors({});
  };

  return (
    <div style={{ margin: "0 40px", width: "90%" }}>
      <Toast ref={toast} />
      <DataTable value={offers}   editMode="row"  onRowEditComplete= {onRowEditComplete} paginator rows={5} rowsPerPageOptions={[5, 10, 25, 50]} tableStyle={{ minWidth: '50rem' }}>
        {/* <Column field="offerCode" header="Offer Code"></Column> */}
        {/* <Column field="offerUserId" header="Offer User ID"></Column> */}
        <Column field="profession" header="Profession" body={renderProfession}></Column>
        <Column field="priceForWork" header="Price for Work"editor={(props) => renderInputText(props.rowData, 'priceForWork')}></Column>
        <Column field="pricePerVisit" header="Price per Visit" editor={(props) => renderInputText(props.rowData, 'pricePerVisit')}></Column>
        {/* <Column field="date" header="Days to Work" body={formatDate}editor={(props) => renderDaysToWork(props.rowData, 'Days to Work')}></Column> */}
  
           <Column field="date" header="Days to Work" body={formatDate}></Column>
          <Column field='note'header="note" editor={(props) => renderInput(props.rowData, 'note')}></Column>
        {/* <Column field="date" header="Days To Work" body={formatDate} editor={renderDaysToWorkEditor}></Column> */}
        {/* <Column field="date" header="Days To Work" body={formatDate} ></Column> */}
        {/* <Column field="fromhour" header="From Hour" editor={(props) => renderInputText2(props.rowData, 'fromhour')}></Column> */}
        <Column field="fromhour" header="From Hour" body={formatDatee}></Column>

        <Column header="" body={renderAddToCalendarButton}></Column>
        <Column header="" body={renderDeleteButton}></Column>
        {/* <Column ><div><label htmlFor="tohour" >To hour</label></div></Column> */}
        <Column rowEditor rowEditorSaveIcon="pi pi-check" rowEditorCancelIcon="pi pi-times" headerStyle={{ width: '10%', minWidth: '8rem' }} bodyStyle={{ textAlign: 'center' }}  onRowEditCancel={onRowEditCancel}></Column>
      </DataTable>
      {addToCalnderStatus &&   <AddMatchedDetails showToast={showToast} setAddToCalnderStatus = {setAddToCalnderStatus} type="request" eventId={currentRow.requestCode} setCurrentRow={setCurrentRow}/> } 
      </div>
  
  );
};
