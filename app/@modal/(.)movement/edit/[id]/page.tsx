import Modal from "@/components/Modal";
import MovementForm from "@/components/MovementForm";
import {updateMovement} from "@/app/services/movements/actions";
import {getMovement} from "@/app/services/movements/actions";


const Page = async ({params} : {params: Promise<{id: string}>}) => {
    const id = (await params).id
    const movement = await getMovement(id)

    return (
        <Modal title="Editar gasto">
            <MovementForm movement={movement} submitMovement={updateMovement}/>
        </Modal>
    )
};

export default Page;