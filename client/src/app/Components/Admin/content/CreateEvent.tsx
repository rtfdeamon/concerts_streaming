import { useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '@/app/hooks/rtkHooks'
import { loadAllShows } from '@/app/store/shows/showsSlice'
import { EventsPaginate } from './EventsPaginate'
import CreateBtn from './CreateBtn'
import styles from './CreateEvent.module.scss'
import SortBtns from './SortBtns'


interface IMockEvent {
  eventTitle: string,
  date: string
}

export interface IMockEvents{
  events: IMockEvent[]
}


export default function CreateEvent() {
  const dispatch = useAppDispatch();
  const events = useAppSelector(state => state.shows.events)
  useEffect(() => {
    dispatch(loadAllShows());
  }, [])
  // const mockEvents = [
  //   {
  //     eventTitle: 'Show 1',
  //     date: 'Feb 05 - 10:00 AM'
  //   },
  //   {
  //     eventTitle: 'Show 2',
  //     date: 'Feb 05 - 10:00 AM'   
  //   },
  //   {
  //     eventTitle: 'Show 3',
  //     date: 'Feb 05 - 10:00 AM'
  //     },
  //   {
  //     eventTitle: 'Show 4',
  //     date: 'Feb 05 - 10:00 AM'    
  //   },
  //   {
  //     eventTitle: 'Show 5',
  //     date: 'Feb 05 - 10:00 AM'    
  //   },
  //   {
  //     eventTitle: 'Show 6',
  //     date: 'Feb 05 - 10:00 AM'
  //   }
  // ]
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
