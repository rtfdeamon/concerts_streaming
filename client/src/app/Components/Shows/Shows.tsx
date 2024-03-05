'use client';
import { useState, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '@/app/hooks/rtkHooks';
import { getShowByFilter } from '@/app/store/shows/showsSlice';
import ShowsByDate from './ShowsByDate/ShowsByDate';
import CalendarComp from './Calendar/CalendarComp';
import Link from 'next/link'
import styles from './Shows.module.scss'

export default function Shows() {
    const dispatch = useAppDispatch();
    const [todayIsOpen, setTodayIsOpen] = useState(true);
    const [weekIsOpen, setWeekIsOpen] = useState(false);
    const [monthIsOpen, setMonthIsOpen] = useState(false);
    const [calendarIsOpen, setCalendarIsOpen] = useState(false);
    const shows = useAppSelector(state => state.shows.events);

    const todayIsOpenHandler = () => {
        setTodayIsOpen(!todayIsOpen);
        setMonthIsOpen(false);
        setWeekIsOpen(false);
        setCalendarIsOpen(false);
        let today: number | Date = new Date().setHours(0, 0, 0, 0);
        let tomorrow: number | Date  = today + 86399000
        today = new Date(today)
        tomorrow = new Date(tomorrow)
        console.log(today, tomorrow)
        dispatch(getShowByFilter({to: tomorrow.toISOString(), from: today.toISOString()}))
    }
    const weekIsOpenHandler = () => {
        setWeekIsOpen(!weekIsOpen);
        setMonthIsOpen(false);
        setTodayIsOpen(false);
        setCalendarIsOpen(false);
        let today: number | Date = new Date().setHours(0, 0, 0, 0);
        let lastDayOfWeek: number | Date  = today + 7 * 24 * 60 * 60 * 1000;
        today = new Date(today)
        lastDayOfWeek = new Date(lastDayOfWeek)
        console.log(today, lastDayOfWeek)
        dispatch(getShowByFilter({to: lastDayOfWeek.toISOString(), from: today.toISOString()}));
    }
    const monthIsOpenHandler = () => {
        setMonthIsOpen(!monthIsOpen);
        setTodayIsOpen(false);
        setWeekIsOpen(false);
        setCalendarIsOpen(false);
        let today: number | Date = new Date().setHours(0, 0, 0, 0);
        let lastDayOfPrevMonth: number | Date  = today + 8 * 24 * 60 * 60 * 1000 * 4;
        today = new Date(today)
        lastDayOfPrevMonth = new Date(lastDayOfPrevMonth)
        console.log(today, lastDayOfPrevMonth)
        dispatch(getShowByFilter({to: lastDayOfPrevMonth.toISOString(), from: today.toISOString()}));    }
    const calendarIsOpenHandler = () => {
        setCalendarIsOpen(!calendarIsOpen);
        setTodayIsOpen(false);
        setWeekIsOpen(false);
        setMonthIsOpen(false);
    }
    useEffect(() => {
        let today: number | Date = new Date().setUTCHours(0, 0, 0, 0);
        let tomorrow: number | Date  = today + 86399000
        today = new Date(today)
        tomorrow = new Date(tomorrow)
        dispatch(getShowByFilter({to: tomorrow.toISOString(), from: today.toISOString()}))
    }, [])

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
