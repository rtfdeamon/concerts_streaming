'use client'
import { useState, useEffect } from 'react';
import { getTokenForApi } from '@/app/utils/getTokenForApi'
import SponsoredPagination from './SponsoredPagination';
import { IAd } from '@/app/types/interfaces';
import styles from './SponsoredShows.module.scss'


export default async function SponsoredShows() {
    const [ads, setAds] = useState<IAd[] | undefined>(undefined)
    useEffect(() => {
        const getAds = async () => {
            const res = await fetch(`${process.env.BACKEND_URL}/sponsor-ads/`, {
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
        <section className={styles.sectionWrapper}>
            <div className={styles.titleWrapper}>
                <h5 className={styles.title}>Sponsored shows</h5>
            </div>
            <div className={styles.shows}>
                {
                    ads && ads.length > 0 ?
                        <SponsoredPagination itemsPerPage={6} items={ads.filter(a => a.status === 'accepted')}/>
                    :
                    <h6 className={styles.showsException}>Sorry! No sponsored shows by you yet 🥲</h6>
                }
            </div>
        </section>
  )
}
