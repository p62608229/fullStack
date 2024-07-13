import { createSlice } from '@reduxjs/toolkit'
import { chngeInCalnderMode, deleteCurrentUserOneOffer, getAllCurrentUserOffers, updateCurrentUserOneOffer } from '../API/offer';
import { demoOffersList } from '../../~not use/demoValues/offers';

// איתחול של הסטיט
const initialState = {
  offers: [],
  currentUserOffers: null,
  searchrequest: null


  // currentUserOffers: demoOffersList
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
    },
 setSearchRequestDate : (date) => {
      return {
        type: 'SET_SEARCH_REQUEST_DATE',
        payload: date
      };
    },
    
    updateOneCurrentUserOffers: (state, action) => {
      debugger
      const index = state.currentUserOffers.findIndex(offer => offer.offerCode === action.payload.offerCode);

      state.currentUserOffers[index] = action.payload;
      // if (index) {
      //   const date = new Date(index.updatedAt);
        
        
      // console.log('Offer updated at:', date);
      // } else {
      //   console.warn(`Offer with offerCode ${action.payload.offerCode} not found.`);
      // }
    },
    searchrequest: (state, action) => {
      state.searchrequest = action.payload
      debugger
    }
  },
  extraReducers: (builder) => {
    builder
    .addCase(getAllCurrentUserOffers.fulfilled, (state, action) => {{
      
      state.currentUserOffers  = action.payload;
    }})
    .addCase(updateCurrentUserOneOffer.fulfilled, (state, action) => {{
      state.currentUserOffers=state.currentUserOffers .filter(o => o.offerCode != action.payload.offerCode)
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

export const { addNewOffer, updateOneCurrentUserOffers ,searchrequest,deleteCurrentUserOffers } = offerSlice.actions

export default offerSlice.reducer
