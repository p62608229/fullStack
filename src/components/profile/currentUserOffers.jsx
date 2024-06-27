import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Toast } from 'primereact/toast';

import { deleteCurrentUserOneOffer, getAllCurrentUserOffers, updateCurrentUserOneOffer } from '../../Redux/API/offer';
import { InputText } from 'primereact/inputtext';
import { Calendar } from 'primereact/calendar';
import { AddMatchedDetails } from './addMatchedDetails';
import { profession } from '../../Redux/API/profession';
import moment from 'moment';



export const CurrentUserOffers = () => {
  const formatDate = (rowData) =>{  
    const days = rowData.daysToworks.map(q => q.date).join(",")
    return days
  }

  // const formatDate = (rowData) => moment(rowData.daysToworks.map(dayObj => dayObj.date));
  // const days = rowData.daysToworks.map(dayObj => dayObj.date)
  const [editRowData, setEditRowData] = useState(null); // השימוש במשתנה לאירוע שורתי עריכה בלב 
  
  const dispatch = useDispatch();
  const offers = useSelector(s => s.offer.currentUserOffers);
  const professions = useSelector(s => s.profession.profession);
  const requests = useSelector(s => s.offer.searchrequest);
  const [currentRow, setCurrentRow] = useState(null);
   const [ errors,setErrors] = useState({});
  const [addToCalnderStatus, setAddToCalnderStatus] = useState(false);
  const toast = React.useRef(null);

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
  const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

  const selectedDay = rowData.date ? moment(rowData.date).format('dddd') : '';

  return (
    <div>
      <select
        value={selectedDay}
        onChange={(e) => {
          const selectedDay = e.target.value;
          // Implement your logic here to update rowData with the selected day
          console.log(selectedDay);
        }}
      >
        <option value="">Select Day</option>
        {daysOfWeek.map((day) => (
          <option key={day} value={day}>
            {day}
          </option>
        ))}
      </select>
      {selectedDay && (
        <div style={{ marginTop: '5px' }}>
          Selected Day: {selectedDay}
        </div>
      )}
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
          value={moment(props.rowData.date).toDate()} 
          showIcon 
          onChange={(e) => {
            const newDate = e.value;
            props.editorCallback({
              ...props.rowData,
              date: moment(newDate).format('YYYY-MM-DD')
            });
          }} 
        />
     

    
        <InputText type="text" value={currentRow ? currentRow['fromhour'] : ''} onChange={(e) => {
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
        }} placeholder="To Hour (HH:mm)" />
      </div>
    );
  }

  const onRowEditSave = (event) => {
    const errors = validateData(editRowData);
    if (Object.keys(errors).length === 0) {
      dispatch(updateCurrentUserOneOffer(editRowData));
      showToast('success', 'Success', 'Row edited successfully');
      setEditRowData(null); // איפוס השורה הנוכחית לאחר השמירה
    } else {
      setErrors(errors);
    }
  };

  
  
  
  
  
  
  
  
  

  const onRowEditCancel = () => {
    setCurrentRow(null);
    setErrors({});
  };

  return (
    <div style={{ margin: "0 40px", width: "90%" }}>
      <Toast ref={toast} />
      <DataTable value={offers} paginator rows={5} rowsPerPageOptions={[5, 10, 25, 50]} tableStyle={{ minWidth: '50rem' }} editMode="row">
        {/* <Column field="offerCode" header="Offer Code"></Column> */}
        {/* <Column field="offerUserId" header="Offer User ID"></Column> */}
        <Column field="profession" header="Profession" body={renderProfession}></Column>
        <Column field="priceForWork" header="Price for Work"  editor={(props) => renderInputText(props.rowData, 'priceForWork')}></Column>
        <Column field="pricePerVisit" header="Price per Visit" editor={(props) => renderInputText(props.rowData, 'pricePerVisit')}></Column>
        <Column field="date" header="Days to Work" body={formatDate}editor={(props) => renderDaysToWork(props.rowData, 'Days to Work')}></Column>

        {/* <Column field="date" header="Days To Work" body={formatDate} editor={renderDaysToWorkEditor}></Column> */}
        {/* <Column field="date" header="Days To Work" body={formatDate} ></Column> */}
        <Column field="fromhour" header="From Hour" editor={(props) => renderInputText(props.rowData, 'fromhour')}></Column>

        <Column header="" body={renderAddToCalendarButton}></Column>
        <Column header="" body={renderDeleteButton}></Column>
        {/* <Column ><div><label htmlFor="tohour" >To hour</label></div></Column> */}
        <Column rowEditor rowEditorSaveIcon="pi pi-check" rowEditorCancelIcon="pi pi-times" headerStyle={{ width: '10%', minWidth: '8rem' }} bodyStyle={{ textAlign: 'center' }} onRowEditSave={onRowEditSave} onRowEditCancel={onRowEditCancel}></Column>
      </DataTable>
      {addToCalnderStatus && <AddMatchedDetails showToast={showToast} setAddToCalnderStatus={setAddToCalnderStatus} type="offer" event={currentRow} setCurrentRow={setCurrentRow} />}
    </div>
  );
};
