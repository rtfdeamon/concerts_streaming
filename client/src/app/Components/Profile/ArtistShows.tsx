'use client'
import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '@/app/hooks/rtkHooks';
import { loadSessions } from '@/app/store/sessions/sessionsSlice';
import { ArtistShowsPaginate } from './ArtistShowsPaginate'
import styles from './ArtistShows.module.scss'


export default async function ArtistShows() {
  const dispatch = useAppDispatch();
  const sessions = useAppSelector(state => state.sessions.entities);
  useEffect(() => {
    dispatch(loadSessions())
  }, [])
  return (
    <section className={styles.wrapper}>
      <h5 className={styles.title}>My shows</h5>
      {
          sessions.length >0 ? <ArtistShowsPaginate  itemsPerPage={4} sessions={sessions}/>
          :
          <div className={styles.showsException}>
              Sorry! No shows yet 🥲
          </div>
      }
    </section>
  )
}
