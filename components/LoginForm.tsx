'use client'

import InputWithLabel from "@/components/InputWithLabel";
import {Button} from "@/components/ui/button";
import {Form} from "@/components/ui/form";
import * as React from "react";
import {useForm} from "react-hook-form";
import {useRouter} from "next/navigation";
import {zodResolver} from "@hookform/resolvers/zod";
import {INITIAL_EXPENSE_VALUE} from "@/lib/utils";

const LoginForm = () => {
    const form = useForm<any>({
        mode: 'onBlur',//La validacion se activa al perder el foco del input
        //resolver: zodResolver(MovementSchema),
        defaultValues: {username: '', password: ''},
    })
    const router = useRouter()

    const login = async () => {
        console.log("Login in...")
    }

    return (
        <div className="flex flex-col items-center">
            <Form {...form} >
                <form onSubmit={form.handleSubmit(login)} className="space-y-8">
                    <InputWithLabel type="text" titleName="Username" fieldName="username" placeholder="John" />
                    <InputWithLabel type="password" titleName="Password" fieldName="password" placeholder="Salchichon" />
                    <div className="flex justify-around">
                        <Button type="submit">Login with credentialls</Button>
                        <Button type="submit">Login with GitHub</Button>
                        <Button type="reset" onClick={() => router.back()}>Regresar</Button>
                    </div>
                </form>
            </Form>
        </div>
    )
}

export default LoginForm