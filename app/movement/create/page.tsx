import MovementForm from "@/components/MovementForm";
import {createMovement} from "@/app/services/movements/actions";

const Page = () => {
    return (
        <div className="text-center p-10 max-w-md mx-auto">
            <h4>Crear gasto</h4>
            <MovementForm submitMovement={createMovement}/>
        </div>
    )
};

export default Page;