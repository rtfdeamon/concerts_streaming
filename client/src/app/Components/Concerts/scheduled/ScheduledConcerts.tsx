'use client'
import { useState, useEffect } from 'react';
import { IEvent } from '@/app/types/interfaces';
import PaginatedItems from '../../Shows/Paginate/Paginate';
import Loading from '../../Loading/Loading';
import Image from 'next/image';
import CalendarIcon from '../../../../../public/calendar-range.svg'
import styles from './ScheduledConcerts.module.scss'

export default function ScheduledConcerts() {
  const [shows, setShows] = useState<IEvent[]>([]);
  const [isLoaded, setIsLoaded] = useState(true);
  useEffect(() => {
    async function getShows(){
      const res = await fetch(`${process.env.BACKEND_URL}/concerts/?status=scheduled`)
      const data = await res.json();
      setShows(data);
      setIsLoaded(false);
  }
    getShows()
    }, [])
    return (
    <section>
        <div className={styles.titleWrapper}>
          <Image src={CalendarIcon} width={50} height={50} alt='calendar' />
            <h5 className={styles.title}>Scheduled shows</h5>
        </div>
        <div className={styles.shows}>
        {
            shows && shows.length > 0 &&
            <PaginatedItems itemsPerPage={6} items={shows} type='scheduledShows'/>
        }
        {isLoaded && <Loading />}
        {!isLoaded && shows?.length === 0 && 
          <h6 className={styles.showsException}>Sorry! No scheduled shows yet 🥲</h6>
        }
        </div>
    </section>
  )
}
