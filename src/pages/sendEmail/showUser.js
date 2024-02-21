import axios from "axios";
import { BASE_URL } from "../../utils/URLs";

export const ShowUser = (props) => {
    const { user, option } = props;

    async function handleSubmit() {
        const url = `${BASE_URL}/${option}/${user.id}`;
        try {
            const response = await axios.get(url);
        }
        catch (e) {
            console.log("error");
        }
    }

    return (
        <>
            {user.firstName}
            <button onClick={handleSubmit} >send mail</button>
        </>
    )

}