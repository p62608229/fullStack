import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux"
import { profession } from "../../Redux/API/profession";


export const ProfessionSelector = (props) => {
    const { setProfessionCode } = props
    const professions = useSelector(s => s.profession.profession);

    const dispatch = useDispatch();
    useEffect(() => {
        if (!professions)
            dispatch(profession())
    })

    console.log(professions, "pro")

    return (<div>
        {professions && <select onChange={(e) => setProfessionCode(e.target.value)}><option >choose pro</option>   {professions.map((p, index) => {
            return <option value={p.professionCode} key={index} >{p.profession1}</option>
        })}</select>}
    </div>)
}
