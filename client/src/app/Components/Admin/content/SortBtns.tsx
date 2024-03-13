'use client'
import { useState } from "react"
import { useAppDispatch } from "@/app/hooks/rtkHooks";
import { eventsSort } from "@/app/store/shows/showsSlice";
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
  } from "@/shadComponents/ui/select"

export default function SortBtns() {
    const dispatch = useAppDispatch();
    const [selectedTitleSort, setSelectedTitleSort] = useState('');
    const [selectedDateSort, setSelectedDateSort] = useState('');
    const titleSortHandler = (e: string) => {
        setSelectedTitleSort(e);
        setSelectedDateSort('');
        dispatch(eventsSort({sort: e}));
    }
    const dateSortHandler = (e: string) => {
        setSelectedDateSort(e);
        setSelectedTitleSort('');
        dispatch(eventsSort({sort: e}));
    }
    return (
    <>
        <Select
            onValueChange={(e) => titleSortHandler(e)}
            value={selectedTitleSort}>
            <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Title" />
            </SelectTrigger>
            <SelectContent>
                <SelectGroup>
                <SelectLabel>Title</SelectLabel>
                <SelectItem value="name">Ascending</SelectItem>
                <SelectItem value="-name">Descending</SelectItem>
                </SelectGroup>
            </SelectContent>
        </Select>
        <Select
            onValueChange={(e) => dateSortHandler(e)}
            value={selectedDateSort}>
            <SelectTrigger className="w-[180px] ml-10">
                <SelectValue placeholder="Date" />
            </SelectTrigger>
            <SelectContent>
                <SelectGroup>
                <SelectLabel>Date</SelectLabel>
                <SelectItem value="date">Ascending</SelectItem>
                <SelectItem value="-date">Descending</SelectItem>
                </SelectGroup>
            </SelectContent>
        </Select>
    </>
  )
}
