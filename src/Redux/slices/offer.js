import { createSlice } from '@reduxjs/toolkit'


// איתחול של הסטיט
const initialState = {
  offers: []
}

export const offerSlice = createSlice({
  name: 'offer',
  initialState,
  reducers: {
    addNewOffer: (state, action) => {
      state.offers.push(action.payload);
    }
  }
});

export const { addNewOffer } = offerSlice.actions

export default offerSlice.reducer
