
'use client'
import { useState, useEffect, useRef } from "react"
import { useAppSelector } from "@/app/hooks/rtkHooks"
import { getTokenForApi } from "@/app/utils/getTokenForApi"
import { Button } from "@/shadComponents/ui/button"
import { ToastAction } from '@/shadComponents/ui/toast'
import { useToast } from '@/shadComponents/ui/use-toast'
import HeaderWithoutBanner from "../Header/HeaderWithouBanner"
import Loading from "../Loading/Loading"
import Link from "next/link"
import Image from "next/image"
import About from "./About"
import User from '../../../../public/user (1).svg'
import ShowsCalendar from "./ShowsCalendar"
import { IArtistParams } from "@/app/artist/[id]/page"
import { IArtist, IUser } from "@/app/types/interfaces"

import InstIcon from '../../../../public/instagram-icon.svg'
import LinkedInIcon from '../../../../public/linkedin-icon.svg'
import SnapChatIcon from '../../../../public/snapchat-icon.svg'
import SpotifyIcon from '../../../../public/spotify-icon.svg'
import TikTokIcon from '../../../../public/tiktok-icon.svg'
import TwitterIcon from '../../../../public/twitter-icon.svg'
import YoutubeIcon from '../../../../public/youtube-icon.svg'

import styles from './Artist.module.scss'
import { getHostName } from "@/app/utils/getHostName"
import { link } from "fs"

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
  const [artist, setArtist] = useState<IArtist | null>();
  const [user, setUser] = useState<IUser | null>();
  const [token, setToken] = useState<string | undefined | null>();
  const [links, setLinks] = useState<Record<string, string>>({})
  const userStatus = useAppSelector(state => state.userInfo.user?.role)
  const { toast } = useToast();

  useEffect(() => {
    //@ts-ignore
    setLinks(artist?.links || {})
    //@ts-ignore
  }, [artist?.links])

  const onSubscribeHandler = async (id: string) => {
    const res: any = await followArtist(id);
    if (res.user){
      setIsSubscribed(true);
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
      setIsSubscribed(false);
      toast({
        title: "You`re successfully unsubscribed!",
        action: (
          <ToastAction altText="Hide">Hide</ToastAction>
        ),
      })
    }
  }

  useEffect(() => {
      fetch(`${process.env.BACKEND_URL}/artists/${params.id}/`)
      .then(res => res.json())
      .then(res => setArtist(res))
  }, [])
  useEffect(() => {
    getTokenForApi()
      .then(res => setToken(res))
      if (typeof token !== 'undefined'){
        fetch(`${process.env.BACKEND_URL}/users/current/`, {
          method: 'GET',
          headers: {
            'Authorization' : `Bearer ${token}`
          }
        })
        .then(res => res.json())
        .then(res => setUser(res))
      }
  }, [token])
  useEffect(() => {
    if (user?.artists_followed.every(u => u.id != params.id)){
      setIsSubscribed(false)
    } else{
      setIsSubscribed(true)
    }
  }, [user])
  const imageRef = useRef(null);

  return (
    <>
        <HeaderWithoutBanner />
        <section className={styles.wrapper}>
            {artist ?
              <>
                  <div className={styles.poster}>
                    <Image src={typeof artist?.avatar_url === 'object' ? User : `${getHostName(artist?.avatar_url)}`}
                    width={200}
                    height={200}
                    className={styles.artistAvatar}
                    alt="women" />
                  <div className={styles.posterWrapper}>
                        <h5 className={styles.artistTitle}>{artist?.name}</h5>
                        <span className="text-sm text-center">{
                                                        //@ts-ignore
                        artist?.category}</span>
                        {
                                                        //@ts-ignore
                        artist?.category === 'artist' && (
                            <span className="text-sm text-center mt-2">{
                                                              //@ts-ignore
                              artist?.subcategory}</span>

                        )}
                        <p className={styles.desc}>
                          {artist?.artist_genre}
                        </p>
                        {user?.id as number !== +params.id && 
                          <>
                          {!isSubscribed ?
                              <Button
                              onClick={() => onSubscribeHandler(artist?.id)}
                              disabled={!userStatus}
                              className={styles.btn}>
                              Follow an artist</Button>
                              :
                              <Button
                              onClick={() => onUnsubscribeHandler(artist?.id)}
                              disabled={!userStatus}
                              className={styles.btn}>
                              Unsubcribe</Button>
                          }
                          </>
                        }
                  </div>
                   </div>
                   {
                                                   //@ts-ignore
                   links &&
                    <ul className={styles.socialItems}>
              {
                                                //@ts-ignore
                links['instagram'] && 
                <Link href={links['instagram']} target="_blank" 
                  className={styles.socialItem}
                >
                  <Image src={InstIcon} alt="inst" />
                </Link>
              }
              {
                                                //@ts-ignore
                links['snapChat'] && 
                <Link href={links['snapChat']} target="_blank" 
                  className={styles.socialItem}
                >
                  <Image src={SnapChatIcon} alt="snapchat" />
                </Link>
              }
              {
                                                //@ts-ignore
              links['spotify'] && 
              <Link href={links['spotify']} target="_blank" 
                className={styles.socialItem}
              >
                <Image src={SpotifyIcon} alt="spotify" />
              </Link>
              }
              {
                                                //@ts-ignore
              links['tiktok'] && 
              <Link href={links['tiktok']} target="_blank" 
                className={styles.socialItem}
              >
                <Image src={TikTokIcon} alt="inst" />
              </Link>
              }
              {
                                                //@ts-ignore
              links['twitter'] && 
              <Link href={links['twitter']} target="_blank" 
                className={styles.socialItem}
              >
                <Image src={TwitterIcon} alt="twitter" />
              </Link>
              }
              {
                                                //@ts-ignore
              links['youtube'] && 
              <Link href={links['youtube']} target="_blank" 
                className={styles.socialItem}
              >
                <Image src={YoutubeIcon} alt="youtube" />
              </Link>
              }
              {
                                                //@ts-ignore
              links['linkedIn'] && 
              <Link href={links['linkedIn']} target="_blank" 
                className={styles.socialItem}
              >
                <Image src={LinkedInIcon} alt="linkedin" />
              </Link>
              }
                    </ul>
                   }
                  <div className={styles.aboutWrapper}>
                      {artist.concerts.length > 0 &&  <ShowsCalendar concerts={artist.concerts} isAbout={artist.description ? true : false}/> }
                      {artist.description && <About id={artist?.name}  description={artist.description}
                        isCalendar={artist.concerts.length > 0 ? true : false} />}
                  </div>
                  <div className={styles.banner}>
                  <Link href={`${process.env.FRONTEND_URL}/artists/all`} className={styles.btnWrapper}>
                    <Button className={styles.btnBanner}>Look for more artists</Button>
                  </Link>
              </div>
              </>
            :
              <Loading />
            }
        </section>
    </>
  )
}
