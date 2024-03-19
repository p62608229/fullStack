import { createAsyncThunk } from "@reduxjs/toolkit";
import { BASE_URL } from "../../utils/URLs";
import axios from "axios";

export const Offer = createAsyncThunk(
    'offer/offer',
    async () => {
        const response = await axios.put(`${BASE_URL}/offer` );
        console.log(response, "respo");

        const Offer = response.data; 
        return Offer
    }
)

export const getCurrentUserOffers = createAsyncThunk(
    'offer/getCurrentUserOffers',
    async (arg, { getState }) => {
        try {
            const state = getState();
            console.log(state)
            const response = await axios.get(`${BASE_URL}/offer?id=${state.users.currentUser.id}`);
            console.log(response, "getCurrentUserOffers response");
    
            const Offers = response.data; 
            return Offers
        } catch (e) {
            console.log(e, "getCurrentUserOffers error")
        }
    }
)

export const updateCurrentUserOneOffer = createAsyncThunk(
    'offer/updateCurrentUserOneOffer',
    async (newOffer) => {
        try {
            const response = await axios.post(`${BASE_URL}/offer`, {newOffer});
            console.log(response, "updateCurrentUserOneOffer response");
    
            const Offers = response.data; 
            return Offers
        } catch (e) {
            console.log(e, "updateCurrentUserOneOffer error")
        }

    }
)

export const deleteCurrentUserOneOffer = createAsyncThunk(
    'offer/deleteCurrentUserOneOffer',
    async (offerId) => {
        try  {
            const response = await axios.delete(`${BASE_URL}/offer/${offerId}`);
            console.log(response, "deleteCurrentUserOneOffer response");
            return offerId
        } catch(e) {
            console.log(e, "deleteCurrentUserOneOffer error")
        }

    }
)
