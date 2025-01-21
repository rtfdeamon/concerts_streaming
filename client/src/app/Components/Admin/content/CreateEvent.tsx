import { useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '@/app/hooks/rtkHooks'
import { loadAllShows } from '@/app/store/shows/showsSlice'
import { EventsPaginate } from './EventsPaginate'
import CreateBtn from './CreateBtn'
import styles from './CreateEvent.module.scss'
import SortBtns from './SortBtns'


export default function CreateEvent() {
  const dispatch = useAppDispatch();
  const events = useAppSelector(state => state.shows.events)
  useEffect(() => {
    dispatch(loadAllShows());
  }, [dispatch])

  return (
      <div className={styles.wrapper}>
      <h5 className={styles.title}>Create an Event</h5>
        <div className={styles.content} >
          <div className={styles.creationWrapper}>
            <CreateBtn />
            <div className={styles.sort}>
              <span className={styles.sortSpan}>Sort by</span>
              <SortBtns />
            </div>
          </div>
          {/* <div className={styles.showsWrapper}>
              <EventsPaginate itemsPerPage={4} events={{mockEvents}} />
          </div> */}
            <div className={styles.showsWrapper}>
              <EventsPaginate itemsPerPage={4} events={{events}} />
          </div>
        </div>
    </div>
  )
}
