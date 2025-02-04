'use client'

import {Movement} from "@/schemas/MovementSchema";
import {TableCell, TableRow} from "@/components/ui/table";
import {XIcon} from "lucide-react";
import Link from "next/link";
import {useRouter} from "next/navigation";
import {FilterOptions} from "@/lib/utils";

const MovementRow = ({movement, openConfirmationModal, showModalWithMovement}:
                     {
                         movement: Movement,
                         openConfirmationModal: (arg0: Movement) => void,
                         showModalWithMovement: (arg0: Movement | undefined) => void,
                     }) => {


    return (
        <TableRow>
            <TableCell className="cursor-pointer" onClick={() => (movement)}>
                    {(movement.date)}
            </TableCell>
            <TableCell className="cursor-pointer" onClick={() => showModalWithMovement(movement)}>
                    {movement.origin}
            </TableCell>
            <TableCell className="cursor-pointer" onClick={() => showModalWithMovement(movement)}>
                    {movement.description}
            </TableCell>
            <TableCell className="text-right cursor-pointer" onClick={() => showModalWithMovement(movement)}>
                    {movement.amount}
            </TableCell>
            <TableCell className="text-red-800 flex justify-end cursor-pointer" onClick={() => openConfirmationModal(movement)}><XIcon /></TableCell>
        </TableRow>
    )
}

export default MovementRow;