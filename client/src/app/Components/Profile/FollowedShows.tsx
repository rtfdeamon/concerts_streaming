'use client'
import { useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '@/app/hooks/rtkHooks'
import { loadAllShows } from '@/app/store/shows/showsSlice'
import PaginatedItems from '../Shows/Paginate/Paginate'
import styles from './FollowedShows.module.scss'


// const shows = [
//   {
//       title: 'Example 1',
//       place: 'Berlin',
//       date: 'Feb 05 - 10:00 AM'
//   },
//   {
//       title: 'Example 2',
//       place: 'Berlin',
//       date: 'Feb 05 - 10:00 AM'
//   },
//   {
//       title: 'Example 3',
//       place: 'Berlin',
//       date: 'Feb 05 - 10:00 AM'
//   },
//   {
//       title: 'Example 4',
//       place: 'Berlin',
//       date: 'Feb 05 - 10:00 AM'
//   },
//   {
//       title: 'Example 1',
//       place: 'Berlin',
//       date: 'Feb 05 - 10:00 AM'
//   },
//   {
//       title: 'Example 2',
//       place: 'Berlin',
//       date: 'Feb 05 - 10:00 AM'
//   },
//   {
//       title: 'Example 3',
//       place: 'Berlin',
//       date: 'Feb 05 - 10:00 AM'
//   },
//   {
//       title: 'Example 4',
//       place: 'Berlin',
//       date: 'Feb 05 - 10:00 AM'
//   },
//   {
//       title: 'Example 1',
//       place: 'Berlin',
//       date: 'Feb 05 - 10:00 AM'
//   },
//   {
//       title: 'Example 2',
//       place: 'Berlin',
//       date: 'Feb 05 - 10:00 AM'
//   },
//   {
//       title: 'Example 3',
//       place: 'Berlin',
//       date: 'Feb 05 - 10:00 AM'
//   },
//   {
//       title: 'Example 4',
//       place: 'Berlin',
//       date: 'Feb 05 - 10:00 AM'
//   },
//   {
//       title: 'Example 1',
//       place: 'Berlin',
//       date: 'Feb 05 - 10:00 AM'
//   },
//   {
//       title: 'Example 2',
//       place: 'Berlin',
//       date: 'Feb 05 - 10:00 AM'
//   },
//   {
//       title: 'Example 3',
//       place: 'Berlin',
//       date: 'Feb 05 - 10:00 AM'
//   },
//   {
//       title: 'Example 4',
//       place: 'Berlin',
//       date: 'Feb 05 - 10:00 AM'
//   }
// ]

export default function FollowedShows() {
    const dispatch = useAppDispatch();
    const shows = useAppSelector(state => state.shows.events);
    useEffect(() => {
        dispatch(loadAllShows())
    }, []) 
    return (
    <div className={styles.menuWrapper}>
      <h5 className={styles.title}>Followed shows</h5>
      <div className={styles.shows}>
        {
            shows.length > 0 ?
            <PaginatedItems itemsPerPage={6} items={shows} type='followedShows'/>
            :
            <h6 className={styles.error}>Sorry! No followed shows yet 🥲</h6>
        }
      </div>
    </div>
  )
}
