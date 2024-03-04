'use client';
import { useState } from 'react';
import { useAppDispatch, useAppSelector } from '@/app/hooks/rtkHooks';
import { getShowByFilter } from '@/app/store/shows/showsSlice';
import ShowsByDate from './ShowsByDate/ShowsByDate';
import CalendarComp from './Calendar/CalendarComp';
import Link from 'next/link'
import styles from './Shows.module.scss'

// interface IShow{
//     title: string,
//     place: string,
//     date: string
// }
// export interface  IShows{
//     shows: IShow[]
// }

export default function Shows() {
    const dispatch = useAppDispatch();
    const [todayIsOpen, setTodayIsOpen] = useState(true);
    const [weekIsOpen, setWeekIsOpen] = useState(false);
    const [monthIsOpen, setMonthIsOpen] = useState(false);
    const [calendarIsOpen, setCalendarIsOpen] = useState(false);
    const shows = useAppSelector(state => state.shows.events);
    // const shows = [
    //     {
    //         title: 'Example 1',
    //         place: 'Berlin',
    //         date: 'Feb 05 - 10:00 AM'
    //     },
    //     {
    //         title: 'Example 2',
    //         place: 'Berlin',
    //         date: 'Feb 05 - 10:00 AM'
    //     },
    //     {
    //         title: 'Example 3',
    //         place: 'Berlin',
    //         date: 'Feb 05 - 10:00 AM'
    //     },
    //     {
    //         title: 'Example 4',
    //         place: 'Berlin',
    //         date: 'Feb 05 - 10:00 AM'
    //     },
    //     {
    //         title: 'Example 1',
    //         place: 'Berlin',
    //         date: 'Feb 05 - 10:00 AM'
    //     },
    //     {
    //         title: 'Example 2',
    //         place: 'Berlin',
    //         date: 'Feb 05 - 10:00 AM'
    //     },
    //     {
    //         title: 'Example 3',
    //         place: 'Berlin',
    //         date: 'Feb 05 - 10:00 AM'
    //     },
    //     {
    //         title: 'Example 4',
    //         place: 'Berlin',
    //         date: 'Feb 05 - 10:00 AM'
    //     },
    //     {
    //         title: 'Example 1',
    //         place: 'Berlin',
    //         date: 'Feb 05 - 10:00 AM'
    //     },
    //     {
    //         title: 'Example 2',
    //         place: 'Berlin',
    //         date: 'Feb 05 - 10:00 AM'
    //     },
    //     {
    //         title: 'Example 3',
    //         place: 'Berlin',
    //         date: 'Feb 05 - 10:00 AM'
    //     },
    //     {
    //         title: 'Example 4',
    //         place: 'Berlin',
    //         date: 'Feb 05 - 10:00 AM'
    //     },
    //     {
    //         title: 'Example 1',
    //         place: 'Berlin',
    //         date: 'Feb 05 - 10:00 AM'
    //     },
    //     {
    //         title: 'Example 2',
    //         place: 'Berlin',
    //         date: 'Feb 05 - 10:00 AM'
    //     },
    //     {
    //         title: 'Example 3',
    //         place: 'Berlin',
    //         date: 'Feb 05 - 10:00 AM'
    //     },
    //     {
    //         title: 'Example 4',
    //         place: 'Berlin',
    //         date: 'Feb 05 - 10:00 AM'
    //     }
    //   ]

    const todayIsOpenHandler = () => {
        setTodayIsOpen(!todayIsOpen);
        setMonthIsOpen(false);
        setWeekIsOpen(false);
        setCalendarIsOpen(false);
        let today: number | Date = new Date().setHours(0);
        let tomorrow: number | Date  = today + 84910000
        today = new Date(today)
        tomorrow = new Date(tomorrow)
        console.log(today.toUTCString(), tomorrow.toUTCString());
        
        dispatch(getShowByFilter({to: tomorrow.toISOString(), from: today.toISOString()}))
    }
    const weekIsOpenHandler = () => {
        setWeekIsOpen(!weekIsOpen);
        setMonthIsOpen(false);
        setTodayIsOpen(false);
        setCalendarIsOpen(false);
        const today = new Date();
        const lastWeek = new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000);
        dispatch(getShowByFilter({to: today.toISOString(), from: lastWeek.toISOString()}));
    }
    const monthIsOpenHandler = () => {
        setMonthIsOpen(!monthIsOpen);
        setTodayIsOpen(false);
        setWeekIsOpen(false);
        setCalendarIsOpen(false);
        const today = new Date().toISOString();
        const lastDayOfPrevMonth = new Date(new Date().setDate(0)).toISOString();
        dispatch(getShowByFilter({to: today, from: lastDayOfPrevMonth}));
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
            <Link href={'/liveconcerts'}>Live concerts</Link>
            <Link href={'/scheduled'}>Scheduled concerts</Link>
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
            <Link href={'/genre/country'}>Country</Link>
            <Link href={'/genre/electronic'}>Electronic</Link>
            <Link href={'/genre/funk'}>Funk</Link>
            <Link href={'/genre/hiphop'}>Hip hop</Link>
            <Link href={'/genre/jazz'}>Jazz</Link>
            <Link href={'/genre/latin'}>Latin</Link>
            <Link href={'/genre/pop'}>Pop</Link>
            <Link href={'/genre/punk'}>Punk</Link>
            <Link href={'/genre/rock'}>Rock</Link>
            <Link href={'/genre/metal'}>Metal</Link>
            <Link href={'/genre/r&b'}>R&B</Link>
            <Link href={'/genre/alternative'}>Alternative</Link>
            <Link href={'/genre/blues'}>Blues</Link>
            <Link href={'/genre/classical'}>Classical</Link>
            <Link href={'/genre/indie'}>Indie</Link>
            <Link href={'/genre/all'}>All</Link>
        </div>
        <div className={styles.artists}>
            <Link href={'/artists/all'}>All artists</Link>
            <Link href={'/artists/followed'}>Followed artists</Link>
        </div>
    </section>
  )
}
