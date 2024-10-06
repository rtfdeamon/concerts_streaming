'use client'
import {useEffect} from 'react'
import { useAppDispatch, useAppSelector } from '@/app/hooks/rtkHooks';
import { getShowByFilter } from '@/app/store/shows/showsSlice';
import ShowsByDate from '../Shows/ShowsByDate/ShowsByDate';
import styles from './view-shows.module.scss'
import { CSTTimeZoneOptions } from '@/app/utils/constants';

export default function ViewShows({title, type}:{title: string, type: string}) {
    const dispatch = useAppDispatch();
    const shows = useAppSelector(state => state.shows.events).filter(show => new Date(show.date) > new Date(Date.now()))

    useEffect(() => {
      type == 'week' && weekHandler()
      type == 'today' && todayHandler()
      type == 'month' && monthHandler()
    }, [type])

    const weekHandler = () => {
      let today: number | Date | string = new Date().setHours(0, 0, 0, 0);
      let lastDayOfWeek: number | Date | string  = today + 7 * 24 * 60 * 60 * 1000;
      today = new Date(today)
      lastDayOfWeek = new Date(lastDayOfWeek)

      today = 
      new Date(
        today
        .toLocaleString('en-US', CSTTimeZoneOptions)
        .split('T')[0]
      )
      .toISOString()
      .split('T')[0]

      lastDayOfWeek = 
      new Date(
        lastDayOfWeek
        .toLocaleString('en-US', CSTTimeZoneOptions)
        .split('T')[0]
      )
      .toISOString()
      .split('T')[0]

      dispatch(getShowByFilter({to: lastDayOfWeek, from: today}));
  }
  const monthHandler = () => {
      let today: number | Date | string = new Date()
      // let lastDayOfPrevMonth: number | Date | string  = today + 8 * 24 * 60 * 60 * 1000 * 4;
      var firstDay = 
      new Date(
      new Date(today.getFullYear(), today.getMonth(), 1)
      .toLocaleString('en-US', CSTTimeZoneOptions)
      .split(',')[0])
      .toISOString().split('T')[0];

      var lastDay = 
      new Date(
      new Date(today.getFullYear(), today.getMonth() + 1, 0)
      .toLocaleString('en-US', CSTTimeZoneOptions)
      .split(',')[0])
      .toISOString().split('T')[0]
      dispatch(getShowByFilter({to: lastDay, from: firstDay}))};

    const todayHandler = () => {
      let today: number | Date | string = new Date().setHours(0, 0, 0, 0);
      let tomorrow: number | Date | string  = today + 86399000
      today = new Date(today)
      tomorrow = new Date(tomorrow)
      // today.toISOString().split('T')[0]
      // tomorrow.split('T')[0]
      
      today = 
        new Date(
          today
          .toLocaleString('en-US', CSTTimeZoneOptions)
          .split('T')[0]
        )
        .toISOString()
        .split('T')[0]
      tomorrow = 
        new Date(
          tomorrow
          .toLocaleString('en-US', CSTTimeZoneOptions)
          .split('T')[0]
        )
        .toISOString()
        .split('T')[0]
      dispatch(getShowByFilter({to: tomorrow, from: today}))
  }
  return (
        <>
            <h5 className={styles.title}>{title}</h5>
            <ShowsByDate shows={shows} />
        </>
  )
}
