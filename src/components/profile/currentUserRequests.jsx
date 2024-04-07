import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Toast } from 'primereact/toast';

import { deleteCurrentUserOneRequest, getAllCurrentUserRequests, updateCurrentUserOneRequest } from '../../Redux/API/request';
import { InputText } from 'primereact/inputtext';
import { Calendar } from 'primereact/calendar';
import { AddMatchedDetails } from './addMatchedDetails';


export const CurrentUserRequests = () => {

  const dispatch = useDispatch();
  const requests = useSelector(s => s.offer.currentUserOffers);
  const professions = useSelector(s => s.profession.profession);

  const [currentRow, setCurrentRow] = useState(null);
  const [errors, setErrors] = useState({});
  const [addToCalnderStatus, setAddToCalnderStatus] = useState(false);
  const toast = React.useRef(null);

  useEffect(() => {
    if (!requests)
      dispatch(getAllCurrentUserRequests());
  }, [dispatch]);

  const validateData = (rowData) => {
    debugger
    const errors = {};

    // if (!rowData.priceForWork && !rowData.pricePerVisit) {
    //   errors.PricePerVisit = 'Price for work or price per visit is required.';
    //   errors.PriceForWork = 'Price for work or price per visit is required.';
    // } else {
    //   if (rowData.priceForWork && !/^\d+$/.test(rowData.priceForWork)) {
    //     errors.PriceForWork = 'Price for work can be only numbers.';
    //   }
    //   if (rowData.pricePerVisit && !/^\d+$/.test(rowData.pricePerVisit)) {
    //     errors.PricePerVisit = 'Price per visit can be only numbers.';
    //   }
    // }

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
    debugger
    setCurrentRow(rowData);
  };

  const onDelete = (rowData) => {
    dispatch(deleteCurrentUserOneRequest(rowData.offerCode))
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

  const renderDaysToWork = (rowData) => {
    return (
      <div>
        {rowData.daysToWork.map((day, index) => (
          <div key={index}>
            <span>Date: {day.date}</span> {/* Format date using Moment.js */}
            <span> Hours: {day.fromhour} - {day.tohour}</span>
            {index !== rowData.daysToWork.length - 1 && <hr />}
          </div>
        ))}
      </div>
    );
  };
  const renderProfession = (rowData) => {
    return (
      <div>
        { professions.find(p=> p.professionCode == rowData.profession)?.profession1}
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
        <Calendar type="date" showIcon value={currentRow ? currentRow['date'] : ''} onChange={(e) => {
          const newValue = e.target.value;
          setCurrentRow((prevState) => ({
            ...prevState,
            'date': newValue
          }));
        }} />
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
    debugger
    const errors = validateData(event.data);
    debugger
    if (Object.keys(errors).length === 0) {
        dispatch(updateCurrentUserOneRequest(event.data))
        showToast('success', 'Success', 'Row edited successfully');
    } else {
      setErrors(errors);
    }
  };

  const onRowEditCancel = () => {
    debugger
    setCurrentRow(null);
    setErrors({});
  };

  return (
    <div style={{ margin: "0 40px", width: "80%"}}>
      <Toast ref={toast} />
      <DataTable value={requests} paginator rows={5} rowsPerPageOptions={[5, 10, 25, 50]} tableStyle={{ minWidth: '50rem' }} editMode="row">
        {/* <Column field="offerCode" header="Offer Code"></Column>
        <Column field="offerUserId" header="Offer User ID"></Column> */}
        <Column field="profession" header="Profession" body={renderProfession}></Column>
        {/* <Column field="priceForWork" header="Price for Work" editor={(props) => renderInputText(props.rowData, 'priceForWork')}></Column>
        <Column field="pricePerVisit" header="Price per Visit" editor={(props) => renderInputText(props.rowData, 'pricePerVisit')}></Column> */}
        <Column field="daysToWork" header="Days to Work" body={renderDaysToWork} editor={renderDaysToWorkEditor}></Column>
        <Column header="" body={renderDeleteButton}></Column>
        <Column header="" body={renderAddToCalendarButton}></Column>
        <Column rowEditor rowEditorSaveIcon="pi pi-check" rowEditorCancelIcon="pi pi-times" headerStyle={{ width: '10%', minWidth: '8rem' }} bodyStyle={{ textAlign: 'center' }} onRowEditSave={onRowEditSave} onRowEditCancel={onRowEditCancel}></Column>
      </DataTable>
       {addToCalnderStatus &&  <AddMatchedDetails showToast={showToast} setAddToCalnderStatus = {setAddToCalnderStatus} type="offer" eventId={currentRow.offerCode} setCurrentRow={setCurrentRow}/> } 
    </div>
  );
};
