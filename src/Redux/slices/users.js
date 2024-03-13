import { createSlice } from '@reduxjs/toolkit'


// איתחול של הסטיט
const initialState = {
  currentUser: null,
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



