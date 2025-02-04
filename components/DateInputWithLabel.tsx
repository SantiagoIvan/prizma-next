import {FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form";
import {Movement} from "@/schemas/MovementSchema";
import {useFormContext} from "react-hook-form";
import {Popover, PopoverContent, PopoverTrigger} from "@radix-ui/react-popover";
import {Button} from "@/components/ui/button";
import {CalendarIcon} from "lucide-react";
import {Calendar} from "@/components/ui/calendar";
import * as React from "react";
import {cn} from "@/lib/utils";
import {formatDateWithLocale} from "@/lib/utils";


type MovementKeys = keyof Movement
type Props = {
    titleName: string,
    fieldName: MovementKeys,
    readOnly?: boolean,
}


const DateInputWithLabel = ({
                            fieldName,
                            titleName,
                        }: Props) => {

    const form = useFormContext()

    return (
        <FormField
            control={form.control}
            name={fieldName}
            render={({field}) => {
                return (
                    <FormField
                        control={form.control}
                        name="date"
                        render={({ field }) => (
                            <FormItem className="flex flex-col">
                                <FormLabel>{titleName}</FormLabel>
                                <Popover>
                                    <PopoverTrigger asChild>
                                        <FormControl>
                                            <Button
                                                variant={"outline"}
                                                className={cn(
                                                    "w-[240px] pl-3 text-left font-normal",
                                                    !field.value && "text-muted-foreground"
                                                )}
                                            >
                                                {field.value ? (
                                                    field.value
                                                ) : (
                                                    <span>Pick a date</span>
                                                )}
                                                <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                            </Button>
                                        </FormControl>
                                    </PopoverTrigger>
                                    <PopoverContent className="w-auto p-0 bg-white " align="start">
                                        <Calendar
                                            mode="single"
                                            selected={field.value}
                                            onSelect={(date) => {
                                                return field.onChange(formatDateWithLocale(date));
                                            }}
                                            initialFocus
                                        />
                                    </PopoverContent>
                                </Popover>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                )}}
        />
    )
}

export default DateInputWithLabel