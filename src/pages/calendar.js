import React, { useEffect, useState } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { useDispatch, useSelector } from 'react-redux';
import { getAllCurrentUserOffers } from '../Redux/API/offer';
import { getAllCurrentUserRequests } from '../Redux/API/request';
import { calnderEventsArray } from '../utils/calendar/calnderEvents';

export const UserCalendar = () => {
  const dispatch = useDispatch();
  const [selectedEvent, setSelectedEvent] = useState(null);

    const requests = useSelector(s => s.request.currentUserRequests);
    const offers = useSelector(s=> s.offer.currentUserOffers);

    useEffect(()=> {
        if (!offers) 
            dispatch(getAllCurrentUserOffers())
        if (!requests)
            dispatch(getAllCurrentUserRequests())
    })

  const localizer = momentLocalizer(moment);
  const events = calnderEventsArray(offers, requests);

  const handleEventClick = event => {
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
      {/* <CircleColors /> */}
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
        <div style={{ marginTop: '20px', borderTop: '1px solid #ccc',  textAlign: "center", padding: '20px', backgroundColor: selectedEvent.backgroundColor}}>
          <h3>Event Details:</h3>
          <p>Type: {selectedEvent.type}</p>
          {/* <p>Code: {selectedEvent.type =="offer" ? <>{selectedEvent.offerCode}</>  : <>{selectedEvent.requestCode}</>}</p> */}
          <p>Date: {moment(selectedEvent.start).format('DD/MM/YYYY')}</p>
          <p>Hours: {moment(selectedEvent.start).format('HH:mm')} - {moment(selectedEvent.end).format('HH:mm')}</p>
          <p>Note: {selectedEvent.note}</p>
          <p></p>
        </div>
      )}
    </div>
  );
};
