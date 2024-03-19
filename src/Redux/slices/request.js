import { createSlice } from '@reduxjs/toolkit'
import { deleteCurrentUserOneRequest, getAllCurrentUserRequests, updateCurrentUserOneRequest,  } from '../API/request';


// איתחול של הסטיט
const initialState = {
  request: [],
  currentUserRequests:  null
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
    }
  },
  extraReducers: (builder) => {
    builder
    .addCase(getAllCurrentUserRequests.fulfilled, (state, action) => {{
      state.currentUserRequests  = action.payload;
    }}) 
    .addCase(updateCurrentUserOneRequest.fulfilled, (state, action) => {{
      state.currentUserRequests.push(action.payload);
    }})
    .addCase(deleteCurrentUserOneRequest.fulfilled, (state, action) => {{
      state.currentUserRequests = state.currentUserRequests.filter(r => r.id != action.payload);
    }})
  }
});

export const { deleteCurrentUserRequests } = RequestSlice.actions

export default RequestSlice.reducer
