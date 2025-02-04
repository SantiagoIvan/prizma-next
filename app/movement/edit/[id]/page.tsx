import MovementForm from "@/components/MovementForm";
import {getMovement} from "@/app/services/movements/actions";
import {updateMovement} from "@/app/services/movements/actions";

const Page = async ({params} : {params: Promise<{id: string}>}) => {
    const id = (await params).id
    const movement = await getMovement(id)

    if(!movement) return <div>Not found</div>
    return (
        <div className="text-center p-10 max-w-md mx-auto">
            <h4>Editar gasto</h4>
            <MovementForm movement={movement} submitMovement={updateMovement}/>
        </div>
    )
};

export default Page;