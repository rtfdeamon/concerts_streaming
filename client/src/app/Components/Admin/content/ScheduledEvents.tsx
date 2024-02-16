import PaginatedItems from '../../Shows/Paginate/Paginate'
import { IEvent } from '@/app/types/interfaces'
import styles from './ScheduledEvents.module.scss'

async function getShows(){
  const res = await fetch('')
  const data = await res.json()
  return data;
}

export default async function ScheduledEvents() {
//   const shows = [
//     {
//         title: 'Example 1',
//         place: 'Berlin',
//         date: 'Feb 05 - 10:00 AM'
//     },
//     {
//         title: 'Example 2',
//         place: 'Berlin',
//         date: 'Feb 05 - 10:00 AM'
//     },
//     {
//         title: 'Example 3',
//         place: 'Berlin',
//         date: 'Feb 05 - 10:00 AM'
//     },
//     {
//         title: 'Example 4',
//         place: 'Berlin',
//         date: 'Feb 05 - 10:00 AM'
//     },
//     {
//         title: 'Example 1',
//         place: 'Berlin',
//         date: 'Feb 05 - 10:00 AM'
//     },
//     {
//         title: 'Example 2',
//         place: 'Berlin',
//         date: 'Feb 05 - 10:00 AM'
//     },
//     {
//         title: 'Example 3',
//         place: 'Berlin',
//         date: 'Feb 05 - 10:00 AM'
//     },
//     {
//         title: 'Example 4',
//         place: 'Berlin',
//         date: 'Feb 05 - 10:00 AM'
//     },
//     {
//         title: 'Example 1',
//         place: 'Berlin',
//         date: 'Feb 05 - 10:00 AM'
//     },
//     {
//         title: 'Example 2',
//         place: 'Berlin',
//         date: 'Feb 05 - 10:00 AM'
//     },
//     {
//         title: 'Example 3',
//         place: 'Berlin',
//         date: 'Feb 05 - 10:00 AM'
//     },
//     {
//         title: 'Example 4',
//         place: 'Berlin',
//         date: 'Feb 05 - 10:00 AM'
//     },
//     {
//         title: 'Example 1',
//         place: 'Berlin',
//         date: 'Feb 05 - 10:00 AM'
//     },
//     {
//         title: 'Example 2',
//         place: 'Berlin',
//         date: 'Feb 05 - 10:00 AM'
//     },
//     {
//         title: 'Example 3',
//         place: 'Berlin',
//         date: 'Feb 05 - 10:00 AM'
//     },
//     {
//         title: 'Example 4',
//         place: 'Berlin',
//         date: 'Feb 05 - 10:00 AM'
//     }
//   ]
  let shows: IEvent[] = []
  getShows()
    .then(res => shows = res)

  return (
    <div className={styles.wrapper}>
      <h5 className={styles.title}>Scheduled events</h5>
      <div className={styles.content} >
        <div className={styles.items}>
        {
            shows.length > 0 ?
            <PaginatedItems itemsPerPage={6} items={shows} type='followedShows'/>
            :
            <h6 className={styles.error}>Sorry! No followed shows yet 🥲</h6>
        }
        </div>
      </div>
    </div>
  )
}
