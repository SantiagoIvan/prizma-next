"use server"

import {Movement, MovementSchema} from "@/schemas/MovementSchema";
import {FilterOptions, getBaseURL} from "@/lib/utils";
import {z} from "zod";

type ReturnType = {
    success?: boolean,
    message: string,
    errors?: Record<string, unknown>,
    data?: string,
}

const parseMovement = (movement: Movement) => {
    const parsed = MovementSchema.safeParse(movement)
    if (!parsed.success) {
        return {
            success: false,
            message: "Submission Failed",
            errors: parsed.error.flatten().fieldErrors
        }
    }
    return parsed;
}

const parseMovementResponse = (movementResponse: {data: {rows: Movement[]}}) => {
    const parsed = z.array(MovementSchema).safeParse(movementResponse?.data?.rows)
    if (!parsed.success) throw new Error(`Error parsing response: ${parsed.error}`)
    return parsed.data;
}

export async function updateMovement(movement: Movement): Promise<ReturnType> {
    const parsed = parseMovement(movement)
    if (!parsed.success) return new Promise(() => parsed.errors)

    await fetch(`${getBaseURL()}/movement/${movement.id}`, {
        method: 'PUT',
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            ...movement,
        })
    })
    return { message: "Movement Updated! 🎉" }
}

export async function createMovement(movement: Movement): Promise<ReturnType> {
    const parsed = parseMovement(movement)
    if (!parsed.success) return new Promise(() => parsed.errors)

    const createdResponse = await fetch(`${getBaseURL()}/movement/`, {
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            ...movement,
        })
    })
    const created = await createdResponse.json()
    return { message: "Movement Created! 🎉", data: JSON.stringify(created) }
}

export async function deleteMovement(movement: Movement): Promise<ReturnType> {
    const parsed = parseMovement(movement)
    if (!parsed.success) return new Promise(() => parsed.errors)

    await fetch(`${getBaseURL()}/movement/${movement.id}`, {
        method: 'DELETE',
        headers: {
            "Content-Type": "application/json",
        },

    })

    return {message: "Deleted successfully"}
}

export async function getMovement(id: string) {
    try{
        const movementResponse = await fetch(`${getBaseURL()}/movement/${id}`, {
            method: 'GET',
            headers: {
                "Content-Type": "application/json",
            }
        })
        const movement = await movementResponse.json()

        return movement.data
    }catch(e){
        console.log("Error fetching movement", e)
    }
}

export async function getMovements() {
    try{
        const movementsResponse = await fetch(`${getBaseURL()}/movement`, {
            headers: {
                "Content-Type": "application/json",
            }
        })
        const movements = await movementsResponse.json()
        return parseMovementResponse(movements)
    }catch(e){
        console.log("Error fetching movements", e)
        return []
    }
}

export async function getBalance(){
    try{
        const balanceResponse = await fetch(`${getBaseURL()}/movement/balance`, {
            headers: {
                "Content-Type": "application/json",
            }
        })
        const balance = await balanceResponse.json()
        return balance.data.balance
    }catch(e){
        console.log("Error getBalance(): ", e)
        return 0
    }
}

export async function filterMovements(filterOptions: FilterOptions) {
    try{
        const filteredMovementsResponse = await fetch(`${getBaseURL()}/movement/filter`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                ...filterOptions,
            })
        })

        const parsed = await filteredMovementsResponse.json()
        return parsed.data
    }catch(e){
        console.log("Error filterMovements", e)
        return []
    }
}