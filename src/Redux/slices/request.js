import { createSlice } from '@reduxjs/toolkit'


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
    }
  }
});

export const { addNewRequest } = RequestSlice.actions

export default RequestSlice.reducer
