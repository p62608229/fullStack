import React, { useState } from 'react';
import { Checkbox } from 'primereact/checkbox';
import { useSelector } from 'react-redux';
import { classNames } from 'primereact/utils';
import { Form, Field } from 'react-final-form';
import { InputText } from 'primereact/inputtext';
import { Calendar } from 'primereact/calendar';
        

const DaysOfWeek = (props) => {

  const { setDaysToworks } = props
  const offerCode = useSelector(s => s.users.currentUser.id)
  const [checkedDays, setCheckedDays] = useState([]);
  const [fromHour, setFromHour] = useState(0);
  const [toHour, setToHour] = useState(0);

  const handleCheckboxChange = (day) => {
    const updatedCheckedDays = checkedDays.includes(day)
      ? checkedDays.filter((d) => d !== day)
      : [...checkedDays, day];
    setCheckedDays(updatedCheckedDays);
  };

  const handleFromHourChange = (e) => {
    setFromHour(parseInt(e.target.value, 10));
  };

  const handleToHourChange = (e) => {
    setToHour(parseInt(e.target.value, 10));
  };

  const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

  const handleSave = () => {
    debugger
    const daysToWorks = checkedDays.map((day) => ({
      offerCode: offerCode,
      date: day,
      fromhour: fromHour,
      tohour: toHour
    }));
    setDaysToworks(daysToWorks)
  };
  const [time, setTime] = useState(new Date());

  const handleTimeChange = (e) => {
    setTime(e.target.value);
  };
  return (
    <div>
{/*     */}
    {/* //  <div> <label htmlFor="fromHour">From hour </label> */}
    {/* //   <Calendar value={time} onChange={(e) => setTime(e.value)} timeOnly /></div> */}
    {/* //  <div><label htmlFor="tohour" >To hour</label> */}
    {/* //   <Calendar value={time} onChange={(e) => setTime(e.value)} timeOnly /></div> */}

      {daysOfWeek.map((day, index) => (
        <div key={index} className="p-field-checkbox">
          <Checkbox
            inputId={`day${index}`}
            value={day}
            checked={checkedDays.includes(day)}
            onChange={(e) => handleCheckboxChange(day)}
          />
          <label htmlFor={`day${index}`} className="p-checkbox-label">{day}</label>
        </div>
      ))}
      <button onClick={handleSave}>Save the days</button>
    </div>
  );
};

export default DaysOfWeek;
