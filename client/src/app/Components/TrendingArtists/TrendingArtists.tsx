'use client'
import { useState, useEffect } from 'react';
import Loading from '../Loading/Loading';
import { IArtist } from '@/app/types/interfaces';
import Link from 'next/link';
import Image from 'next/image';
import User from '../../../../public/user (1).svg';
import styles from './TrendingArtists.module.scss';
import { getHostName } from '@/app/utils/getHostName';



export default function TrendingArtists() {
  const [isLoaded, setIsLoaded] = useState(true);
  const [artists, setArtists] = useState<IArtist[]>([]);
  useEffect(() => {
    async function getShows(){
      const res = await fetch(`${process.env.BACKEND_URL}/artists/trending/`)
      const data = await res.json()
      setArtists(data);
      setIsLoaded(false);
    }
    getShows()
  }, [])
  return (
    <section>
    <h5 className={styles.title}>New Member Artists</h5>
    <div className={styles.wrapper}>
    {artists && artists.length >0 &&
          <div className={styles.requestWrapper}>
              {artists.map((a, i) => (
                      <Link key={i}  className={styles.showWrapper} href={`/artist/${a.id}`}>
                          <Image
                            className={styles.image}
                            src={typeof a.avatar_url !== 'object' ? `${getHostName(a?.avatar_url)}` : User}
                            width={80}
                            height={80}
                            alt="artistIcon"
                            priority
                          />
                          <p className={styles.name}>{a.name}</p>
                      </Link>
              ))}
          </div>
      }
    </div>
      {isLoaded && <Loading />}
      {!isLoaded && artists?.length === 0 && 
        <h6 className={styles.showsException}>Sorry! No new member artists yet 🥲</h6>
      }
</section>
  )
}
