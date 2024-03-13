import PaginatedItems from '../../Shows/Paginate/Paginate'
import { IEvent } from '@/app/types/interfaces'
import styles from './ScheduledEvents.module.scss'

async function getShows(){
  const res = await fetch(`${process.env.BACKEND_URL}/concerts/`);
  const data = await res.json();
  return data;
}

export default async function ScheduledEvents() {
  const shows: IEvent[] = await getShows();
  return (
    <div className={styles.wrapper}>
      <h5 className={styles.title}>Scheduled events</h5>
      <div className={styles.content} >
        <div className={styles.items}>
        {
            shows.length > 0 ?
            <PaginatedItems itemsPerPage={6} items={shows} type='followedShows'/>
            :
            <h6 className={styles.error}>Sorry! No scheduled shows yet 🥲</h6>
        }
        </div>
      </div>
    </div>
  )
}
