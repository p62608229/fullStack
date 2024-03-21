import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';
import { Toast } from 'primereact/toast';
import { getAllCurrentUserOffers } from '../../Redux/API/offer';
import { demoOffersList } from '../../~not use/demoValues/offers';

export const CurrentUserOffers = () => {
  const dispatch = useDispatch();
  const offers = demoOffersList;
  const [editingRow, setEditingRow] = useState(null);
  const [errors, setErrors] = useState({});
  const toast = React.useRef(null);

  useEffect(() => {
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
    // Dispatch delete action here
    showToast('success', 'Success', 'Row deleted successfully');
  };

  const onAddToCalendar = (rowData) => {
    // Dispatch add to calendar action here
    showToast('info', 'Add to Calendar', 'Added to calendar successfully');
  };

  const showToast = (severity, summary, detail) => {
    toast.current.show({ severity, summary, detail, life: 3000 });
  };

  const renderEditButton = (rowData) => {
    return (
      <Button icon="pi pi-pencil" onClick={() => onEdit(rowData)} />
    );
  };

  const renderDeleteButton = (rowData) => {
    return (
      <Button icon="pi pi-trash" onClick={() => onDelete(rowData)} />
    );
  };

  const renderAddToCalendarButton = (rowData) => {
    return (
      <Button icon="pi pi-calendar-plus" onClick={() => onAddToCalendar(rowData)} />
    );
  };

  const renderDaysToWork = (rowData) => {
    return (
      <div>
        {rowData.daysToWork.map((day, index) => (
          <div key={index}>
            <span>Date: {day.date}</span>
            <span> Hours: {day.fromhour} - {day.tohour}</span>
          </div>
        ))}
      </div>
    );
  };

  const renderInputText = (rowData, field) => {
    return (
      <input
        type="text"
        value={editingRow ? editingRow[field] : rowData[field]}
        onChange={(e) => {
          const newValue = e.target.value;
          setEditingRow((prevState) => ({
            ...prevState,
            [field]: newValue
          }));
        }}
      />
    );
  };

  const onRowEditSave = () => {
    const errors = validateData(editingRow);
    if (Object.keys(errors).length === 0) {
      // Dispatch action here with edited data
      setEditingRow(null);
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
    <div style={{margin: "0 40px"}}>
      <Toast ref={toast} />
      <DataTable value={offers} paginator rows={5} rowsPerPageOptions={[5, 10, 25, 50]} tableStyle={{ minWidth: '50rem' }}>
        <Column field="offerCode" header="Offer Code"></Column>
        <Column field="offerUserId" header="Offer User ID"></Column>
        <Column field="priceForWork" header="Price for Work" editor={(props) => renderInputText(props.rowData, 'priceForWork')}></Column>
        <Column field="pricePerVisit" header="Price per Visit" editor={(props) => renderInputText(props.rowData, 'pricePerVisit')}></Column>
        <Column field="profession" header="Profession"></Column>
        <Column field="daysToWork" header="Days to Work" body={renderDaysToWork}></Column>
        <Column header="" body={renderEditButton}></Column>
        <Column header="" body={renderDeleteButton}></Column>
        <Column header="" body={renderAddToCalendarButton}></Column>
        <Column rowEditor rowEditorSaveIcon="pi pi-check" rowEditorCancelIcon="pi pi-times" headerStyle={{ width: '10%', minWidth: '8rem' }} bodyStyle={{ textAlign: 'center' }} onRowEditSave={onRowEditSave} onRowEditCancel={onRowEditCancel}></Column>
      </DataTable>
    </div>
  );
};
