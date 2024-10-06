import PaginatedItems from '@/app/Components/Shows/Paginate/Paginate'
import { IEvent } from '@/app/types/interfaces';
import styles from './UpcomingShows.module.scss'
import { filterPassedShows } from '@/app/utils/filterPassedShows';

async function getShows(){
    const res = await fetch(`${process.env.BACKEND_URL}/concerts/`);
    const data = await res.json();
    const filteredData = filterPassedShows(data);
    return filteredData;
  }

export default async function UpcomingShows() {
    const shows: IEvent[] = await getShows();
    return (
        <div className={styles.menuWrapper}>
        <h5 className={styles.title}>Upcoming shows</h5>
        <div className={styles.shows}>
            {
                shows && shows.length > 0 ?
                <PaginatedItems itemsPerPage={6} items={shows} />
                :
                <h6 className={styles.error}>Sorry! No upcoming shows yet 🥲</h6>
            }
          </div>
      </div>
  )
}
