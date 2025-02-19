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

export const getAllCurrentUserOffers = createAsyncThunk(
    'offer/getALlCurrentUserOffers',
    async (arg, { getState }) => {
        debugger
        try {
            const state = getState();
            console.log(state)
            const response = await axios.get(`${BASE_URL}/offer?id=${state.users.currentUser.id}`);
            console.log(response, "getAllCurrentUserOffers response");
    
            const Offers = response.data; 
            return Offers
        } catch (e) {
            console.log(e, "getCurrentUserOffers error")
        }
    }
)

export const updateCurrentUserOneOffer = createAsyncThunk(
    'offer/updateCurrentUserOneOffer',
    async (offerData) => {
        try {
            console.log("offerData",offerData);
            debugger
            //const {OfferCode,...offerDataWithoutCode}=offerData;
            
            // console.log(response, "updateCurrentUserOneOffer response");
    
            const response = await axios.put(`${BASE_URL}/offer`, offerData);
            const offer= response.data;
            return offer;
}
catch (e) {
    console.log(e, 'updateCurrentUserOneRequest error');
    throw e;
}
    
    
        // async (requestData) => {
            // console.log('request data', requestData)
            // debugger
            // try {
                // const { RequestCode, ...requestDataWithoutCode } = requestData;
                // debugger
        // ole.log('------',requestData)
                // const response = await axios.put(`${BASE_URL}/Request`, requestDataWithoutCode);
                // console.log(response, "updateCurrentUserOneRequest response");

    }
)

export const deleteCurrentUserOneOffer = createAsyncThunk(
    'offer/deleteCurrentUserOneOffer',
    async (id) => {
        try  {
            const response = await axios.delete(`${BASE_URL}/offer/${id}`);
            console.log(response, "deleteCurrentUserOneOffer response");
            return id
        } catch(e) {
            console.log(e, "deleteCurrentUserOneOffer error")
        }})
        export const searchrequest = createAsyncThunk(
            'user/searchrequest',
            async () => {
            

                    const response = await axios.post(`${BASE_URL}/user/searchrequest`);
                    console.log(response, "searchrequest response");
                   const searchrequest=response.data
               return searchrequest
        
            }
        
        )

            

export const chngeInCalnderMode = createAsyncThunk(
    'offer/chngeInCalnderMode',
    async (offerCode) => {
        try  {
            const response = await axios.delete(`${BASE_URL}/offer/${offerCode}`);
            console.log(response, "chngeInCalnderMode response");
            return response.data
        } catch(e) {
            console.log(e, "chngeInCalnderMode error")
        }

    }
)