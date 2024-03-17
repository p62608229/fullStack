import { configureStore } from "@reduxjs/toolkit"
import commentsReducer from "./slices/comments"
import usersReducer from "./slices/users"
import offerReducer from './slices/offer'
import requestReducer from './slices/request'
import proffesionReducer from './slices/profession'
//import eventsReducer from "./slices/events"


export const store = configureStore({
    reducer: {
        users: usersReducer,
        comments: commentsReducer,
        offer: offerReducer,
        request:requestReducer,
        profession:proffesionReducer
       // events: eventsReducer

    },
})
