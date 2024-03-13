'use client'
import { useState, useEffect } from 'react'
import Loading from '../Loading/Loading'
import { IArtist } from '@/app/types/interfaces'
import { ArtistsPaginate } from '../ArtistsPaginate/ArtistsPaginate'
import styles from './AllArtists.module.scss'


export default function AllArtists() {
  const [artists, setArtists] = useState<IArtist[]>();
  const [isLoaded, setIsLoaded] = useState(true);
  useEffect(() => {
    async function getShows(){
      const res = await fetch(`${process.env.BACKEND_URL}/artists/`);
      const data = await res.json();
      setArtists(data);
      setIsLoaded(false);
    }
    getShows();
  }, [])
  return (
    <section>
        <h5 className={styles.title}>All artists</h5>
        {artists && artists.length >0 &&
          <ArtistsPaginate itemsPerPage={15} artists={artists} />
        }
        {isLoaded && <Loading />}
        {!isLoaded && artists?.length === 0 && 
          <div className={styles.showsException}>
            Sorry! No artists yet 🥲
          </div>
        }
    </section>
  )
}
