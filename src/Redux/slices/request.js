import { createSlice } from '@reduxjs/toolkit'
import { deleteCurrentUserOneRequest, getAllCurrentUserRequests, updateCurrentUserOneRequest, updateCurrentUser } from '../API/request';
import { demoRequestList } from '../../~not use/demoValues/requests';
import { CurrentUserRequests } from '../../components/profile/currentUserRequests';
import { chngeInCalnderMode } from '../API/offer';


// איתחול של הסטיט
const initialState = {
  request: [],
  currentUserRequests: null,
  searchoffer: null
}

export const RequestSlice = createSlice({
  name: 'request',
  initialState,
  reducers: {
    Request: (state, action) => {
      // state.request.push(action.payload);
    },
    deleteCurrentUserRequests: (state) => {
      state.currentUserRequests = null
    },
    updateOneCurrentUserRequest: (state, action) => {
      debugger
      const index = state.currentUserRequests.findIndex(r => r.requestCode === action.payload.requestCode);
      state.currentUserRequests [index]= action.payload;
        // ...state.currentUserRequests[index],
        // ...action.payload.currentEvent
      },
    
    searchOffer: (state, action) => {
      
      state.searchoffer = action.payload
      debugger
    }
  },
  extraReducers: (builder) => {
    builder
    .addCase(getAllCurrentUserRequests.fulfilled, (state, action) => {{
      
      state.currentUserRequests  = action.payload;
    }})
    .addCase(updateCurrentUser.fulfilled, (state, action) => {{
      state.currentUserRequests = state.currentUserRequests.filter(o => o.requestCode != action.payload.requestCode)

      state.currentUserRequests.push(action.payload);
    }})
    .addCase(deleteCurrentUserOneRequest.fulfilled, (state, action) => {{
      state.currentUserRequests = state.currentUserRequests.filter(r => r.id != action.payload);
    }})
    .addCase(chngeInCalnderMode.fulfilled, (state, action) => {{
      state.currentUserRequests = state.currentUserRequests.filter(o => o.requestCode != action.payload.requestCode)
      state.currentUserRequests.push(action.payload);
    }})
  }
});

export const { deleteCurrentUserRequests, updateOneCurrentUserRequest, searchOffer } = RequestSlice.actions

export default RequestSlice.reducer
