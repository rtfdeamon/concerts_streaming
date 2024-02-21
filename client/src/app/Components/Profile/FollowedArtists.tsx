'use client'
import { useState, useEffect } from 'react'
import { getTokenForApi } from '@/app/utils/getTokenForApi'

import Image from 'next/image'
import Link from 'next/link'
import User from '../../../../public/user (1).svg'
import { IArtist } from '@/app/types/interfaces'
import { IUser } from '@/app/types/interfaces'
import styles from './FollowedArtists.module.scss'
import { FollowedPaginate } from './FollowedPaginate'



export default async function FollowedArtists() {
  const [artists, setArtists] = useState<IArtist[] | undefined>()
  const [token, setToken] = useState<string | undefined>();
  useEffect(() => {
    getTokenForApi()
      .then(res => setToken(res))
  }, [])
  useEffect(() => {
    typeof token !== 'undefined' && fetch(`${process.env.BACKEND_URL}/users/current`, {
      method: 'GET',
      headers: {
        'Authorization' : `Bearer ${token}`
      }
    })
      .then(res => res.json())
      .then(res => setArtists(res.artists_followed))
  }, [token])
  useEffect(() => {
    console.log(artists);
  }, [artists])
  return (
    <div className={styles.menuWrapper}>
      <h5 className={styles.title}>My Artists</h5>
      <div className={styles.artistsWrapper}>
        {
          typeof artists !== 'undefined' ?
              <FollowedPaginate itemsPerPage={9} artists={artists} />
          :
            <h5 className={styles.title}>Sorry! No followed artists yet 🥲</h5>
        }
        </div>
    </div>
  )
}
