import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux"
import { profession } from "../Redux/API/profession";
import { Dropdown } from 'primereact/dropdown';


export const ProfessionSelector = (props) => {
    const { setProfessionCode, professionCode } = props;
    // const [selectedProfessionCode, setSelectedProfessionCode] = useState(""); // המשתנה והפונקציה החדשים

    const professions = useSelector(s => s.profession.profession);

    const dispatch = useDispatch();
    useEffect(() => {
        if (!professions)
            dispatch(profession())
    })

    console.log(professions, "pro")

   return (
      <div>

<Dropdown 
value={professionCode} 
onChange={(e) => {setProfessionCode(e.value)}} 
options={professions} 
optionLabel="profession1" 
placeholder="Select a Profession" 
className="w-full md:w-14rem" 
/>

  </div>)} 
    //     professions && <select onChange={(e) => setProfessionCode(e.target.value)}><option >choose pro</option>   {professions.map((p, index) => { 
    //        return <option value={p.professionCode} key={index} >{p.profession1}</option> 
    //     })}</select>}
    // // </div>) */}
    

