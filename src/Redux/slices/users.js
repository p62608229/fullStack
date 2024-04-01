import { createSlice } from '@reduxjs/toolkit'
import { demoUser } from '../../~not use/demoValues/user';

const initialState = {
  // currentUser: null
  currentUser: {sjf},
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
    }
  }
});
export const { updateCurrentUser,  deleteCurrentUser } = usersSlice.actions

export default usersSlice.reducer
