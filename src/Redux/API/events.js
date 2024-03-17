<<<<<<< HEAD
import axios from "axios";
import { BASE_URL } from "../../utils/URLs";
import { createAsyncThunk } from "@reduxjs/toolkit";
=======
>>>>>>> d6045df20e03e1a5dc9a1423868a0b3b08afdd6c

export const getAllEvents = createAsyncThunk(

    'events/getAllEvents',

    async () => {
        const response = await axios.get(
            `${BASE_URL}/offer`);

            const events = response.data;

        return events;
    }
  );