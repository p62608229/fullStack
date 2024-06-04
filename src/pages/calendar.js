import React, { useEffect, useState } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { useDispatch, useSelector } from 'react-redux';
import { CircleColors } from '../components/calendar.js/circleColors';
import { getAllEvents } from '../Redux/API/calendar';


// 
export const UserCalendar = () => {
  const dispatch = useDispatch();
  const [selectedEvent, setSelectedEvent] = useState(null);
  const events = useSelector(s => s.calendar.events);

  useEffect(() => {
    if (!events)
      dispatch(getAllEvents())
  })

  const localizer = momentLocalizer(moment);

  const handleEventClick = async (event) => {
    setSelectedEvent(event);
  };

  const eventStyleGetter = event => {
    const style = {
      backgroundColor: event.backgroundColor,
      borderRadius: '5px',
      opacity: 0.8,
      color: 'white',
      border: '0px',
    };
    return {
      style: style,
    };
  };

  return (
    <div style={{ margin: '50px', position: 'center' }}>
      {events &&
        <>
          <CircleColors />
          <Calendar
            defaultDate={moment().toDate()}
            defaultView="month"
            events={events}
            localizer={localizer}
            style={{ height: '60vh', width: '100%' }}
            eventPropGetter={eventStyleGetter}
            onSelectEvent={handleEventClick}
          />
          {selectedEvent && (
            <div style={{ marginTop: '20px', borderTop: '1px solid #ccc', textAlign: "center", padding: '20px', backgroundColor: selectedEvent.backgroundColor }}>
              <h3>Event Details:</h3>
              <p>Type: {selectedEvent.type}</p>
              <p>Date: {moment(selectedEvent.start).format('DD/MM/YYYY')}</p>
              <p>Hours: {moment(selectedEvent.start).format('HH:mm')} - {moment(selectedEvent.end).format('HH:mm')}</p>
              <p>Note: {selectedEvent.note}</p>
              {selectedEvent.matchedName && <p style={{ backgroundColor: "gray", padding: "5px" }}> {selectedEvent.type === "request" ? "Offers" : "Requesting"} details:
                <p>Name: {selectedEvent.matchedName} | Phone: {selectedEvent.matchedPhon} | Email: {selectedEvent.matchedEmail}</p>
              </p>}
              <p></p>
            </div>
          )}
        </>
      }
    </div>
  );
};

export default UserCalendar;
