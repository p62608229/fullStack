import { useNavigate, Outlet } from "react-router-dom";
import { Menubar } from 'primereact/menubar';
import 'primeicons/primeicons.css';
import 'primereact/resources/themes/lara-light-indigo/theme.css';
import 'primereact/resources/primereact.css';
import 'primeflex/primeflex.css';
import { useSelector } from "react-redux";
import { Button } from "primereact/button";
import '../../css/Menu.css'
import { BackAndNextButtons } from "./backAndNextButtons";


export const Menu = () => {
    const navigate = useNavigate();
    const currentUser = useSelector(s => s.users.currentUser);

    const defaultMenuItems = [
        {
            icon: 'pi pi-sign-in', items: [
                {
                    label: 'sign in',
                    command: () => { navigate("/login") }
                },
                {
                    label: 'sign up',
                    command: () => { navigate("/register") }
                }
            ]
        },
        { label: 'Home', icon: 'pi pi-home', command: () => { navigate("/") } },
    ];

    const userMenuItems = [
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
    ];

    const end = currentUser && 
    <div className="color-pink">
        <Button onClick={() => navigate('profile')} style={{background: 'none',  border: 'none', position: "center"}}>
            <i className="pi pi-user color-pink" />
        </Button> 
        <div style={{textAlign: 'center', position: "center"}} >Hello {currentUser.firstName}</div> 
    </div>
    const start = <div> 
        <div> <img src="/img/logo.png" alt="Logo" style={{ width: '70px', height: '60px', marginRight: '10px'}} /> 
 </div>
    </div>

    return (
        <div className="card" >
        <Menubar model={currentUser? userMenuItems : defaultMenuItems} end={end} start={start} />
        <BackAndNextButtons /><Outlet /> 
   
   
       
       
       
       
        </div>        

    );

};
