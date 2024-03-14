
import { useRef } from 'react';
import { Menu } from 'primereact/menu';
import { useDispatch } from 'react-redux';
import { deleteCurrentUser } from '../Redux/slices/users';
import { Outlet, useNavigate } from 'react-router-dom';

export default function Profile() {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const items = [
        {
            label: 'my actions',
            className: "file1",
            items: [
                {
                    label: 'requests',
                    icon: 'pi pi-question'
                },
                {
                    label: 'offers',
                    icon: 'pi pi-wrench'
                },
                {
                    label: 'comments',
                    icon: 'pi pi-comment',
                    command: () => { navigate("comments") }
                }
            ]
        },
        {
            label: 'Profile',
            items: [
                {
                    label: 'Edit Profile',
                    icon: 'pi pi-user-edit',
                },
                {
                    label: 'Logout',
                    icon: 'pi pi-sign-out',
                    command: () => { dispatch(deleteCurrentUser()) }
                }
            ]
        }
    ];

    return (
        <div className="card flex justify-content-start" style={{ margin: '30px' }}>
            <Menu model={items} />
            <Outlet />
        </div>
    )
}
