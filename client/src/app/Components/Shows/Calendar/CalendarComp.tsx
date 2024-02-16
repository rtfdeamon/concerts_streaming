
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
    const yesterday = new Date(Date.now()-86400000)
    if (date) dispatch(getShowByFilter({to: date.toISOString(), from: yesterday.toISOString()}))
  }
  // const shows = [
  //   {
  //       title: 'Example 1',
  //       place: 'Berlin',
  //       date: 'Feb 05 - 10:00 AM'
  //   },
  //   {
  //       title: 'Example 2',
  //       place: 'Berlin',
  //       date: 'Feb 05 - 10:00 AM'
  //   },
  //   {
  //       title: 'Example 3',
  //       place: 'Berlin',
  //       date: 'Feb 05 - 10:00 AM'
  //   },
  //   {
  //       title: 'Example 4',
  //       place: 'Berlin',
  //       date: 'Feb 05 - 10:00 AM'
  //   }
  // ]
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
