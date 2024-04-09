const moment = require('moment');


export const calnderEventsArray = (requestsArray, currentUser) => {

    const requestEvents = [];
    
  
    requestsArray && requestsArray.forEach(request => {

            // Parse date, fromhour, and tohour
            const date = moment(request.date, 'DD/MM/YYYY').format('YYYY-MM-DD');
            const fromHour = moment(request.fromhour, 'mm:hh').format('HH:mm');
            const toHour = moment(request.tohour, 'mm:hh').format('HH:mm');
        
            // Construct start and end moments
            const start = moment(`${date} ${fromHour}`, 'YYYY-MM-DD HH:mm');
            const end = moment(`${date} ${toHour}`, 'YYYY-MM-DD HH:mm');


            // { type: "My offers", color: '#87CEEB' },
            // { type: "Matched request", color: '#FFA07A' },
            // { type: "Unmatched request", color: '#FFD700' }
            // astract colors
            let color = '';
            color = request.offer ? "#87CEEB" : request.user ?  "#FFA07A" : "#FFD700"

        
            // Push event object to array
            requestEvents.push({
                ...request,
                start: moment(start).toDate() ,
                type: "request",
                end: moment(end).toDate() ,
                title: request.note,
                backgroundColor: color
            });
    })
    
    return requestEvents;
}
