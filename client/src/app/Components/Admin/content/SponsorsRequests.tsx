'use client'
import { useState, useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '@/app/hooks/rtkHooks'
import { loadAds } from '@/app/store/ads/ads-slice'
import SponsoredPagination from '../../Profile/SponsoredPagination'
import { IAd } from '@/app/types/interfaces'
import styles from './SponsorsRequests.module.scss'

export default function SponsorsRequests() {
    const dispatch = useAppDispatch();
    const ads = useAppSelector(state => state.ads.entities)
    useEffect(() => {
        dispatch(loadAds());
    }, [])
    return (
    <div className={styles.wrapper}>
    <h5 className={styles.title}>Sponsors request</h5>
    <div className={styles.content}>
      <div className={styles.items}>
      {
          ads && ads.length > 0 ?
          <SponsoredPagination itemsPerPage={6} items={ads} isAdmin={true}/>
          :
          <h6 className={styles.error}>Sorry! No sponsors requests yet 🥲</h6>
      }
      </div>
    </div>
  </div>
  )
}
