import { createSlice } from '@reduxjs/toolkit'
import { demoUser } from '../../~not use/demoValues/user';

const initialState = {
  currentUser: null,
  searchrequestoroffers: null,
}

export const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    updateCurrentUser: (state, action) => {
      state.currentUser = action.payload;
    },
    deleteCurrentUser: (state) => {
      state.currentUser = null;
    },
    searchrequestoroffers:(state,action)=>{
      state.searchrequestoroffers=action.payload;
    },
    searchrequest: (state, action) => {
      state.searchrequest = action.payload
    }
  
  }
  
});
export const { updateCurrentUser,  deleteCurrentUser,searchrequestoroffers } = usersSlice.actions

export default usersSlice.reducer
