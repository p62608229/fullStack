import { createAsyncThunk } from "@reduxjs/toolkit";
import { BASE_URL } from "../../utils/URLs";
import axios from "axios";

export const getAllEvents = createAsyncThunk(
    'calendar/getAllEvents',
    async (arg, { getState }) => {
        try {

            const state = getState();
            const response = await axios.get(`${BASE_URL}/Request?id=${state.users.currentUser.id}`);
            console.log(response, "getAllCurrentUserRequests response");

            const requests = response.data;

            const r = requests.map(r =>
                r.requestUserId == state.users.currentUser.id ? { ...r, offer: true } : r
            )

            return r;

        } catch (e) {
            console.log(e, "getAllCurrentUserRequests error")
        }
    }
)

