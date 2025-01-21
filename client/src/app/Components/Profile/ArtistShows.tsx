'use client'
import { useState, useEffect, useRef } from 'react';
import { useAppDispatch, useAppSelector } from '@/app/hooks/rtkHooks';
import { loadSessions } from '@/app/store/sessions/sessionsSlice';
import { ArtistShowsPaginate } from './ArtistShowsPaginate'
import Loading from '../Loading/Loading';
import styles from './ArtistShows.module.scss'
import { getTokenForApi } from '@/app/utils/getTokenForApi';
import { IUser } from '@/app/types/interfaces';


export default function ArtistShows() {
  const dispatch = useAppDispatch();
  const sessions = useAppSelector(state => state.sessions.entities);
  const [isLoaded, setIsLoaded] = useState(true);
  const [user, setUser] = useState<IUser>()
  useEffect(() => {
    dispatch(loadSessions())
    .finally(() => setIsLoaded(false))
  }, [])
  useEffect(() => {
    async function getStreamReq(){
      const res = await fetch(`${process.env.BACKEND_URL}/streaming/generate/`, {
        method: 'POST',
        headers: {
          'Authorization' : `Bearer ${await getTokenForApi()}`
        }
      })
    }
    async function getToken(){
      const res = await fetch(`${process.env.BACKEND_URL}/users/current/`, {
        method: 'GET',
        headers: {
          'Authorization' : `Bearer ${await getTokenForApi()}`,
        }
      })
      const data = await res.json();
      setUser(data)
    }
    getStreamReq()
    getToken();
  }, [])
  return (
    <section className={styles.wrapper}>
      <h5 className={styles.title}>My shows</h5>
      {
          typeof user !== "undefined" && sessions.length > 0 && <ArtistShowsPaginate  itemsPerPage={5} sessions={sessions} user={user}/>
      }
      {isLoaded || typeof user == 'undefined' && <Loading />}
      {!isLoaded && sessions?.length === 0 && 
          <div className={styles.showsException}>
            Sorry! No shows yet 🥲
        </div>
      }
    </section>
  )
}
