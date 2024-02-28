
export const getAllEvents = createAsyncThunk(

    // השם של הפעולה
    'events/getComment',
    // שנשלח מהקומפוננטה person לכאן מגיע ה 
    async () => {
        const response = await axios.get(
            `${BASE_URL}/offer`);

            const events = response.data;
            

        return events;
    }
  );