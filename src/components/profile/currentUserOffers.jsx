import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Toast } from 'primereact/toast';

import { chngeInCalnderMode, deleteCurrentUserOneOffer, getAllCurrentUserOffers, updateCurrentUserOneOffer } from '../../Redux/API/offer';
import { InputText } from 'primereact/inputtext';
import { Calendar } from 'primereact/calendar';


export const CurrentUserOffers = () => {

  const dispatch = useDispatch();
  const offers = useSelector(s => s.offer.currentUserOffers);
  const professions = useSelector(s => s.profession.profession);

  const [editingRow, setEditingRow] = useState(null);
  const [errors, setErrors] = useState({});
  const toast = React.useRef(null);

  useEffect(() => {
    if (!offers)
      dispatch(getAllCurrentUserOffers());
  }, [dispatch]);

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

  const onEdit = (rowData) => {
    setEditingRow(rowData);
  };

  const onDelete = (rowData) => {
    dispatch(deleteCurrentUserOneOffer(rowData.offerCode))
    showToast('success', 'Success', 'Row deleted successfully');
  };

  const onAddToCalendar = (rowData) => {
    dispatch(chngeInCalnderMode(rowData.offerCode))
    showToast('info', 'Add to Calendar', 'Added to calendar successfully');
  };

  const showToast = (severity, summary, detail) => {
    toast.current.show({ severity, summary, detail, life: 3000 });
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
      <div className="icon-button" onClick={() => onAddToCalendar(rowData.offerCode)}>
        <i className={rowData.inCalendar ? "pi pi-calendar-minus" : "pi pi-calendar-plus"}></i>
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
        value={editingRow ? editingRow[field] : rowData[field]}
        onChange={(e) => {
          const newValue = e.target.value;
          setEditingRow(prevState => ({
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
        <Calendar type="date" showIcon value={editingRow ? editingRow['date'] : ''} onChange={(e) => {
          const newValue = e.target.value;
          setEditingRow((prevState) => ({
            ...prevState,
            'date': newValue
          }));
        }} />
        <InputText type="text" value={editingRow ? editingRow['fromhour'] : ''} onChange={(e) => {
          const newValue = e.target.value;
          setEditingRow((prevState) => ({
            ...prevState,
            'fromhour': newValue
          }));
        }} placeholder="From Hour (HH:mm)" />
        <InputText type="text" value={editingRow ? editingRow['tohour'] : ''} onChange={(e) => {
          const newValue = e.target.value;
          setEditingRow((prevState) => ({
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
        dispatch(updateCurrentUserOneOffer(event.data))
        showToast('success', 'Success', 'Row edited successfully');
    } else {
      setErrors(errors);
    }
  };

  const onRowEditCancel = () => {
    setEditingRow(null);
    setErrors({});
  };

  return (
    <div style={{ margin: "0 40px", width: "100%"}}>
      <Toast ref={toast} />
      <DataTable value={offers} paginator rows={5} rowsPerPageOptions={[5, 10, 25, 50]} tableStyle={{ minWidth: '50rem' }} editMode="row">
        <Column field="offerCode" header="Offer Code"></Column>
        <Column field="offerUserId" header="
        Offer User ID"></Column>
        <Column field="priceForWork" header="Price for Work" editor={(props) => renderInputText(props.rowData, 'priceForWork')}></Column>
        <Column field="pricePerVisit" header="Price per Visit" editor={(props) => renderInputText(props.rowData, 'pricePerVisit')}></Column>
        <Column field="profession" header="Profession" body={renderProfession}></Column>
        <Column field="daysToWork" header="Days to Work" body={renderDaysToWork} editor={renderDaysToWorkEditor}></Column>
        <Column header="" body={renderDeleteButton}></Column>
        <Column header="" body={renderAddToCalendarButton}></Column>
        <Column rowEditor rowEditorSaveIcon="pi pi-check" rowEditorCancelIcon="pi pi-times" headerStyle={{ width: '10%', minWidth: '8rem' }} bodyStyle={{ textAlign: 'center' }} onRowEditSave={onRowEditSave} onRowEditCancel={onRowEditCancel}></Column>
      </DataTable>
    </div>
  );
};
