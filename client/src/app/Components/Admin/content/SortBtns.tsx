'use client'
import { useState } from "react"
import ArrowUp from '../../../../../public/arrow-up.svg'
import ArrowDown from '../../../../../public/arrow-down.svg'
import { Button } from "@/shadComponents/ui/button"
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
  } from "@/shadComponents/ui/select"
import styles from './CreateEvent.module.scss'

export default function SortBtns() {
    return (
    <>
        <Select>
            <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Title" />
            </SelectTrigger>
            <SelectContent>
                <SelectGroup>
                <SelectLabel>Title</SelectLabel>
                <SelectItem value="asc">Ascending</SelectItem>
                <SelectItem value="desc">Descending</SelectItem>
                </SelectGroup>
            </SelectContent>
        </Select>
        <Select>
            <SelectTrigger className="w-[180px] ml-10">
                <SelectValue placeholder="Date" />
            </SelectTrigger>
            <SelectContent>
                <SelectGroup>
                <SelectLabel>Date</SelectLabel>
                <SelectItem value="asc">Ascending</SelectItem>
                <SelectItem value="desc">Descending</SelectItem>
                </SelectGroup>
            </SelectContent>
        </Select>
    </>
  )
}
