'use client'
import { useState, useEffect } from 'react'
import { IArtist } from '@/app/types/interfaces'
import { ArtistsPaginate } from '../ArtistsPaginate/ArtistsPaginate'
import styles from './AllArtists.module.scss'


export default async function AllArtists() {
  const [artists, setArtists] = useState<IArtist[]>();
  useEffect(() => {
    async function getShows(){
      const res = await fetch(`${process.env.BACKEND_URL}/artists/`);
      const data = await res.json();
      return data;
    }
    getShows()
      .then(res => setArtists(res))
  }, [])
  console.log(artists)
  return (
    <section>
        <h5 className={styles.title}>All artists</h5>
        {/* artists paginate */}
        {artists && artists.length >0 ?
          <ArtistsPaginate itemsPerPage={15} artists={artists} />
          :
          <div className={styles.showsException}>
            Sorry! No artists yet 🥲
          </div>
        }
    </section>
  )
}
