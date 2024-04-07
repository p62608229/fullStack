import { createSlice } from '@reduxjs/toolkit'
import { deleteCurrentUserOneRequest, getAllCurrentUserRequests, updateCurrentUserOneRequest,  } from '../API/request';
import { demoRequestList } from '../../~not use/demoValues/requests';


// איתחול של הסטיט
const initialState = {
  request: []
}

export const RequestSlice = createSlice({
  name: 'request',
  initialState,
  reducers: {
    Request: (state, action) => {
      state.request.push(action.payload);
    },
    deleteCurrentUserRequests: (state) => {
      state.currentUserRequests = null
    },
    updateOneCurrentUserRequest: (state, action) => {
      debugger
      const index = state.currentUserRequests.findIndex(r => r.requestCode === action.payload.eventId);
      state.currentUserRequests[index] = {
        ...state.currentUserRequests[index],
        ...action.payload.currentEvent
      };
    }
  },
  extraReducers: (builder) => {
    builder
    .addCase(updateCurrentUserOneRequest.fulfilled, (state, action) => {{
      state.currentUserRequests.push(action.payload);
    }})
    .addCase(deleteCurrentUserOneRequest.fulfilled, (state, action) => {{
      state.currentUserRequests = state.currentUserRequests.filter(r => r.id != action.payload);
    }})
  }
});

export const { deleteCurrentUserRequests, updateOneCurrentUserRequest } = RequestSlice.actions

export default RequestSlice.reducer
