import { IEvent } from '@/app/types/interfaces'
import PaginatedItems from '../Paginate/Paginate'
import styles from './ShowsByDate.module.scss'
import { filterPassedShows } from '@/app/utils/filterPassedShows'

export default function ShowsByDate({shows}:{shows: IEvent[]}) {
  const filteredShows = filterPassedShows(shows)
  return (
    <div className={styles.shows}>
        {shows.length >0 ?
          <PaginatedItems itemsPerPage={8} items={filteredShows} />
          :
          <div className={styles.showsException}>
            Sorry! No shows yet 🥲
          </div>
        }
    </div>
  )
}
