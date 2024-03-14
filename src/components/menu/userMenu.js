import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { deleteCurrentUser } from "../../Redux/slices/users";
import { Menubar } from 'primereact/menubar';


export const UserMenu = () => {

  const navigate = useNavigate();

  const userMenuItems = [
    { icon: 'pi pi-user', command: () => { navigate("/profile") } },
    { label: 'Home', icon: 'pi pi-home', command: () => { navigate("./") } },
    {
      label: 'comments', icon: 'pi  pi-comment', items: [
        { label: 'show all comments', icon: 'pi pi-comments', command: () => { navigate("/comments") } },
        { label: 'add comments', icon: 'pi pi-plus', command: () => { navigate("/comments/new") } },
      ]
    },
    {
      label: 'offers & requests', icon: 'pi pi-server', items: [
        { label: 'new offer', icon: "pi pi-plus", command: () => { navigate("/offer") } },
        { label: 'new request', icon: "pi pi-plus", command: () => { navigate("/request") } },
      ]
    },
    { label: 'calendar', icon: 'pi pi-calendar', command: () => { navigate("/calendar") } },
  ]

  return (
    <div className="card">
      <Menubar model={userMenuItems} />
    </div>
  )
}
