import { ShowUser } from "./showUser";

export const SendEmail = (props) => {

    const { users, option } = props;

    return (
        <>
            {users.map((u) => <ShowUser user={u} option={option} />)}
        </>
    )
}
