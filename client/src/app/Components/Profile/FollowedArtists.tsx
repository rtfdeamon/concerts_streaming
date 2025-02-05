'use client'
import { useState, useEffect } from 'react'
import { getTokenForApi } from '@/app/utils/getTokenForApi'
import { FollowedPaginate } from './FollowedPaginate'
import Loading from '../Loading/Loading'
import { IArtist } from '@/app/types/interfaces'
import styles from './FollowedArtists.module.scss'
import { ArtistsPaginate } from '../ArtistsPaginate/ArtistsPaginate'



export default function FollowedArtists() {
  const [artists, setArtists] = useState<IArtist[] | undefined>()
  const [token, setToken] = useState<string | undefined | null>();
  const [isLoaded, setIsLoaded] = useState(true);
  useEffect(() => {
    getTokenForApi()
      .then(res => setToken(res))
  }, [])
  useEffect(() => {
    typeof token !== 'undefined' && fetch(`${process.env.BACKEND_URL}/users/current/`, {
      method: 'GET',
      headers: {
        'Authorization' : `Bearer ${token}`
      }
    })
      .then(res => res.json())
      .then(res => setArtists(res.artists_followed))
      .finally(() => setIsLoaded(false))
  }, [token])
  return (
    <div className={styles.menuWrapper}>
      <h5 className={styles.title}>My Artists</h5>
      <div className={styles.artistsWrapper}>
        {
          typeof artists !== 'undefined'  && artists.length > 0 &&
              <ArtistsPaginate isProfile itemsPerPage={9} artists={artists} />
        }
        {isLoaded && <Loading />}
        {!isLoaded && artists?.length === 0 && 
            <h5 className={styles.showsException}>Sorry! No followed artists yet 🥲</h5>
        }
        </div>
    </div>
  )
}
