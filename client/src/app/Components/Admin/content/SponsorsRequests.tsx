'use client'
import { useState, useEffect } from 'react'
import { getTokenForApi } from '@/app/utils/getTokenForApi'
import SponsoredPagination from '../../Profile/SponsoredPagination'
import { IAd } from '@/app/types/interfaces'
import styles from './SponsorsRequests.module.scss'

export default function SponsorsRequests() {
    const [ads, setAds] = useState<IAd[] | undefined>();
    useEffect(() => {
        const getAds = async () => {
            const res = await fetch(`${process.env.BACKEND_URL}/sponsor-ads/?status=pending&select=all`, {
                method: 'GET',
                headers: {
                    'Authorization' : `Bearer ${await getTokenForApi()}`
                }
            })
            const data: IAd[] = await res.json();
            setAds(data)
        }
        getAds()
    }, [])
    return (
    <div className={styles.wrapper}>
    <h5 className={styles.title}>Sponsors request</h5>
    <div className={styles.content} >
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
