import { createSlice } from '@reduxjs/toolkit'
import { deleteCurrentUserOneRequest, getAllCurrentUserRequests, updateCurrentUserOneRequest,  } from '../API/request';
import { demoRequestList } from '../../~not use/demoValues/requests';
import { calnderEventsArray } from '../../utils/calendar/calnderEvents';
import { eventsByCode, getAllEvents } from '../API/calendar';


// איתחול של הסטיט
const initialState = {
  events:  null
}

export const CalendarSlice = createSlice({
  name: 'calendar',
  initialState,
  reducers: { },
  extraReducers: (builder) => {
    builder
    .addCase(eventsByCode.fulfilled, (state, action) => {{
      debugger
      const events = calnderEventsArray(action.payload)
      state.events  = events;
    }}) 
    .addCase(getAllEvents.fulfilled, (state, action) => {{
      debugger
      const events = calnderEventsArray(action.payload)
      state.events  = events;
    }}) 
  }
  
});


export default CalendarSlice.reducer
