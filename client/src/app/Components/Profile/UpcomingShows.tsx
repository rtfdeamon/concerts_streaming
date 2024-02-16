import PaginatedItems from '../Shows/Paginate/Paginate'
import { IEvent } from '@/app/types/interfaces';
import styles from './UpcomingShows.module.scss'

async function getShows(){
    const res = await fetch('');
    const data = await res.json();
    return data;
  }

export default async function UpcomingShows() {
    let shows: IEvent[] = [];
    getShows()
      .then(res => shows = res)
return (
    <div className={styles.menuWrapper}>
    <h5 className={styles.title}>Upcoming shows</h5>
    <div className={styles.shows}>
        {
            shows && shows.length > 0 ?
            <PaginatedItems itemsPerPage={6} items={shows} type='followedShows'/>
            :
            <h6 className={styles.error}>Sorry! No upcoming shows yet 🥲</h6>
        }
      </div>
  </div>
  )
}
