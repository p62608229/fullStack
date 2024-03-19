import { createAsyncThunk } from "@reduxjs/toolkit";
import { BASE_URL } from "../../utils/URLs";
import axios from "axios";

export const getAllCurrentUserRequests = createAsyncThunk(
    'request/getAllCurrentUserRequests',
    async (arg, { getState }) => {        
        try {
            const state = getState();
            console.log(state)
            const response = await axios.get(`${BASE_URL}/Request?id=${state.users.currentUser.id}`);
            console.log(response, "getAllCurrentUserRequests response");

            const Offers = response.data; 
            return Offers

        } catch (e) {
            console.log(e, "getAllCurrentUserRequests error")
        }
    }
)

export const updateCurrentUserOneRequest = createAsyncThunk(
    'request/updateCurrentUserOneRequest',
    async (newRequest) => {
        try {
            const response = await axios.post(`${BASE_URL}/Request`, {newRequest});
            console.log(response, "updateCurrentUserOneRequest response");

            const Offers = response.data; 
            return Offers
        }
        catch (e) {
            console.log(e, 'deleteCurrentUserOneRequest error')
        }
    }
)

export const deleteCurrentUserOneRequest = createAsyncThunk(
    'request/deleteCurrentUserOneRequest',
    async (requestId) => {
        try {
            const response = await axios.delete(`${BASE_URL}/Request/${requestId}`);
            console.log(response, "deleteCurrentUserOneRequest response");
            return requestId;
        }
        catch (e) {
            console.log(e, 'deleteCurrentUserOneRequest error')
        }

    }
)