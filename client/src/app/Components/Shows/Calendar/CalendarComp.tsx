
'use client'
import React, { useState } from "react"
import { Calendar } from "@/shadComponents/ui/calendar"
import ShowsByDate from "../ShowsByDate/ShowsByDate"
import styles from './Calendar.module.scss'

export default function CalendarComp() {
  const [date, setDate] = React.useState<Date | undefined>(new Date())
  const shows = [
    {
        title: 'Example 1',
        place: 'Berlin',
        date: 'Feb 05 - 10:00 AM'
    },
    {
        title: 'Example 2',
        place: 'Berlin',
        date: 'Feb 05 - 10:00 AM'
    },
    {
        title: 'Example 3',
        place: 'Berlin',
        date: 'Feb 05 - 10:00 AM'
    },
    {
        title: 'Example 4',
        place: 'Berlin',
        date: 'Feb 05 - 10:00 AM'
    }
  ]
  return (
    <>
        <Calendar
          mode="single"
          selected={date}
          onSelect={setDate}
          className={styles.Calendar}
        />
        {shows.length > 0 ? 
          <ShowsByDate shows={shows} />
          : <h5>Sorry! No upcoming shows!</h5> 
        }
    </>
  )
}
