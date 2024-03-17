import { Calendar, momentLocalizer } from 'react-big-calendar'
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllEvents } from '../Redux/API/events';


export const UserCalendar = () => {

    const dispatch = useDispatch()
    const events = useSelector(s => s.events)

    useEffect(() => {
        if (!events) {
            dispatch(getAllEvents());
        }
    })

    const localizer = momentLocalizer(moment)


    const state = {
        events: [
            {
                start: moment().toDate(),
                end: moment().add(1, "days").toDate(),
                title: `רארקאקר`,
                prefession: "hgg",

            },
        ],
    };

    const onEventResize = (data) => {
        const { start, end } = data;
        console.log("dfsdf")
        this.setState((state) => {
            state.events[0].start = start;
            state.events[0].end = end;
            return { events: [...state.events] };
        });
    };

    const onEventDrop = (data) => {
        console.log("data");
    };

    const onSelectEvent = (event) => {
        console.log("event", event)
    }


    return (
        <div>
            <Calendar
                defaultDate={moment().toDate()}
                defaultView="month"
                events={state.events}
                localizer={localizer}
                onEventDrop={onEventDrop}
                onEventResize={onEventResize}
                resizable
                style={{ height: "50vh", width: "80vh" }}
                rtl={true}
                onSelectEvent={onSelectEvent}
            />
        </div>
    );
}

