import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { BASE_URL } from "../../utils/URLs";

export const profession = createAsyncThunk(

    // השם של הפעולה
    'profession/profession',
    // שנשלח מהקומפוננטה person לכאן מגיע ה 
    async () => {
        console.log("proffetion ")
        const response = await axios.get(`${BASE_URL}/profession`);
        const profession = response.data;
        console.log(profession, "proffesion")

        // reducerב fullfiled מה שחוזר מהפונקציה יבוא לפונקציה ה 
        // rejected אם זה נכשל אז השגיאה תגיע לפונקציית ה
        return profession;
    }
);