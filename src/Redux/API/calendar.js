import { createAsyncThunk } from "@reduxjs/toolkit";
import { BASE_URL } from "../../utils/URLs";
import axios from "axios";

export const getAllEvents = createAsyncThunk(
    'calendar/getAllEvents',
    async (arg, { getState }) => {
        try {
          const state = getState()
            // const url = `${BASE_URL}/Request/UserCodeOffer`
            // const response = await axios.post(url, null, { params: { RCode, offerCode, } });
            const url =`${BASE_URL}/Request/GetByUserId?userid=${state.users.currentUser.id}`
            const response = await axios.get(url);
            console.log(response, "getAllCurrentUserRequests response");
            // const r = requests.map(r =>
                // r.userO.id == state.users.currentUser.id ? { ...r, offer: true } : r
            // )
            debugger
            return response.data;

        } catch (e) {
            console.log(e, "getAllCurrentUserRequests error")
        }
    }
)

export const eventsByCode = createAsyncThunk(
  'Request/UserCodeOffer',
  async ({ RCode, offerCode }, thunkAPI) => {
    try {
        const url = `${BASE_URL}/Request/UserCodeOffer`
      const response = await axios.post(url, null, { params: { RCode, offerCode } });
      console.log(response, "UserCodeOffer");

      return response.data;
    } catch (error) {
      console.error(error, "updateCurrentUserOneOffer error");
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);


