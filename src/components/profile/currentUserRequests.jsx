import React, { useState, useEffect, Fragment } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Toast } from 'primereact/toast';

import { deleteCurrentUserOneRequest, getAllCurrentUserRequests, updateCurrentUser } from '../../Redux/API/request';
import {searchOffer, updateOneCurrentUserRequest} from '../../Redux/slices/request'
import { InputText } from 'primereact/inputtext';
import { Calendar } from 'primereact/calendar';
import { AddMatchedDetails } from './addMatchedDetails';
import { profession } from '../../Redux/API/profession';

import moment from 'moment';
import { Button } from 'react-bootstrap';
import { Navigate, useNavigate } from 'react-router-dom';
import { deleteCurrentUser } from '../../Redux/slices/users';

export const CurrentUserRequests = () => {
  const formatDate = (rowData) => { 
    debugger
    return moment(rowData.date).format('YYYY-MM-DD');
}
const navigate = useNavigate()
const [editRowData, setEditRowData] = useState(null); 
  const dispatch = useDispatch();
  const requests = useSelector(s => s.request.currentUserRequests);
  const professions = useSelector(s => s.profession.profession);

  const onEditDate = (newDate, rowData) => {
    console.log("ROWDATA",rowData)
    const updatedRow = { ...rowData, date: moment(newDate).format('YYYY-MM-DDT00:00:00') };

    // const updatedRow = { ...rowData, date: '2024-05-15T00:00:00' };
    console.log('updated', updatedRow)

    // dispatch(updateCurrentUserOneRequest(updatedRow)); // עדכון באמצעות פעולת Redux
    dispatch(updateOneCurrentUserRequest(updatedRow))

  };
  const [data,setData]=useState(null);

  const [currentRow,  setCurrentRow] = useState(null);
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

  const onEdyit = (rowData) => {
    setCurrentRow(rowData);
  };
 
 const editor = (rowData) => {
    
  
return (
      <div>
        {renderInputText(rowData, 'fromHour')}
        {renderInputText(rowData, 'toHour')}
      </div>
    );
  };
 
 
  // const onDelete = (rowData) => {
    // dispatch(deleteCurrentUserOneRequest(rowData.requestCode))
      // .then(() => {
        // showToast('success', 'Success', 'Row deleted successfully');
      // })
      // .catch((error) => {
        // showToast('error', 'Error', 'Failed to delete row');
        // console.error('Delete request failed:', error);
      // });
  // };
  



  // const onDelete = (rowData) => {
    // dispatch(deleteCurrentUserOneRequest(rowData.requestCode))
      // .then(() => {
        // showToast('success', 'Success', 'Row deleted successfully');
    //  
        // if (data !== null) {

        // setData(prevData => prevData.filter(item => item.requestCode !== rowData.requestCode));
      // 
  // }})
  // 
      // .catch((error) => {
        // showToast('error', 'Error', 'Failed to delete row');
        // console.error('Delete request failed:', error);
      // });
  // };
 
  const onDelete = (rowData) => {
    dispatch(deleteCurrentUserOneRequest(rowData.requestCode));   

    showToast('success', 'Success', 'Row deleted successfully');
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


  const renderProfession = (rowData) => {
    return (
      <div>
        {professions && professions.find(p => p.professionCode == rowData.profession)?.profession1}
      </div>
    );
  };
  
  const renderInputText = (rowData, field) => {
  
    const handleTimeChange = (newValue) => {
      debugger
      if(newValue >1){
      // const updatedValue = newValue.replace(/^(\d{0,2}):(\d{0,2}).*$/, '$1:$2');
      // if (/^\d{0,2}:\d{0,2}(:\d{0,2})?$/.test(newValue)) {
    //  /^(0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$/.test(newValue)
        dispatch(updateOneCurrentUserRequest({
        ...rowData,
        [field]: newValue
      }))
       
      }
   
       
    };
  
    return (
      <InputText
        onChange={(e) => handleTimeChange(e.target.value)}
         placeholder="HHMM"
      />
      
    );
  }
  const renderDaysToWorkEditor = (props) => {
    const handleDateChange = (e) => {
      const newDate = e.value;
      onEditDate(newDate, props.rowData);
    };
    return (
      <div>
         {<Calendar value={currentRow && currentRow.date ? moment(currentRow.date).toDate() : null} onChange={handleDateChange} /> }
       /</div> 
    );
  };
  
  // const renderDaysToWorkEditor = (props) => {
    // const handleDateChange = (e) => {
      // const newDate = e.value;
      // const updatedRow = { ...props.rowData, date: moment(newDate).format('YYYY-MM-DDT00:00:00') };
      // setCurrentRow(updatedRow); // Update local state
    // };
    // return (
      // <div>
        {/* <Calendar value={moment(props.rowData.date).toDate()} onChange={handleDateChange} /> */}
      {/* </div> */}
    // );
  // };
  // 
  // 
  const onRowEditComplete = (event) => {
    debugger
    console.log("event",event.data)
    dispatch(updateCurrentUser(event.data));
    showToast('success', 'Success', 'Row edited successfully');
    console.log("----------")
    // dispatch(searchOffer(event.data));
    // navigate("/cheqoffer");
 };                                                     //  
      // 
      //  const  onRowEditsave =(event) => {
    // debugger
    // console.log("***----",updateCurrentUser)
      // dispatch(updateCurrentUser(event.data));
      // showToast('success', 'Success', 'Row edited successfully');};

  // const renderTasksCheckButton = () => {
    // return (
      // <Button label="למעבר לבדיקת הצעות" onClick=  {navigate("/cheqreq")} className="p-button-secondary" />
    // );
  // };
  
  const handleTasksCheck = () => {
    setAddToCalnderStatus(true);
  };
 
  const onRowEditCancel = () => {
    setCurrentRow(null);
    setErrors({});
  };
  
  return (
    <div style={{ margin: "0 40px", width: "80%"}}>
      <Toast ref={toast} />
      <DataTable value={requests} editMode="row"  onRowEditComplete= {onRowEditComplete}  paginator rows={5} rowsPerPageOptions={[5, 10, 25, 50]} tableStyle={{ minWidth: '50rem' }} >
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
                <Column rowEditor rowEditorCancelIcon="pi pi-times" headerStyle={{ width: '10%', minWidth: '8rem' }} bodyStyle={{ textAlign: 'center' }}    onRowEditCancel={onRowEditCancel}></Column>

        {/* <Column rowEditor headerStyle={{ width: '10%', minWidth: '8rem' }} bodyStyle={{ textAlign: 'center' }} ></Column> */}
        <Column ><button onClick ="למעבר לבדיקת צעות"> </button></Column>
        {/* <Column header="" body={renderTasksCheckButton}></Column> Add Tasks Check button column */}

      </DataTable>
       {addToCalnderStatus &&   <AddMatchedDetails showToast={showToast} setAddToCalnderStatus = {setAddToCalnderStatus} type="request" eventId={currentRow.requestCode} setCurrentRow={setCurrentRow}/> } 
    </div>
  );
};
