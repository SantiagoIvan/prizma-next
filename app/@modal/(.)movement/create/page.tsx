import MovementForm from "@/components/MovementForm";
import {createMovement} from "@/app/services/movements/actions";
import Modal from "@/components/Modal";

const Page = () => {
    return (
        <Modal title="Crear gasto">
            <MovementForm submitMovement={createMovement}/>
        </Modal>
    )
};

export default Page;