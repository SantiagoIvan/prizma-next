import {FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form";
import {Input} from "@/components/ui/input";
import {useFormContext} from "react-hook-form";

type Props = {
    description?: string,
    titleName: string,
    fieldName: string,
    readOnly?: boolean,
    placeholder?: string,
    type: "text" | "email" | "password" | "tel" | "url" | "number",
}


const InputWithLabel = ({
                            fieldName,
                            titleName,
                            description,
                            type,
                            ...props
                        }: Props) => {

    const form = useFormContext()

    return (
        <FormField
            control={form.control}
            name={fieldName}
            render={({field}) => (
                <FormItem>
                    <FormLabel>{titleName}</FormLabel>
                    <FormControl>
                        <Input type={type}
                               {...field} //esto me autocompleta el form con los valores del registro seleccionado
                               {...props}
                        />
                    </FormControl>
                    {description && <FormDescription>
                        {description}
                    </FormDescription>}
                    <FormMessage/>
                </FormItem>
            )}
        />
    )
}

export default InputWithLabel