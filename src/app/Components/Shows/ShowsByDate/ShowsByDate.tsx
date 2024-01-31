import { IShows } from '../Shows'
import PaginatedItems from '../Paginate/Paginate'
import styles from './ShowsByDate.module.scss'

export default function ShowsByDate(shows:IShows) {
  return (
    <div className={styles.shows}>
        <PaginatedItems itemsPerPage={4} items={shows} />
    </div>
  )
}
