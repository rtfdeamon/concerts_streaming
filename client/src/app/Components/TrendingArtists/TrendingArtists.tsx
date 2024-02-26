'use client'
import { useState, useEffect } from 'react';
import { getTokenForApi } from '@/app/utils/getTokenForApi';
import { ArtistsPaginate } from '../ArtistsPaginate/ArtistsPaginate';
import { IArtist } from '@/app/types/interfaces';
import styles from './TrendingArtists.module.scss'


async function getShows(){
  const res = await fetch(`${process.env.FRONTEND_URL}/artists/trending/`, {
    method: 'GET',
    headers: {
      'Authorization':`Bearer ${await getTokenForApi()}`
    }
  })
  const data = await res.json()
  return data
}

export default function TrendingArtists() {
  const [artists, setArtists] = useState<IArtist[]>([])
  useEffect(() => {
    getShows()
      .then(res => setArtists(res))
  }, [])
  console.log(artists)
  return (
    <section>
    <h5 className={styles.title}>Trending artists</h5>
    {artists && artists.length >0 ?
          <ArtistsPaginate itemsPerPage={4} artists={artists} />
          :
          <div className={styles.showsException}>
            Sorry! No trending artists yet 🥲
          </div>
        }
</section>
  )
}
