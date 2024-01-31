'use client';
import { useState } from 'react';
import ShowsByDate from './ShowsByDate/ShowsByDate';
import CalendarComp from './Calendar/CalendarComp';
import Link from 'next/link'
import styles from './Shows.module.scss'

interface IShow{
    title: string,
    place: string,
    date: string
}
export interface  IShows{
    shows: IShow[]
}

export default function Shows() {
    const [todayIsOpen, setTodayIsOpen] = useState(true);
    const [weekIsOpen, setWeekIsOpen] = useState(false);
    const [monthIsOpen, setMonthIsOpen] = useState(false);
    const [calendarIsOpen, setCalendarIsOpen] = useState(false);

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
        },
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
        },
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
        },
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
      const todayIsOpenHandler = () => {
        setTodayIsOpen(!todayIsOpen);
        setMonthIsOpen(false);
        setWeekIsOpen(false);
        setCalendarIsOpen(false);
      }
      const weekIsOpenHandler = () => {
        setWeekIsOpen(!weekIsOpen);
        setMonthIsOpen(false);
        setTodayIsOpen(false);
        setCalendarIsOpen(false);
      }
      const monthIsOpenHandler = () => {
        setMonthIsOpen(!monthIsOpen);
        setTodayIsOpen(false);
        setWeekIsOpen(false);
        setCalendarIsOpen(false);
      }
      const calendarIsOpenHandler = () => {
        setCalendarIsOpen(!calendarIsOpen);
        setTodayIsOpen(false);
        setWeekIsOpen(false);
        setMonthIsOpen(false);
      }
  return (
    <section className={styles.section}>
        <h2 className={styles.sectionTitle}>
            Choose by your pleasures
        </h2>
        <span className={styles.subtitle}>Find a concert by your genre, artist or date</span>
        <div className={styles.concertCategories}>
            <Link href={'/live'}>Live concerts</Link>
            <Link href={'/schedule'}>Scheduled concerts</Link>
        </div>
        <div className={styles.dates}>
            <span onClick={todayIsOpenHandler} className={todayIsOpen ? styles.spanActive : ''}>Today</span>
            <span onClick={weekIsOpenHandler} className={weekIsOpen ? styles.spanActive : ''}>This Week</span>
            <span onClick={monthIsOpenHandler} className={monthIsOpen ? styles.spanActive : ''}>This Month</span>
            <span onClick={calendarIsOpenHandler} className={calendarIsOpen ? styles.spanActive : ''}>Choose dates</span>
        </div>
        {
            todayIsOpen && <ShowsByDate shows={shows} />
        }
        {
            weekIsOpen && <ShowsByDate shows={shows} />
        }
        {
            monthIsOpen && <ShowsByDate shows={shows} />
        }
        {
            calendarIsOpen && <CalendarComp />
        }
        <div className={styles.genres}>
            <Link href={'/live'}>Country</Link>
            <Link href={'/live'}>Electronic</Link>
            <Link href={'/live'}>Funk</Link>
            <Link href={'/live'}>Hip hop</Link>
            <Link href={'/live'}>Jazz</Link>
            <Link href={'/live'}>Latin</Link>
            <Link href={'/live'}>Pop</Link>
            <Link href={'/live'}>Punk</Link>
            <Link href={'/live'}>Rock</Link>
            <Link href={'/live'}>Metal</Link>
            <Link href={'/live'}>R&B</Link>
            <Link href={'/live'}>Alternative</Link>
            <Link href={'/live'}>Blues</Link>
            <Link href={'/live'}>Classical</Link>
            <Link href={'/live'}>Indie</Link>
            <Link href={'/live'}>Other</Link>
        </div>
        <div className={styles.artists}>
            <Link href={'/artists'}>All artists</Link>
            <Link href={'/followed'}>Followed artists</Link>
        </div>
    </section>
  )
}
