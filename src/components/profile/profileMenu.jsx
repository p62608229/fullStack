
import { useRef } from 'react';
import { Menu } from 'primereact/menu';
import { useDispatch } from 'react-redux';
import { deleteCurrentUser } from '../../Redux/slices/users';
import { Outlet, useNavigate } from 'react-router-dom';

export const ProfileMenu = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const items = [
        {
            label: 'my actions',
            items: [
                {
                    label: 'requests',
                    icon: 'pi pi-question',
                    command: () => { navigate("./requests") }
                },
                {
                    label: 'offers',
                    icon: 'pi pi-wrench',
                    command: () => { navigate("./offers") }
                }
            ]
        },
        {
            label: 'calendar', items: [
                {
                    label: 'calendar',
                    icon: 'pi pi-calendar',
                    command: () => { navigate("./calendar") }
                }

            ]
        },
        {
            label: 'Profile',
            items: [
                {
                    label: 'Edit Profile',
                    icon: 'pi pi-user-edit',
                    command: () => { navigate("./edit") }
                },
                {
                    label: 'Logout',
                    icon: 'pi pi-sign-out',
                    command: () => { dispatch(deleteCurrentUser()); navigate("/"); }
                }
            ]
        },
        ];

    return (
        <div className="card flex justify-content-start" style={{ margin: '30px' }}>
            <Menu model={items} />
            <Outlet />
        </div>
    )
}
