import { Button } from "primereact/button"
import { useNavigate } from "react-router-dom"

export const BackAndNextButtons = () => {

    const navigate = useNavigate();

    return (
        <div>
            <Button icon="pi pi-arrow-left" rounded text severity="secondary" aria-label="Cancel" onClick={() => navigate(-1)} />
            <Button icon="pi pi-arrow-right" rounded text severity="secondary" aria-label="Cancel" onClick={() => navigate(+1)} />
        </div>
    )
}
