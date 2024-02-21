import { configureStore } from "@reduxjs/toolkit"
import commentsReducer from "./slices/comments"
import usersReducer from "./slices/users"

export const store = configureStore({
    reducer: {
        users: usersReducer,
        comments: commentsReducer

    },
})
