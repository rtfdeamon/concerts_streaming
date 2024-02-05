import ShowsByDate from '../Shows/ShowsByDate/ShowsByDate'
import PaginatedItems from '../Shows/Paginate/Paginate'
import styles from './FollowedShows.module.scss'


const shows = [
  {
      title: 'Example 1',
      place: 'Berlin',
      date: 'Feb 05 - 10:00 AM'
  },
  {
      title: 'Example 2',
      place: 'Berlin',
      date: 'Feb 05 - 10:00 AM'
  },
  {
      title: 'Example 3',
      place: 'Berlin',
      date: 'Feb 05 - 10:00 AM'
  },
  {
      title: 'Example 4',
      place: 'Berlin',
      date: 'Feb 05 - 10:00 AM'
  },
  {
      title: 'Example 1',
      place: 'Berlin',
      date: 'Feb 05 - 10:00 AM'
  },
  {
      title: 'Example 2',
      place: 'Berlin',
      date: 'Feb 05 - 10:00 AM'
  },
  {
      title: 'Example 3',
      place: 'Berlin',
      date: 'Feb 05 - 10:00 AM'
  },
  {
      title: 'Example 4',
      place: 'Berlin',
      date: 'Feb 05 - 10:00 AM'
  },
  {
      title: 'Example 1',
      place: 'Berlin',
      date: 'Feb 05 - 10:00 AM'
  },
  {
      title: 'Example 2',
      place: 'Berlin',
      date: 'Feb 05 - 10:00 AM'
  },
  {
      title: 'Example 3',
      place: 'Berlin',
      date: 'Feb 05 - 10:00 AM'
  },
  {
      title: 'Example 4',
      place: 'Berlin',
      date: 'Feb 05 - 10:00 AM'
  },
  {
      title: 'Example 1',
      place: 'Berlin',
      date: 'Feb 05 - 10:00 AM'
  },
  {
      title: 'Example 2',
      place: 'Berlin',
      date: 'Feb 05 - 10:00 AM'
  },
  {
      title: 'Example 3',
      place: 'Berlin',
      date: 'Feb 05 - 10:00 AM'
  },
  {
      title: 'Example 4',
      place: 'Berlin',
      date: 'Feb 05 - 10:00 AM'
  }
]

export default function FollowedShows() {

  return (
    <div className={styles.menuWrapper}>
      <h5 className={styles.title}>Followed shows</h5>
      <div className={styles.shows}>
        {
            shows.length > 0 ?
            <PaginatedItems itemsPerPage={6} items={{shows}} type='followeShows'/>
            :
            <h6 className={styles.error}>Sorry! No followed shows yet 🥲</h6>
        }
      </div>
    </div>
  )
}
