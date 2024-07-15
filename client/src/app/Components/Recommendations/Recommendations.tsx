'use client'
import Loading from '../Loading/Loading'
import { IArtist } from '@/app/types/interfaces'
import User from '../../../../public/user (1).svg'
import Link from 'next/link'
import Image from 'next/image'
import styles from './Recommendations.module.scss'
import { useEffect, useState } from 'react'



export default function Recommendations() {
  let [artists, setArtists] = useState<IArtist[]>([])
  useEffect(() => {
    async function getShows(){
      const res = await fetch(`${process.env.BACKEND_URL}/artists/trending/`, {
        cache: 'no-store'
      })
      const data = await res.json()
      setArtists(data)
    }
    getShows()
  }, [])
  return (
    <>
    {
      artists.length > 0 &&
        <section className={styles.section}>
            <h5 className={styles.title}>Trending artists</h5>
            <div className={styles.artistsWrapper}>
              {artists.map((a, i) => (
                  <div className={styles.artistWrapper} key={i}>
                      <Link className={styles.linkWrapper} href={`/artist/${a.id}`}>
                          <Image src={typeof a.avatar_url !== 'object' ? a.avatar_url : User} width={120} height={120} alt={''} />
                          <div className={styles.artistInfo}>
                            <p className={styles.artistName}>{a.name}</p>
                            {/* <span className={styles.genre}>{a.}</span> */}
                          </div>
                      </Link>
                  </div>
                ))
              }
            </div>
        </section>
    }
    </>
  )
}
