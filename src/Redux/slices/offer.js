import { createSlice } from '@reduxjs/toolkit'
import { chngeInCalnderMode, deleteCurrentUserOneOffer, getAllCurrentUserOffers, updateCurrentUserOneOffer } from '../API/offer';
import { demoOffersList } from '../../~not use/demoValues/offers';


// איתחול של הסטיט
const initialState = {
  offers: [],
  // currentUserOffers: null
  currentUserOffers: demoOffersList

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
    .addCase(getAllCurrentUserOffers.fulfilled, (state, action) => {{
      state.currentUserOffers  = action.payload;
    }})
    .addCase(updateCurrentUserOneOffer.fulfilled, (state, action) => {{
      state.currentUserOffers.push(action.payload);
    }})
    .addCase(deleteCurrentUserOneOffer.fulfilled, (state, action) => {{
      state.currentUserOffers = state.currentUserOffers.filter(o => o.offerCode != action.payload)
    }})
    .addCase(chngeInCalnderMode.fulfilled, (state, action) => {{
      state.currentUserOffers = state.currentUserOffers.filter(o => o.offerCode != action.payload.offerCode)
      state.currentUserOffers.push(action.payload);
    }})
  }
});

export const { addNewOffer } = offerSlice.actions

export default offerSlice.reducer
