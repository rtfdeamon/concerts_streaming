'use client'
import { useState, useEffect } from 'react'
import { getTokenForApi } from '@/app/utils/getTokenForApi'
import Loading from '../Loading/Loading'
import PaginatedItems from '../Shows/Paginate/Paginate'
import { IEvent, IUser } from '@/app/types/interfaces'
import styles from './FollowedShows.module.scss'
import ProfilePaginatedItems from '../Shows/Paginate/ProfilePaginate'
import { filterPassedShows } from '@/app/utils/filterPassedShows'


export default function FollowedShows() {
    const [shows, setShows] = useState<IEvent[] | undefined>();
    const [user, setUser] = useState<IUser>()
    const [token, setToken] = useState<string | undefined | null>(undefined);
    const [isLoaded, setIsLoaded] = useState(true);
    const isMobile = window.innerWidth < 480
    useEffect(() => {
      getTokenForApi()
      .then(res => setToken(res))
      typeof token !== 'undefined' && fetch(`${process.env.BACKEND_URL}/users/current/`, {
        method: 'GET',
        headers: {
          'Authorization' : `Bearer ${token}`
        }
      })
        .then(res => res.json())
        .then(res => setUser(res))
        .finally(() => setIsLoaded(false))
    }, [token])
    useEffect(() => {
      const filteredShows = filterPassedShows(user?.concerts_followed)
      setShows(filteredShows)
    }, [user?.concerts_followed])
    return (
    <div className={styles.menuWrapper}>
      <h5 className={styles.title}>Followed shows</h5>
      <div className={styles.shows}>
        {
            shows && shows.length > 0 &&
            <ProfilePaginatedItems isProfile isMobile itemsPerPage={!isMobile ? 6 : 3} items={shows}/>
        }
        {!isLoaded && shows?.length === 0 && 
            <h6 className={styles.error}>Sorry! No followed shows yet 🥲</h6>
        }
      </div>
    </div>
  )
}
