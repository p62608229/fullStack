import { useNavigate } from "react-router-dom";
import { Menubar } from 'primereact/menubar';
import 'primeicons/primeicons.css';
import 'primereact/resources/themes/lara-light-indigo/theme.css';
import 'primereact/resources/primereact.css';
import 'primeflex/primeflex.css';
import { BackAndNextButtons } from "./backAndNextButtons";



export const DefualtMenu = () => {
    const navigate = useNavigate();

    const defualtMenuItems = [
        {
            icon: 'pi pi-sign-in', command: () => { navigate("/login") }, items: [
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
       
    ]

    return (
        <>
            <div className="Card" >
                <Menubar model={defualtMenuItems} />
     
            <button onClick={(e) => navigate("/login")}>sign in</button>
             <button onClick={(e) => navigate("/register")}>sign up</button> 
             </div>
            {/*  */}

        </>
    )
}
