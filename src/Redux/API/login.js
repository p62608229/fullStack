
export const Login = createAsyncThunk(
    'user/login',
    async () => {
        const response = await axios.get(`${BASE_URL}/User` );
        console.log(response, "respo");

        const Login = response.data; 
        return Login
    }
)