
'use client'
import React, { useState } from "react"
import { useAppDispatch, useAppSelector } from "@/app/hooks/rtkHooks"
import { getShowByFilter } from "@/app/store/shows/showsSlice"
import { Calendar } from "@/shadComponents/ui/calendar"
import ShowsByDate from "../ShowsByDate/ShowsByDate"
import styles from './Calendar.module.scss'

export default function CalendarComp() {
  const dispatch = useAppDispatch();
  const shows = useAppSelector(state => state.shows.events);
  const [date, setDate] = React.useState<Date | undefined>(new Date())
  const onSelectHandler = (e: Date | undefined) => {
    setDate(e)
    let today: Date | number = Date.parse(String(e))
    let tomorrow: Date | number = Date.parse(String(e)) + 86399000
    tomorrow =  new Date(tomorrow);
    today =  new Date(today);
    if (date) dispatch(getShowByFilter({to: tomorrow.toISOString(), from: today.toISOString()}))
  }

  return (
    <>
        <Calendar
          mode="single"
          selected={date}
          onSelect={(e) => onSelectHandler(e)}
          className={styles.Calendar}
        />
          <ShowsByDate shows={shows} />
    </>
  )
}
