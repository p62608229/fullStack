import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllCurrentUserOffers } from '../Redux/API/offer';
import { getAllCurrentUserRequests } from '../Redux/API/request';

export const UserCalendar = () => {

    const dispatch = useDispatch();
    const currentUserRequests = useSelector(s => s.request.currentUserRequests);
    const currentUserOffers = useSelector(s=> s.offer.currentUserOffers);

    const localizer = momentLocalizer(moment);
    const events = [];

    useEffect(() => {
        if (!currentUserOffers) 
            dispatch(getAllCurrentUserOffers());
        if (!currentUserRequests)
            dispatch(getAllCurrentUserRequests());

        // add to events array from current user request & offers
        currentUserRequests && currentUserRequests.map(r => r.inCalendar && events.push({...r, start: moment(r.date + r.fromHour), end: moment(r.date+r.toHour), title: r.name})) ;
        currentUserOffers && currentUserOffers.map(o => o.inCalendar && events.push({...o, start: moment(o.date + o.fromHour), end: moment(o.date+o.toHour), title: o.name, backgroundColor: 'pink'}));
    }, [currentUserOffers, currentUserRequests, dispatch]);

    const eventStyleGetter = (event, start, end, isSelected) => {
        const style = {
            backgroundColor: event.backgroundColor , // Use the backgroundColor specified in the event object
            borderRadius: '5px',
            opacity: 0.8,
            color: 'white',
            border: '0px',
        };
        return {
            style: style
        };
    };

    const onEventResize = (data) => {
        console.log("dfsdf");
        // Handle event resize
    };

    const onEventDrop = (data) => {
        console.log("data");
        // Handle event drop
    };

    const onSelectEvent = (event) => {
        console.log("event", event);
        // Handle event selection
    };

    return (
        <div style={{margin: "50px", position: 'center'}}>
            <Calendar
                defaultDate={moment().toDate()}
                defaultView="month"
                events={events}
                localizer={localizer}
                onEventDrop={onEventDrop}
                onEventResize={onEventResize}
                resizable
                style={{ height: "60vh", width: "100%" }}
                onSelectEvent={onSelectEvent}
                eventPropGetter={eventStyleGetter}
            />
        </div>
    );
};
