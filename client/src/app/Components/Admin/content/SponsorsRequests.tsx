'use client'
import { useState, useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '@/app/hooks/rtkHooks'
import { loadAds } from '@/app/store/ads/ads-slice'
import SponsoredPagination from '../../Profile/SponsoredPagination'
import Loading from '../../Loading/Loading'
import styles from './SponsorsRequests.module.scss'

export default function SponsorsRequests() {
    const dispatch = useAppDispatch();
    const ads = useAppSelector(state => state.ads.entities);
    const [isLoaded, setIsLoaded] = useState(true);
    useEffect(() => {
        dispatch(loadAds())
        .finally(() => {
          setIsLoaded(false)
        })
    }, [])
    return (
    <div className={styles.wrapper}>
    <h5 className={styles.title}>Advertisers requests</h5>
    {!isLoaded && ads?.length === 0 && 
          <h6 className={styles.error}>Sorry! No advertisers requests yet 🥲</h6>
        }
    <div className={styles.content}>
      <div className={styles.items}>
        {
            ads && ads.length > 0 &&
            <SponsoredPagination itemsPerPage={2} items={ads} isAdmin={true}/>
        }
        {isLoaded && <Loading />}
      </div>
    </div>
  </div>
  )
}
