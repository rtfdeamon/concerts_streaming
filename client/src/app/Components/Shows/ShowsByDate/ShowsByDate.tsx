import { IEvent } from '@/app/types/interfaces'
import PaginatedItems from '../Paginate/Paginate'
import styles from './ShowsByDate.module.scss'

export default function ShowsByDate({shows}:{shows: IEvent[]}) {
  return (
    <div className={styles.shows}>
        {shows.length >0 ?
          <PaginatedItems itemsPerPage={4} items={shows} />
          :
          <div className={styles.showsException}>
            Sorry! No shows yet 🥲
          </div>
        }
    </div>
  )
}
