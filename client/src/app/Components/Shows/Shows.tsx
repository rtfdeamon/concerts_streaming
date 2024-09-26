'use client';
import { useState, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '@/app/hooks/rtkHooks';
import { getShowByFilter } from '@/app/store/shows/showsSlice';
import ShowsByDate from './ShowsByDate/ShowsByDate';
import CalendarComp from './Calendar/CalendarComp';
import Link from 'next/link'
import styles from './Shows.module.scss'
import { CSTTimeZoneOptions } from '@/app/utils/constants';



export default function Shows() {
    const dispatch = useAppDispatch();
    // const [todayIsOpen, setTodayIsOpen] = useState(true);
    // const [weekIsOpen, setWeekIsOpen] = useState(false);
    // const [monthIsOpen, setMonthIsOpen] = useState(false);
    // const [calendarIsOpen, setCalendarIsOpen] = useState(false);
    // const shows = useAppSelector(state => state.shows.events);
    // const todayIsOpenHandler = () => {
    //     setTodayIsOpen(!todayIsOpen);
    //     setMonthIsOpen(false);
    //     setWeekIsOpen(false);
    //     setCalendarIsOpen(false);
    //     let today: number | Date | string = new Date().setHours(0, 0, 0, 0);
    //     let tomorrow: number | Date | string  = today + 86399000
    //     today = new Date(today)
    //     tomorrow = new Date(tomorrow)
    //     // today.toISOString().split('T')[0]
    //     // tomorrow.split('T')[0]
        
    //     today = today.toISOString().split('T')[0]
    //     tomorrow = tomorrow.toISOString().split('T')[0]
    //     console.log(today, tomorrow);
    //     dispatch(getShowByFilter({to: tomorrow, from: today}))
    // }
    // const weekIsOpenHandler = () => {
    //     setWeekIsOpen(!weekIsOpen);
    //     setMonthIsOpen(false);
    //     setTodayIsOpen(false);
    //     setCalendarIsOpen(false);
    //     let today: number | Date | string = new Date().setHours(0, 0, 0, 0);
    //     let lastDayOfWeek: number | Date | string  = today + 7 * 24 * 60 * 60 * 1000;
    //     today = new Date(today)
    //     lastDayOfWeek = new Date(lastDayOfWeek)
    //     today = today.toISOString().split('T')[0];
    //     lastDayOfWeek = lastDayOfWeek.toISOString().split('T')[0];
    //     dispatch(getShowByFilter({to: lastDayOfWeek, from: today}));
    // }
    // const monthIsOpenHandler = () => {
    //     setMonthIsOpen(!monthIsOpen);
    //     setTodayIsOpen(false);
    //     setWeekIsOpen(false);
    //     setCalendarIsOpen(false);
    //     let today: number | Date | string = new Date().setHours(0, 0, 0, 0);
    //     let lastDayOfPrevMonth: number | Date | string  = today + 8 * 24 * 60 * 60 * 1000 * 4;
    //     today = new Date(today)
    //     lastDayOfPrevMonth = new Date(lastDayOfPrevMonth )
    //     today = today.toISOString().split('T')[0];
    //     lastDayOfPrevMonth = lastDayOfPrevMonth.toISOString().split('T')[0];
    //     dispatch(getShowByFilter({to: lastDayOfPrevMonth, from: today}))};
    // const calendarIsOpenHandler = () => {
    //     setCalendarIsOpen(!calendarIsOpen);
    //     setTodayIsOpen(false);
    //     setWeekIsOpen(false);
    //     setMonthIsOpen(false);
    // }
    useEffect(() => {
        let today: number | Date = new Date().setUTCHours(0, 0, 0, 0);
        let tomorrow: number | Date  = today + 86399000
        today = new Date(today)
        tomorrow = new Date(tomorrow)
        dispatch(getShowByFilter({to: tomorrow.toLocaleString('en-US', CSTTimeZoneOptions), from: today.toLocaleString('en-US', CSTTimeZoneOptions)}))
    }, [])

  return (
    <section className={styles.section}>
        <h2 className={styles.sectionTitle}>
            What's your passion?
        </h2>
        <span className={styles.subtitle}>Find a show by your genre, artist or date</span>
        <div className={styles.concertCategories}>
            <Link href={'/liveconcerts'}>Live concerts</Link>
            <Link href={'/scheduled'}>Scheduled concerts</Link>
        </div>
        <div className={styles.dates}>
            {/* <span onClick={todayIsOpenHandler} className={todayIsOpen ? styles.spanActive : ''}>Today</span>
            <span onClick={weekIsOpenHandler} className={weekIsOpen ? styles.spanActive : ''}>This Week</span>
            <span onClick={monthIsOpenHandler} className={monthIsOpen ? styles.spanActive : ''}>This Month</span> */}
            <Link href={'/today'}>Today</Link>
            <Link href={'/week'}>This Week</Link>
            <Link href={'/month'}>This Month</Link>
            {/* <span onClick={calendarIsOpenHandler} className={calendarIsOpen ? styles.spanActive : ''}>Choose dates</span> */}
        </div>
        {/* {
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
        } */}
        <div className={styles.genres}>
            <Link href={'/category/actors'}>Actors</Link>
            <Link href={'/category/all'}>All</Link>
            <Link href={'/category/authors-and-writers'}>Authors & Writers</Link>
            <Link href={'/category/comedy'}>Comedy</Link>
            <Link href={'/category/cosmetology'}>Cosmetology</Link>
            <Link href={'/category/culinary'}>Culinary</Link>
            <Link href={'/category/dance'}>Dance</Link>
            <Link href={'/category/fashion'}>Fashion</Link>
            <Link href={'/category/painter'}>Painter</Link>
            <Link href={'/category/photography-and-videography'}>Photography & Videography</Link>
            <Link href={'/category/bloggers-and-podcasters'}>Bloggers & Podcasters</Link>
            <Link href={'/category/producer'}>Producer</Link>
        </div>
        <div className={styles.artists}>
            <Link href={'/artists/all'}>All artists</Link>
            <Link href={'/artists/followed'}>Followed artists</Link>
        </div>
    </section>
  )
}
