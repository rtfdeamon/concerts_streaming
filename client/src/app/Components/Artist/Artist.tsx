
'use client'
import { useState, useEffect } from "react"
import { useAppSelector } from "@/app/hooks/rtkHooks"
import { getTokenForApi } from "@/app/utils/getTokenForApi"
import { Button } from "@/shadComponents/ui/button"
import { ToastAction } from '@/shadComponents/ui/toast'
import { useToast } from '@/shadComponents/ui/use-toast'
import HeaderWithoutBanner from "../Header/HeaderWithouBanner"
import About from "./About"
import Image from "next/image"
import styles from './Artist.module.scss'
import Women from '../../../../public/women.jpg'
import { IArtistParams } from "@/app/artist/[id]/page"
import ShowsCalendar from "./ShowsCalendar"
import { IArtist, IUser } from "@/app/types/interfaces"
import Loading from "../Loading/Loading"

const followArtist = async (id: string) => {
  const res = await fetch(`${process.env.BACKEND_URL}/artists/${id}/subscribe/`, {
    method: 'POST',
    headers: {
      'Authorization' : `Bearer ${await getTokenForApi()}`
    },
    body: JSON.stringify({artist_id: id})
  })
  const data: unknown = await res.json();
  return data;
}

const unFollowArtist = async (id: string) => {
  const res = await fetch(`${process.env.BACKEND_URL}/artists/${id}/unsubscribe/`, {
    method: 'POST',
    headers: {
      'Authorization' : `Bearer ${await getTokenForApi()}`
    },
    body: JSON.stringify({artist_id: id})
  })
  const data: unknown = await res.json();
  return data;
}

export default function Artist({params}:IArtistParams) {
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [artist, setArtist] = useState<[IArtist] | null>()
  const [user, setUser] = useState<IUser | null>()
  const userStatus = useAppSelector(state => state.userInfo.user?.role)
  const { toast } = useToast();

  const onSubscribeHandler = async (id: string) => {
    const res: any = await followArtist(id);
    if (res.user){
      setIsSubscribed(false);
      toast({
        title: "You`re successfully subscribed!",
        action: (
          <ToastAction altText="Hide">Hide</ToastAction>
        ),
      })
    }
  }
  const onUnsubscribeHandler = async (id: string) => {
    const res: any = await unFollowArtist(id);
    if (res.user){
      setIsSubscribed(true);
      toast({
        title: "You`re successfully unsubscribed!",
        action: (
          <ToastAction altText="Hide">Hide</ToastAction>
        ),
      })
    }
  }

  useEffect(() => {
    fetch(`${process.env.BACKEND_URL}/artists/`)
      .then(res => res.json())
      .then(res => setArtist(res))
    let token;
    getTokenForApi()
      .then(res => token = res)

    typeof token !== 'undefined' && fetch(`${process.env.BACKEND_URL}/users/current`, {
      method: 'GET',
      headers: {
        'Authorization' : `Bearer ${token}`
      }
    })
      .then(res => res.json())
      .then(res => setUser(res))
      if (user?.artist_followed.every(u => u.id !== params.id)){
        setIsSubscribed(false)
      } else{
        setIsSubscribed(true)
      }
  }, [])
  return (
    <>
        <HeaderWithoutBanner />
        <section className={styles.wrapper}>
            {artist ?
              <>
                  <div className={styles.poster}>
                    <Image src={typeof artist[0].avatar_url === 'object' ? Women : artist[0].avatar_url} width={200} height={200} alt="women" />
                  <div className={styles.posterWrapper}>
                        <h5 className={styles.artistTitle}>{artist[0].name}</h5>
                        <p className={styles.desc}>
                          genre
                        </p>
                        {isSubscribed ?
                          <Button
                          onClick={() => onSubscribeHandler(artist[0].id)}
                          disabled={!userStatus}
                          className={styles.btn}>
                          Follow an artist</Button>
                          :
                          <Button
                          onClick={() => onUnsubscribeHandler(artist[0].id)}
                          disabled={!userStatus}
                          className={styles.btn}>
                          Unsubcribe</Button>
                        }
                  </div>
                   </div>
                  <div className={styles.aboutWrapper}>
                      <ShowsCalendar />
                      <About id={artist[0].name} />
                  </div>
              </>
            :
              <Loading />
            }
        </section>
    </>
  )
}
