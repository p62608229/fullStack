
export const Offer = createAsyncThunk(
    'offer/offer',
    async () => {
        const response = await axios.put(`${BASE_URL}/offer` );
        console.log(response, "respo");

        const Offer = response.data; 
        return Offer
    }
)