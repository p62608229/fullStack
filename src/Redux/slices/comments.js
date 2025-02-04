import { createSlice } from '@reduxjs/toolkit'
import { AddComment, GetComments } from '../API/comment';
import { demoCommentsList } from '../../~not use/demoValues/comments';

// איתחול של הסטיט
const initialState = {
  // comments: [],
  comments: demoCommentsList,
  status: "init"
}


export const commentSlice = createSlice({
  // שם הסלייס – אסור לשתי סלייסים להיות בעלי אותו שם
  name: 'comment',
  initialState,
  reducers: {},

  extraReducers: (builder) => {
    builder
      // updatePersonServerAction - פונקצית ה asyncThunk
      // מחזירה אובייקט שעליו 3 פונקציות
      // 1. לפני שהפעולה הסתיימה - pending לכאן נגיע במצב של
      .addCase(GetComments.pending, (state, action) => {
        state.status = "pending"
      })
      // 2. fulfilled -> הצלחה - לכאן נגע כאשר הפעולה הסתימה בהצלחה
      .addCase(GetComments.fulfilled, (state, action) => {
        state.comments = action.payload;

        state.status = "success"


      })
      // 3. לכאן נגיע במקרה של כישלון
      .addCase(GetComments.rejected, (state, action) => {
        state.status = "error"
      })
      // .addCase(AddComment.pending, (state, action) => {
      //   state.status = "pending"
      // })

      .addCase(AddComment.fulfilled, (state, action) => {
        state.status = "success"
        state.comments.push(action.payload)
        console.log("עיייייייי",state.comments)
      })
      .addCase(AddComment.rejected, (state, action) => {
        state.status = "error"
      })

  },

})

export default commentSlice.reducer
