import React, { useState } from 'react';
import { Checkbox } from 'primereact/checkbox';
import { useSelector } from 'react-redux';
import { InputText } from 'primereact/inputtext';

const DaysOfWeek = (props) => {
  const { setDaysToworks } = props;
  const offerCode = useSelector(s => s.users.currentUser.id);
  const [checkedDays, setCheckedDays] = useState([]);
  const [fromHours, setFromHours] = useState({});
  const [toHours, setToHours] = useState({});

  const handleCheckboxChange = (day) => {
    const updatedCheckedDays = checkedDays.includes(day)
      ? checkedDays.filter((d) => d !== day)
      : [...checkedDays, day];
    setCheckedDays(updatedCheckedDays);
  };

  const handleFromHourChange = (day, value) => {
    setFromHours({ ...fromHours, [day]: value });
  };

  const handleToHourChange = (day, value) => {
    setToHours({ ...toHours, [day]: value });
  };

  const formatHour = (value) => {
    if (!value || value === '') return '';

    return value.replace(/(\d{2})/g, '$1:').slice(0, -1);
  };
  // const daysOfWeek = ['ראשון', 'שני', 'שלישי', 'רביעי', 'חמישי', 'שישי','שבת'];
  // const englishDaysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday','Saturday'];
  // const dayMapping = {
  //   'Sunday': 'ראשון',
  //   'Monday': 'שני',
  //   'Tuesday': 'שלישי',
  //   'Wednesday': 'רביעי',
  //   'Thursday': 'חמישי',
  //   'Friday': 'שישי',
  //   'Saturday': 'שבת'
  // };
  // const handleSave = () => {
  //   const daysToWorks = checkedDays.map((day) => ({
  //     offerCode: offerCode,
  //     date: dayMapping[day], // משתמש במפה להמיר את היום לעברית
  //     fromhour: fromHours[day],
  //     tohour: toHours[day]
  //   }));
  
  // setDaysToworks(daysToWorks);
  // };

  const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  // const daysOfWeek = ['ראשון', 'שני', 'שלישי', 'רביעי', 'חמישי', 'שישי'];

  const handleSave = () => {
    const daysToWorks = checkedDays.map((day) => ({
      offerCode: offerCode,
      date: day,
      fromhour: fromHours[day],
      tohour: toHours[day]
    }));
    setDaysToworks(daysToWorks);
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
          {checkedDays.includes(day) && (
            <div>
              <label htmlFor={`fromHour${index}`}>From hour </label>
              <InputText
                id={`fromHour${index}`}
                value={fromHours[day]}
                onChange={(e) => handleFromHourChange(day, e.target.value)}
              />
              {/* {fromHours[day] && !/^\d+$/.test(fromHours[day]) && <span style={{color: 'red'}}>הכנס שעות ללא סימני פיסוק</span>} */}
              {/* <label htmlFor={`toHour${index}`}>To hour </label> */}
              {/* <InputText */}
              {/* // id={`toHour${index}`} */}
              {/* // value={toHours[day]} */}
              {/* // onChange={(e) => handleToHourChange(day, e.target.value)} */}
              {/* // /> */}
              {/* {toHours[day] && !/^\d+$/.test(toHours[day]) && <span style={{color: 'red'}}>הכנס שעות ללא סימני פיסוק</span>} */}







              {fromHours[day] && !/^\d+$/.test(fromHours[day]) ? (
                <span style={{ color: 'red' }}>הכנס שעות ללא סימני פיסוק</span>
              ) : fromHours[day] && !/^\d{2}:\d{2}$/.test(fromHours[day]) ? (
                <span style={{ color: 'red' }}>הכנס שעה במבנה HHMM</span>
              ) : null}

              <label htmlFor={`toHour${index}`}>To hour </label>
              <InputText
                id={`toHour${index}`}
                value={toHours[day]}
                onChange={(e) => handleToHourChange(day, e.target.value)}
                style={{ width: '200px' }} // גודל קבוע לשדה TOHOUR
              />
              {toHours[day] && !/^\d+$/.test(toHours[day]) ? (
                <span style={{ color: 'red' }}>הכנס שעות ללא סימני פיסוק</span>
              ) : toHours[day] && !/^\d{2}:\d{2}$/.test(toHours[day]) ? (
                <span style={{ color: 'red' }}>הכנס שעה במבנה HHMM</span>
              ) : null}

            </div>
          )}
        </div>
      ))}

      <button onClick={handleSave}>Save the days</button>
    </div>
  );
};

export default DaysOfWeek;
