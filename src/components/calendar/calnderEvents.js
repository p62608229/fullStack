const moment = require('moment');

const convertOffersToEventsArray = (offersArray) => {

    // New array to store events
    const offersEvents = [];

    // Convert original list to events array
    offersArray && offersArray.forEach(item => {
        if (item.inCalendar) {
            item.daysToWork.forEach(day => {
                const start = moment(day.date + ' ' + day.fromHour, 'DD/MM/YY HH:mm');
                const end = moment(day.date + ' ' + day.toHour, 'DD/MM/YY HH:mm');

                offersEvents.push({
                    ...item,
                    type: "offer",
                    start: moment(start).toDate()                    ,
                    end: moment(end).toDate() ,
                    title: item.note,
                    backgroundColor: 'rgb(236, 128, 128)'
                });
            });
        }
    });

    // Log the events array
    console.log(offersEvents);

    return offersEvents;

}

// Function to convert requests list to events array
const convertRequestsToEventsArray = (requestArray) => {
    const requestEvents = [];
  
    requestArray && requestArray.forEach(request => {
        if (request.inCalendar) {
            // Parse date, fromhour, and tohour
            const date = moment(request.date, 'DD/MM/YYYY').format('YYYY-MM-DD');
            const fromHour = moment(request.fromhour, 'mm:hh').format('HH:mm');
            const toHour = moment(request.tohour, 'mm:hh').format('HH:mm');
        
            // Construct start and end moments
            const start = moment(`${date} ${fromHour}`, 'YYYY-MM-DD HH:mm');
            const end = moment(`${date} ${toHour}`, 'YYYY-MM-DD HH:mm');
        
            // Push event object to array
            requestEvents.push({
                ...request,
                start: moment(start).toDate() ,
                type: "request",
                end: moment(end).toDate() ,
                title: request.note,
                backgroundColor: 'rgb(174, 225, 225)'
            });
      }   
    })

  
    return requestEvents;
  };

export const calnderEventsArray = (offersArray, requestsArray) => {

    const offersEvents = convertOffersToEventsArray(offersArray);
    const requestEvents = convertRequestsToEventsArray(requestsArray)
    
    return [...offersEvents, ...requestEvents]

}


