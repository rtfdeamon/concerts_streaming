'use client'
import { useAppSelector } from '@/app/hooks/rtkHooks'
import CreateEvent from './CreateEvent'
import ScheduledEvents from './ScheduledEvents'
import ArtistsRequests from './ArtistsRequests'
import styles from './Content.module.scss'

export default function Content() {
  const option = useAppSelector(state => state.menuOption.option)
  return (
    <div className={styles.Content}>
      {option === 'events' && 
        <CreateEvent />
      }
      {option === 'scheduled' && 
        <ScheduledEvents />
      }
      {option === 'requests' && 
        <ArtistsRequests />
      }
    </div>
  )
}
