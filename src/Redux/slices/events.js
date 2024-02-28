import { createSlice } from '@reduxjs/toolkit'
import { Login } from '../API/api';
import { getAllEvents } from '../API/events';

// איתחול של הסטיט
const initialState = null

const eventsSlice = createSlice({
    name: 'events',
    initialState,
    reducers: {
    },
    extraReducers: (builder) => {
        builder
            // updatePersonServerAction - פונקצית ה asyncThunk
            // מחזירה אובייקט שעליו 3 פונקציות
            // 1. לפני שהפעולה הסתיימה - pending לכאן נגיע במצב של
            .addCase(getAllEvents.fulfilled, (state, action) => {
                const events = action.paylode.map((e) => {
                    return {
                        start: e.start, end: e.end, title: `profession ${e.proffetion}`, moreOption: { e }
                    }
                })
                state = events
            })
    }
});

// export const { } = eventsSlice.actions

export default eventsSlice.reducer
