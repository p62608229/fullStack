import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { BASE_URL } from "../../utils/URLs";
import { Addcomment } from "../../components/add";

export const GetComments = createAsyncThunk(

    // השם של הפעולה
    'comments/GetComment',
    // שנשלח מהקומפוננטה person לכאן מגיע ה 
    async () => {
        const response = await axios.get(`${BASE_URL}/comment`);

            const comments = response.data;     
                   
  
        // reducerב fullfiled מה שחוזר מהפונקציה יבוא לפונקציה ה 
        // rejected אם זה נכשל אז השגיאה תגיע לפונקציית ה
        return comments;
    }
  );
  
export const AddComment = createAsyncThunk(
    'comments/AddComment',
    async (newcomment) => {
        console.log(newcomment, "newComment")
        const response = await axios.post(`${BASE_URL}/comment` ,newcomment);
        console.log(response.data, "respo");
        const AddComment = response.data; 
        return AddComment;
    }
)


// export const Register = createAsyncThunk(
//     'user/register',
//     async () => {
//         const response = await axios.get(`${BASE_URL}/User` );
//         console.log(response, "respo");

//         const Register = response.data; 
//         return Register
//     }
// )

//   export const createNewCustomer = createAsyncThunk(

//     // השם של הפעולה
//     'customers/create',
//     // שנשלח מהקומפוננטה person לכאן מגיע ה 
//     async (customer) => {
//         const response = await axios.put(
//             `${BASE_URL}/Cust/${customer.custId}`,    customer);

//             const customerCreated = response.data;
  
//         // reducerב fullfiled מה שחוזר מהפונקציה יבוא לפונקציה ה 
//         // rejected אם זה נכשל אז השגיאה תגיע לפונקציית ה
//         return customerCreated;
//     }
//   );

//   export const editCustomer = createAsyncThunk(

//     // השם של הפעולה
//     'customers/edit',
//     // שנשלח מהקומפוננטה person לכאן מגיע ה 
//     async (customer) => {
//         const response = await axios.put(
//             `${BASE_URL}/Cust/${comment.CommentUserId}`,  customer);

//             const customerCreated = response.data;
  
//         // reducerב fullfiled מה שחוזר מהפונקציה יבוא לפונקציה ה 
//         // rejected אם זה נכשל אז השגיאה תגיע לפונקציית ה
//         return customerCreated;
//     }
//   );