import { createAsyncThunk } from "@reduxjs/toolkit";
import { BASE_URL } from "../../utils/URLs";
import axios from "axios";

export const getAllCurrentUserRequests = createAsyncThunk(
    'request/getAllCurrentUserRequests',
    async (arg, { getState }) => {
        try {

            const state = getState();
            const response = await axios.get(`${BASE_URL}/Request?id=${state.users.currentUser.id}`);
            console.log(response, "getAllCurrentUserRequests response");

            const requests = response.data;
return requests
            // const r = requests.map(r =>
            //     r.requestUserId == state.users.currentUser.id ? { ...r, offer: true } : r
            // )

            // return r;

        } catch (e) {
            console.log(e, "getAllCurrentUserRequests error")
        }
    }
)

// export const updateCurrentUserOneRequest = createAsyncThunk(
//     'request/updateCurrentUserOneRequest',
//     async () => {
//         try {
//             const response = await axios.put(`${BASE_URL}/Request` );
            
//             console.log(response, "updateCurrentUserOneRequest response");

//             const request = response.data;
//             return request
//         }
//         catch (e) {
//             console.log(e, 'deleteCurrentUserOneRequest error')
//         }
//     }
// )
export const updateCurrentUser = createAsyncThunk(
    'request/updateCurrentUserOneRequest',
    async (requestData) => {
        try {
            const { requestCode, ...requestDataWithoutCode } = requestData;
            const response = await axios.put(`${BASE_URL}/Request/${requestCode}`, requestDataWithoutCode);
            console.log(response, "updateCurrentUserOneRequest response");

            const request = response.data;
            return request;
        }
        catch (e) {
            console.log(e, 'updateCurrentUserOneRequest error');
            throw e;
        }
    }
);




export const deleteCurrentUserOneRequest = createAsyncThunk(
    'request/deleteCurrentUserOneRequest',
    async (id) => {
        try {
            const response = await axios.delete(`${BASE_URL}/Request/${id}`);
            console.log(response, "deleteCurrentUserOneRequest response");
            return id;debugger
        }
        catch (e) {
            console.log(e, 'deleteCurrentUserOneRequest error')
        }

    }
)
