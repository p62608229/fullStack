
export const getAllEvents = createAsyncThunk(

    'events/getAllEvents',

    async () => {
        const response = await axios.get(
            `${BASE_URL}/offer`);

            const events = response.data;

        return events;
    }
  );