import { configureStore } from "@reduxjs/toolkit"
import commentsReducer from "./slices/comments"
import usersReducer from "./slices/users"
import requestReducer from './slices/request'
import proffesionReducer from './slices/profession'
import calendarReducer from  './slices/calendar'
import offerReducer from './slices/offer'


export const store = configureStore({
    reducer: {
        users: usersReducer,
        comments: commentsReducer,
        request:requestReducer,
        profession:proffesionReducer,
        calendar: calendarReducer,
        offer: offerReducer,

    },
})
