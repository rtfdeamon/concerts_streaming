
import { useEffect } from "react"
import { useAppDispatch, useAppSelector } from "@/app/hooks/rtkHooks"
import { loadSessions } from '@/app/store/sessions/sessionsSlice'
import { ArtistsPaginate } from "./ArtistsPaginate"
import styles from './ArtistsRequests.module.scss'


export default function ArtistsRequests() {
  const dispatch = useAppDispatch();
  const sessions = useAppSelector(state => state.sessions.entities);
  useEffect(() => {
    dispatch(loadSessions())
}, [dispatch])
  return (
    <div className={styles.wrapper}>
      <h5 className={styles.title}>Artists requests</h5>
      <ArtistsPaginate itemsPerPage={3} sessions={sessions.filter(s => s.status === 'pending')} />
      {sessions.filter(s => s.status === 'pending').length < 1  && 
          <h6 className={styles.error}>Sorry! No advertisers requests yet 🥲</h6>
      }
    </div>
  )
}
