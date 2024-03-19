import { createSlice } from '@reduxjs/toolkit'
import { deleteCurrentUserOneOffer, getCurrentUserOffers, updateCurrentUserOneOffer } from '../API/offer';


// איתחול של הסטיט
const initialState = {
  offers: [],
  currentUserOffers: null
}

export const offerSlice = createSlice({
  name: 'offer',
  initialState,
  reducers: {
    addNewOffer: (state, action) => {
      state.offers.push(action.payload);
    },
    deleteCurrentUserOffers: (state) => {
      state.currentUserOffers = null
    }
  },
  extraReducers: (builder) => {
    builder
    .addCase(getCurrentUserOffers.fulfilled, (state, action) => {{
      state.currentUserOffers  = action.payload;
    }})
    .addCase(updateCurrentUserOneOffer.fulfilled, (state, action) => {{
      state.currentUserOffers.push(action.payload);
    }})
    .addCase(deleteCurrentUserOneOffer.fulfilled, (state, action) => {{
      state.currentUserOffers = state.currentUserOffers.filter(o => o.id != action.payload)
    }})
  }
});

export const { addNewOffer } = offerSlice.actions

export default offerSlice.reducer
