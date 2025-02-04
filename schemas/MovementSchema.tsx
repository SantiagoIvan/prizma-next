import { z } from "zod"

export const MovementSchema = z.object({
    id: z.string(),
    description: z.string().optional(),
    date: z.string(),
    origin: z.string().min(4, { message: "Debe tener 4 caracteres como minimo" }),
    amount: z.string(), // me transforma el string ingresado a numero si es posible.
})

export type Movement = z.infer<typeof MovementSchema>