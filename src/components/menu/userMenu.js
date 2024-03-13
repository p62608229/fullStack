import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { deleteCurrentUser } from "../../Redux/slices/users";

export const UserMenu = () => {
  
  const navigate = useNavigate();
  const dispatch = useDispatch()

  return (
    <>
      <button onClick={(e) => navigate("/commentsPage")}>addComment</button>
      <button onClick={(e) => navigate("/offer")}>offer</button>
      <button onClick={(e) => navigate("/request")}>request</button>
      <button onClick={(e) => navigate("/checkreq")}>check</button>

      <button onClick={(e) => { dispatch(deleteCurrentUser()) }} >sign out</button>
      <Link to="calendar" >calnder</Link>

    </>
  )
}
