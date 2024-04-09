const moment = require('moment');


export const calnderEventsArray = (requestsArray, currentUser) => {

    const requestEvents = [];
    debugger


    requestsArray && requestsArray.forEach(request => {


        const start = updateDateWithHour(request.date, request.fromhour)
        const end = updateDateWithHour(request.date, request.tohour)


        // { type: "My offers", color: '#87CEEB' },
        // { type: "Matched request", color: '#FFA07A' },
        // { type: "Unmatched request", color: '#FFD700' }
        // astract colors
        let color = '';
        color = request.offer ? "#87CEEB" : request.user ? "#FFA07A" : "#FFD700"


        // Push event object to array
        start && end && requestEvents.push({
            ...request,
            start: moment(start).toDate(),
            type: "request",
            end: moment(end).toDate(),
            title: request.note,
            backgroundColor: color
        });
    })

    return requestEvents;
}


function updateDateWithHour(originalDate, hour) {
    // Parse the original date
    if (hour && originalDate) {
        const newDate = new Date(originalDate);

        // Extract hour and minute from the 'hour' parameter
        const hourString = hour.toString();
        const hourValue = parseInt(hourString.slice(0, -2), 10);
        const minuteValue = parseInt(hourString.slice(-2), 10);

        // Set the hour and minute from the 'hour' parameter to the new date
        newDate.setHours(hourValue);
        newDate.setMinutes(minuteValue);

        return newDate;
    }
}
