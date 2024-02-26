'use client'
import { useState, useEffect } from 'react'
import { getTokenForApi } from '@/app/utils/getTokenForApi'
import { IArtist } from '@/app/types/interfaces'
import Women from '../../../../public/women.jpg'
import Link from 'next/link'
import Image from 'next/image'
import styles from './Recommendations.module.scss'

export default function Recommendations() {
  const [artists, setArtists] = useState<IArtist[]>()
  useEffect(() => {
    async function getShows(){
      const res = await fetch(`${process.env.FRONTEND_URL}/artists/trending/`, {
        method: 'GET',
        headers: {
          'Authorization':`Bearer ${await getTokenForApi()}`
        }
      })
      const data = await res.json()
      console.log(data)
      setArtists(data)
    }
    getShows();
  }, [])
  console.log(artists)
  return (
    <>
        <section className={styles.section}>
            <h5 className={styles.title}>Trending artists</h5>
            <div className={styles.artistsWrapper}>
              {artists && artists.map((a, i) => (
                <div className={styles.artistWrapper} key={i}>
                    <Link className={styles.linkWrapper} href={`/artist/${a.id}`}>
                        <Image src={Women} width={120} height={120} alt={'fds'} />
                        <div className={styles.artistInfo}>
                          <p className={styles.artistName}>{a.name}</p>
                          {/* <span className={styles.genre}>{a.}</span> */}
                        </div>
                    </Link>
                </div>
              ))}
            </div>
        </section>
    </>
  )
}
