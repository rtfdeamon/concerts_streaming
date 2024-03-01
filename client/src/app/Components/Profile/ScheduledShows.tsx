'use client'
import { useState, useEffect } from 'react';
import { IEvent } from '@/app/types/interfaces';
import ScheduledPaginate from './ScheduledPaginate';
import Image from 'next/image';
import CalendarIcon from '../../../../public/calendar-range.svg'
import styles from './ScheduledShows.module.scss'

async function getShows(){
    const res = await fetch(`${process.env.BACKEND_URL}/concerts/?status=scheduled/`)
    const data = await res.json();
    return data
}

export default async function ScheduledConcerts() {
  const [shows, setShows] = useState<IEvent[]>([]);
  useEffect(() => {
    getShows()
      .then(res => setShows(res))
    }, [])
    return (
    <section className={styles.sectionWrapper}>
        <div className={styles.titleWrapper}>
          <Image src={CalendarIcon} width={50} height={50} alt='calendar' />
            <h5 className={styles.title}>Scheduled shows</h5>
        </div>
        <div className={styles.shows}>
        {
            shows && shows.length > 0 ?
            <ScheduledPaginate itemsPerPage={6} items={shows}/>
            :
            <h6 className={styles.showsException}>Sorry! No scheduled shows yet 🥲</h6>
        }
        </div>
    </section>
  )
}
