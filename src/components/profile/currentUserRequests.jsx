import React, { useState, useEffect, Fragment } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Toast } from 'primereact/toast';

import { deleteCurrentUserOneRequest, getAllCurrentUserRequests, updateCurrentUser } from '../../Redux/API/request';
import {updateOneCurrentUserRequest} from '../../Redux/slices/request'
import { InputText } from 'primereact/inputtext';
import { Calendar } from 'primereact/calendar';
import { AddMatchedDetails } from './addMatchedDetails';
import { profession } from '../../Redux/API/profession';

import moment from 'moment';

export const CurrentUserRequests = () => {
  const formatDate = (rowData) => { 
    debugger
    return moment(rowData.date).format('YYYY-MM-DD');
}
  const dispatch = useDispatch();
  const requests = useSelector(s => s.request.currentUserRequests);
  const professions = useSelector(s => s.profession.profession);
  

  const onEditDate = (newDate, rowData) => {
    console.log("ROWDATA",rowData)
    const updatedRow = { ...rowData, date: moment(newDate).format('YYYY-MM-DD') };
    // dispatch(updateCurrentUserOneRequest(updatedRow)); // עדכון באמצעות פעולת Redux
    dispatch(updateOneCurrentUserRequest(updatedRow))

  };
  const [currentRow, setCurrentRow] = useState(null);
  const [errors, setErrors] = useState({});
  const [addToCalnderStatus, setAddToCalnderStatus] = useState(false);
  const toast = React.useRef(null);
  const onRowEdit = (rowData) => {
    setCurrentRow(rowData);
  };
  useEffect(() => {
    debugger
    if (!requests)
      dispatch(getAllCurrentUserRequests());
    if (!professions)
      dispatch(profession())


  }, []);

  const validateData = (rowData) => {
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

  const validatByType = (rowData, type)=>{
    const errors = validateData(rowData);
    if(errors.hasOwnProperty(type)){
      alert(errors.hasOwnProperty(type))
    }
  }

  const onEdit = (rowData) => {
    setCurrentRow(rowData);
  };
 
 
 
 
  const onDelete = (rowData) => {
    dispatch(deleteCurrentUserOneRequest(rowData.requestCode))
      .then(() => {
        showToast('success', 'Success', 'Row deleted successfully');
      })
      .catch((error) => {
        showToast('error', 'Error', 'Failed to delete row');
        console.error('Delete request failed:', error);
      });
  };

  const showToast = (severity, summary, detail) => {
    toast.current.show({ severity, summary, detail, life: 3000 });
  };










  

  
  

  const onAddToCalendar = (rowData) => {
    setCurrentRow(rowData)
    setAddToCalnderStatus(true);

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
  // const renderDaysToWork = (rowData) => {
  //   const formatDate = (dateString) => {
  //     const date = new Date(dateString);
  //     return new Intl.DateTimeFormat('en-GB', { year: 'numeric', month: '2-digit', day: '2-digit' }).format(date);
  //   };
  //   console.log("rowData:", rowData); // הוסף את שורת ההדפסה הזו כדי לבדוק את הנתונים במשתנה rowData
  //   return (
  //     <div>
  //     {rowData.DaysTowork && rowData.DaysTowork.map((day, index) => (
  //       <div key={index}>
  //         <span>Date: {formatDate(day.date)}</span>
  //         {/* <span> Hours: {day.fromhour} - {day.tohour}</span> */}
  //         {index !== rowData.DaysTowork.length - 1 && <hr />}
  //       </div>
  //     ))}
  //   </div>
      
  //   );
  // }; 
  
  // const renderDaysToWork = (rowData) => {
  //   return (
  //     <div>
  //       {rowData.daysToWork.map((day, index) => (
  //         <div key={index}>
  //           <span>Date: {day.date}</span> {/* Format date using Moment.js */}
  //           <span> Hours: {day.fromhour} - {day.tohour}</span>
  //           {index !== rowData.daysToWork.length - 1 && <hr />}
  //         </div>
  //       ))}
  //     </div>
  //   );
  // };
  const renderProfession = (rowData) => {
    return (
      <div>
        {professions && professions.find(p => p.professionCode == rowData.profession)?.profession1}
      </div>
    );
  };
  const renderInputText = (rowData, field) => {
    return (
      <InputText
        value={currentRow ? currentRow[field] : rowData[field]}
        onChange={(e) => {
          const newValue = e.target.value;
          setCurrentRow(prevState => ({
            ...prevState,
            [field]: newValue
          }));
        }}
      />
    );
  };

  const renderDaysToWorkEditor = (props) => {

    return (
      <div>
      <Calendar 
      // value={props.rowData && props.rowData.date ? moment(props.rowData.date).toDate() : null} 
      value={currentRow && currentRow.date ? moment(currentRow.date).toDate() : null} 
      showIcon 
      onChange={(e) => onEditDate(e.value, props.rowData) }
    />


       {/* <InputText type="text" value={currentRow ? currentRow['fromhour'] : ''} onChange={(e) => { */}
        {/* // const newValue = e.target.value; */}
        {/* // setCurrentRow((prevState) => ({ */}
          {/* // ...prevState, */}
          {/* // 'fromhour': newValue */}
        {/* // })); */}
        {/* // validatByType(currentRow, 'fromhour'); // קריאה לפונקציה לבדיקת תקינות */}

      {/* // }} placeholder="From Hour (HH:mm)" /> */}


      {/* <InputText type="text" value={currentRow ? currentRow['tohour'] : ''} onChange={(e) => { */}
        {/* // const newValue = e.target.value; */}
        {/* // setCurrentRow((prevState) => ({ */}
          {/* // ...prevState, */}
          {/* // 'tohour': newValue */}
        {/* // })); */}
        {/* validatByType(currentRow, 'tohour'); // קריאה לפונקציה לבדיקת תקינות */}

      {/* }} placeholder="To Hour (HH:mm)" /> */}
    </div>
  );
}
        {/* <InputText type="text" value={currentRow ? currentRow['fromhour'] : ''} onChange={(e) => {
          const newValue = e.target.value;
          setCurrentRow((prevState) => ({
            ...prevState,
            'fromhour': newValue
          }));
        }} placeholder="From Hour (HH:mm)" />
        <InputText type="text" value={currentRow ? currentRow['tohour'] : ''} onChange={(e) => {
          const newValue = e.target.value;
          setCurrentRow((prevState) => ({
            ...prevState,
            'tohour': newValue
          }));
        }} placeholder="To Hour (HH:mm)" /> */}
  //     </div>
  //   );
  // }

  // const onRowEditSave = (event) => {
 
    // const errors = validateData(event.data);
    // if (Object.keys(errors).length === 0) {
      // console.log("dfgh")
      // dispatch(updateCurrentUser(event.data)) //להחזיר
      //  updateCurrentUser(event.data) //להחזיר

        // showToast('success', 'Success', 'Row edited successfully');
    // } else {
      // setErrors(errors);
    //  }
  // };
  const onRowEditSave = (event) => {
    dispatch(updateOneCurrentUserRequest(event.data));
    showToast('success', 'Success', 'Row edited successfully');
  };
  
 
 
 
  const onRowEditCancel = () => {
    setCurrentRow(null);
    setErrors({});
  };






  return (
    <div style={{ margin: "0 40px", width: "80%"}}>
      <Toast ref={toast} />
      <DataTable value={requests}  paginator rows={5} rowsPerPageOptions={[5, 10, 25, 50]} tableStyle={{ minWidth: '50rem' }} editMode="row" onRowEditSave={onRowEditSave}>
    <Column field="requestCode" header="request code"></Column>  
        {/* <Column field="offerUserId" header="Offer User ID"></Column>  */}
        <Column field="profession" header="Profession" body={renderProfession}></Column>
         {/* <Column field="priceForWork" header="Price for Work" editor={(props) => renderInputText(props.rowData, 'priceForWork')}></Column>
        <Column field="pricePerVisit" header="Price per Visit" editor={(props) => renderInputText(props.rowData, 'pricePerVisit')}></Column>  */}
        <Column field="date" header="Days to Work" body={formatDate} editor={renderDaysToWorkEditor}></Column>
        <Column field="fromhour" header="From Hour" editor={(props) => renderInputText(props.rowData, 'fromhour')}></Column>
        <Column field="tohour" header="tohour" editor={(props) => renderInputText(props.rowData, 'tohour')}></Column>

        <Column header="" body={renderAddToCalendarButton}></Column>
                <Column header="" body={renderDeleteButton}></Column>

        <Column rowEditor rowEditorSaveIcon="pi pi-check" rowEditorCancelIcon="pi pi-times" headerStyle={{ width: '10%', minWidth: '8rem' }} bodyStyle={{ textAlign: 'center' }} onRowEditSave={onRowEditSave} onRowEditCancel={onRowEditCancel}></Column>
      </DataTable>
       {addToCalnderStatus &&  <AddMatchedDetails showToast={showToast} setAddToCalnderStatus = {setAddToCalnderStatus} type="req" eventId={currentRow.requestCode} setCurrentRow={setCurrentRow}/> } 
    </div>
  );
};
