"use client";

import * as React from "react";
import { Popover, PopoverContent, PopoverTrigger } from "@radix-ui/react-popover";
import { CalendarIcon } from "lucide-react";
import { Calendar } from '@/components/ui/calendar'; // Cambia según el componente de calendario que uses
import { Button } from "./ui/button";
import {format} from "date-fns";

export default function DatePicker({ selectedDate, setSelectedDate}: {selectedDate: Date | undefined, setSelectedDate: (date: Date | undefined) => void}) {

    return (
        <div className="flex items-center space-x-2">
            <Popover>
                <PopoverTrigger asChild>
                    <Button variant="outline" className="w-44 justify-start">
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {selectedDate
                            ? format(selectedDate, 'yyyy-MM-dd')
                            : "Seleccione Fecha"}
                    </Button>
                </PopoverTrigger>
                <PopoverContent align="start" className="p-0 bg-white rounded-lg shadow-lg">
                    <Calendar
                        mode="single"
                        selected={selectedDate}
                        onSelect={() => {
                            setSelectedDate(selectedDate)
                        }}
                        initialFocus
                    />
                </PopoverContent>
            </Popover>
        </div>
    );
}