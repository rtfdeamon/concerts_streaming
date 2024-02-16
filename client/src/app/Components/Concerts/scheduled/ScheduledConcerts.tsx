import { IEvent } from '@/app/types/interfaces';
import PaginatedItems from '../../Shows/Paginate/Paginate';
import Image from 'next/image';
import CalendarIcon from '../../../../../public/calendar-range.svg'
import styles from './ScheduledConcerts.module.scss'

async function getShows(){
    const res = await fetch('')
    const data = await res.json();
    return data
}

export default async function ScheduledConcerts() {
    let shows: IEvent[] = [];
    getShows()
        .then(res => shows = res)
    return (
    <section>
        <div className={styles.titleWrapper}>
          <Image src={CalendarIcon} width={50} height={50} alt='calendar' />
            <h5 className={styles.title}>Scheduled concerts</h5>
        </div>
        <div className={styles.shows}>
        {
            shows && shows.length > 0 ?
            <PaginatedItems itemsPerPage={6} items={shows} type='scheduledShows'/>
            :
            <h6 className={styles.showsException}>Sorry! No scheduled shows yet 🥲</h6>
        }
        </div>
    </section>
  )
}
