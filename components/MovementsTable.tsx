'use client'

import {Table, TableBody, TableHead, TableHeader, TableRow} from "@/components/ui/table";
import {Movement} from "@/schemas/MovementSchema";
import MovementRow from "@/components/MovementRow";
import {useState} from "react";
import {AlertConfirmation} from "@/components/AlertConfirmation";
import {deleteMovement} from "@/app/services/movements/actions";
import {useRouter} from "next/navigation";
import {FilterOptions} from "@/lib/utils";

const MovementsTable = ({movements, showModalWithMovement, setMovements} :
                        {
                            movements?: Movement[],
                            setMovements: (value: Movement[] | ((prevVar: Movement[]) => Movement[])) => void,
                            showModalWithMovement: (mov: Movement | undefined) => void,
                        }) => {
    const [showConfirmationAlert, setShowConfirmationAlert] = useState(false)
    const [expenseToDelete, setExpenseToDelete] = useState<Movement | undefined>()
    const router = useRouter()

    const handleOpenConfirmationAlert = (movement: Movement) => {
        setShowConfirmationAlert(true)
        setExpenseToDelete(movement)
    }

    const handleCloseConfirmationAlert = () => {
        setShowConfirmationAlert(false)
        setExpenseToDelete(undefined)
    }

    const handleConfirmDelete = async () => {
        if(expenseToDelete) await deleteMovement(expenseToDelete)
        handleCloseConfirmationAlert()
        router.refresh()
        setMovements( (prev: Movement[]) => {
            return prev.filter((mov: Movement) => mov.id != expenseToDelete?.id )
        })
    }

    if (!movements || movements.length < 1) return (
        <div className="text-center text-black text-2xl">- No data to display -</div>
    )
    return (
        <div className="rounded-lg border">
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Date</TableHead>
                        <TableHead>Origin</TableHead>
                        <TableHead>Description</TableHead>
                        <TableHead className="text-right">Amount</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {movements.map((movement: Movement, index) => (
                        <MovementRow
                            movement={movement}
                            key={index}
                            openConfirmationModal={handleOpenConfirmationAlert}
                            showModalWithMovement={showModalWithMovement}
                        />
                    ))}
                </TableBody>
            </Table>
            <AlertConfirmation
                open={showConfirmationAlert}
                setOpen={setShowConfirmationAlert}
                confirmationAction={handleConfirmDelete}
                message="Delete Movement"
            />
        </div>
    )
}

export default MovementsTable