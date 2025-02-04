'use client'

import {Movement, MovementSchema} from "@/schemas/MovementSchema";
import {Button} from "@/components/ui/button";
import {useRouter} from "next/navigation";
import {useState} from "react";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {Form} from "@/components/ui/form";
import InputWithLabel from "@/components/InputWithLabel";
import * as React from "react";
import DateInputWithLabel from "@/components/DateInputWithLabel";
import {createMovement, updateMovement} from "@/app/services/movements/actions";
import {INITIAL_MOVEMENT_VALUE} from "@/lib/utils";

const MovementForm = ({movement, setMovements, handleBack} :
                     {
                         movement?: Movement,
                         setMovements: (value: Movement[] | ((prevVar: Movement[]) => Movement[])) => void,
                         handleBack: () => void
                     }) => {

    const router = useRouter()
    const [message, setMessage] = useState('')
    const [errors, setErrors] = useState({});

    const form = useForm<Movement>({
        mode: 'onBlur',//La validacion se activa al perder el foco del input
        resolver: zodResolver(MovementSchema),
        defaultValues: movement? {...movement} : {...INITIAL_MOVEMENT_VALUE},
    })


    const onSubmit = async () => {
        try{
            console.log("Submiting movement...")
            setMessage('')
            setErrors({})
            let result : ReturnType<Movement> | undefined;

            if(!movement) {
                console.log("creating");
                result = await createMovement(form.getValues())
                console.log(result)
            }
            else {
                console.log("updating");
                result = await updateMovement(form.getValues());
                console.log(result)
                result.data = form.getValues()
            }

            if (result?.errors) {
                setMessage(result.message)
                setErrors(result.errors)
                return
            } else {
                setMovements((prev: Movement[]) => [...prev, form.getValues()])
                setMessage(result.message)
                router.refresh()
            }
        }catch (e){
            setErrors(e)
        }
    }


    return (
        <div >
            {message && <p className="text-green-800">{message}</p>}
            {errors ? (
                <div className="mb-10 text-red-500">
                    {Object.keys(errors).map(key => (
                        <p key={key}>{`${key}: ${errors[key as keyof typeof errors]}`}</p>/*para que no marque error si tiro error[key]*/
                    ))}
                </div>
            ) : null}

            <Form {...form} >
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                    <InputWithLabel type="text" titleName="Origin" fieldName="origin" placeholder="Carrefour" />
                    <InputWithLabel type="text" titleName="Description" fieldName="description" placeholder="lorem ipsum" />
                    <InputWithLabel
                        type="text"
                        titleName="Amount"
                        fieldName="amount"
                        placeholder="9999"
                        /*onChange={(e) => { //lo marca como error pero anda bien por el ...props
                            const value = e.target.value
                            console.log(e.target.value)
                            if(/^-?\d*\.{0,1}\d+$/.test(value)) {form.setValue('amount', value)}
                        }}*/
                    />
                    <DateInputWithLabel titleName="Date" fieldName="date" />

                    <div className="flex justify-around">
                        <Button type="submit">Confirm</Button>
                        <Button type="reset" onClick={handleBack}>Go back</Button>
                    </div>
                </form>
            </Form>
        </div>
    )
}

export default MovementForm