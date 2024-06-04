import { createSlice } from '@reduxjs/toolkit'
import { profession } from '../API/profession';
import { demoProfessionList } from '../../~not use/demoValues/profession';

// איתחול של הסטיט
const initialState = {
  profession: null,
  // profession: demoProfessionList,
  status: "init"
}


export const proffesionSlice = createSlice({
  // שם הסלייס – אסור לשתי סלייסים להיות בעלי אותו שם
  name: 'profession',
  initialState,
  reducers: {
  },

  extraReducers: (builder) => {
    builder
      // updatePersonServerAction - פונקצית ה asyncThunk
      // מחזירה אובייקט שעליו 3 פונקציות
      // 1. לפני שהפעולה הסתיימה - pending לכאן נגיע במצב של
      .addCase(profession.pending, (state, action) => {
        state.status = "pending"
      })
      // 2. fulfilled -> הצלחה - לכאן נגע כאשר הפעולה הסתימה בהצלחה
      .addCase(profession.fulfilled, (state, action) => {
        state.profession = action.payload;
        state.status = "success"

      })
      // 3. לכאן נגיע במקרה של כישלון
      .addCase(profession.rejected, (state, action) => {
        state.status = "error"
      })
    },
})
export default proffesionSlice.reducer
