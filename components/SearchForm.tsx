'use client'

import {Input} from "@/components/ui/input";
import {SearchIcon} from "lucide-react";
import {useState} from "react";
import {FilterOptions, formatDateWithLocale} from "@/lib/utils";
import {DatePickerWithRange} from "@/components/DatePickerWithRange";
import * as React from "react";
import type {DateRange} from "react-day-picker";
import {Button} from "@/components/ui/button";

const SearchForm = ({setFilterOptions}: {setFilterOptions: (value: FilterOptions | ((prevVar: FilterOptions) => FilterOptions)) => void}) => {
    const [searchText, setSearchText] = useState("");


    const filterByOrigin = async (value: string) => {
        setFilterOptions((prevVar) => {
            return {...prevVar, origin: value}
        })
    }

    const filterByRangeDate = async (dates: DateRange ) => {
        if(dates) setFilterOptions((prevValue): FilterOptions => {
            return {...prevValue, dateFrom: formatDateWithLocale(dates.from), dateTo: formatDateWithLocale(dates.to)}
        })
    }

   return (
       <div className="flex flex-row justify-around my-6 ">
           <div className="flex flex-row mx-2 justify-center align-items-center">
                <Input type="text" placeholder="Search..." onChange={
                    (e) => setSearchText(e.target.value)
                }/>
                <SearchIcon className="mx-2 cursor-pointer" onClick={() => filterByOrigin(searchText)} />
           </div>
           <DatePickerWithRange action={filterByRangeDate}/>
           <Button onClick={() => setFilterOptions({})}>Clear Filters</Button>
        </div>
   )
}

export default SearchForm;