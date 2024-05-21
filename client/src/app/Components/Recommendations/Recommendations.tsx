'use client'
import Loading from '../Loading/Loading'
import { IArtist } from '@/app/types/interfaces'
import User from '../../../../public/user (1).svg'
import Link from 'next/link'
import Image from 'next/image'
import styles from './Recommendations.module.scss'
import { useEffect, useState } from 'react'

export const dynamic = "force-dynamic"

async function getShows(){
  const res = await fetch(`${process.env.BACKEND_URL}/artists/trending/`, {
    cache: 'no-store'
  })
  const data = await res.json()
  return data;
}

export default function Recommendations() {
  let [artists, setArtists] = useState<IArtist[]>([])
  useEffect(() => {
    getShows()
    .then((res) => {
      setArtists(res)
    })
    .catch(e => console.log(e))
  }, [])

  return (
    <>
    {
      artists.length > 0 &&
        <section className={styles.section}>
            <h5 className={styles.title}>Trending artists</h5>
            <div className={styles.artistsWrapper}>
              {artists 
                ? artists.map((a, i) => (
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
                :<Loading />
              }
            </div>
        </section>
    }
    </>
  )
}
