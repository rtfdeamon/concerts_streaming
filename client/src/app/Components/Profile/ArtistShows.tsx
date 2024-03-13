'use client'
import { useState, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '@/app/hooks/rtkHooks';
import { loadSessions } from '@/app/store/sessions/sessionsSlice';
import { ArtistShowsPaginate } from './ArtistShowsPaginate'
import Loading from '../Loading/Loading';
import styles from './ArtistShows.module.scss'


export default function ArtistShows() {
  const dispatch = useAppDispatch();
  const sessions = useAppSelector(state => state.sessions.entities);
  const [isLoaded, setIsLoaded] = useState(true);
  useEffect(() => {
    dispatch(loadSessions())
    .finally(() => setIsLoaded(false))
  }, [])
  return (
    <section className={styles.wrapper}>
      <h5 className={styles.title}>My shows</h5>
      {
          sessions.length >0 && <ArtistShowsPaginate  itemsPerPage={4} sessions={sessions}/>
      }
      {isLoaded && <Loading />}
      {!isLoaded && sessions?.length === 0 && 
          <div className={styles.showsException}>
            Sorry! No shows yet 🥲
        </div>
      }
    </section>
  )
}
