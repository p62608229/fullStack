import { useEffect, useState } from "react";

export const EditProfile = (props) => {

    const [newCustomer, setNewCustomer] = useState(props.customer);
    // const dispatch = useDispatch();
    useEffect(() => {
        setNewCustomer(props.customer)
    }, [props.customer])

    const handleChange = (e) => {
        const { name, value } = e.target;

        console.log(name, value)
        setNewCustomer({ ...newCustomer, [name]: value });
    };

    const handleSubmit = async () => {

    };

    return (
        <div className='AddPerson'>
            edit profile
            {/* <h2>הוספת Person חדש</h2>
            <label>שם: <input type="text" name="name" value={newCustomer.name} onChange={handleChange} /></label>
            <label> כתובת<input type="text" name="custAddress" value={newCustomer.custAddress} onChange={handleChange} /></label>
            <label>עיר <input type="text" name="custCity" value={newCustomer.custCity} onChange={handleChange} /></label>
            <label>שם העובד<input type="text" name="employeeName" value={newCustomer.employeeName} onChange={handleChange} /></label>
            <button onClick={handleSubmit}>הוסף</button> */}
        </div>
    );
};