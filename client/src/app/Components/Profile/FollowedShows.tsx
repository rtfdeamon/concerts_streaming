'use client'
import { useState, useEffect } from 'react'
import { getTokenForApi } from '@/app/utils/getTokenForApi'
import PaginatedItems from '../Shows/Paginate/Paginate'
import { IEvent, IUser } from '@/app/types/interfaces'
import styles from './FollowedShows.module.scss'


export default function FollowedShows() {
    const [shows, setShows] = useState<IEvent[] | undefined>();
    const [user, setUser] = useState<IUser>()
    const [token, setToken] = useState<string | undefined>(undefined);
    useEffect(() => {
      getTokenForApi()
      .then(res => setToken(res))
      typeof token !== 'undefined' && fetch(`${process.env.BACKEND_URL}/users/current`, {
        method: 'GET',
        headers: {
          'Authorization' : `Bearer ${token}`
        }
      })
        .then(res => res.json())
        .then(res => setUser(res))
    }, [token])
    useEffect(() => {
      setShows(user?.concerts_followed)
    }, [user?.concerts_followed])
    return (
    <div className={styles.menuWrapper}>
      <h5 className={styles.title}>Followed shows</h5>
      <div className={styles.shows}>
        {
            shows && shows.length > 0 ?
            <PaginatedItems itemsPerPage={6} items={shows} type='followedShows'/>
            :
            <h6 className={styles.error}>Sorry! No followed shows yet 🥲</h6>
        }
      </div>
    </div>
  )
}
