import { createSlice } from '@reduxjs/toolkit'
import { demoUser } from '../../~not use/demoValues/user';

const initialState = {
  currentUser: null
  // currentUser: demoUser,
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
    searchrequest:(state,action)=>{
      state.currentUser=action.payload;
    },
    
  }
  
});
export const { updateCurrentUser,  deleteCurrentUser,searchrequest } = usersSlice.actions

export default usersSlice.reducer
