'use client'
import { useState, useEffect } from "react";
import { getTokenForApi } from "@/app/utils/getTokenForApi";
import HeaderWithoutBanner from "../Header/HeaderWithouBanner";
import { ArtistsPaginate } from "../ArtistsPaginate/ArtistsPaginate";

import { useToast } from "@/shadComponents/ui/use-toast";
import { ToastAction } from "@radix-ui/react-toast";
import { ITicket, IUser } from "@/app/types/interfaces";
import { IPreviewParams } from "@/app/category/[id]/page";
import { Button } from "@/shadComponents/ui/button";
import Image from "next/image";
import Link from "next/link";
import Women from '../../../../public/women.jpg'
import Live from '../../../../public/radio.svg'
import CalendarIcon from '../../../../public/calendar-range.svg'
import styles from './ServicePreview.module.scss'
import { IEvent } from "@/app/types/interfaces";
import Loading from "../Loading/Loading";
import { useRouter } from "next/navigation";
import { IService } from "@/app/store/service/serviceSlice";

import InstIcon from '../../../../public/instagram-icon.svg'
import LinkedInIcon from '../../../../public/linkedin-icon.svg'
import SnapChatIcon from '../../../../public/snapchat-icon.svg'
import SpotifyIcon from '../../../../public/spotify-icon.svg'
import TikTokIcon from '../../../../public/tiktok-icon.svg'
import TwitterIcon from '../../../../public/twitter-icon.svg'
import YoutubeIcon from '../../../../public/youtube-icon.svg'

export default function ServicePreview({params}:IPreviewParams) {
  let role : string | undefined;
  if (typeof window !== 'undefined' && typeof localStorage.getItem('role') !== undefined){
    role = JSON.parse(localStorage.getItem('role') as string);
  }
  const router = useRouter()
  const [show, setShow] = useState<IService | null>(null);
  const [token, setToken] = useState<string | undefined | null>(undefined);
  const [user, setUser] = useState<IUser | null>();
  const { toast } = useToast();

  useEffect(() => {
    role !== 'artist' && router.back()
  }, [role])


  useEffect(() => {
    if (!token) return
    (async function getService(){
      try{
          const res = await fetch(`${process.env.BACKEND_URL}/services/${params.id}/`, {
            method: 'GET',
            headers: {
              'Authorization' : `Bearer ${token}`
            }
          })
          const data = await res.json()
          setShow(data)
        } catch(err){
         console.log(err)
      }
    })().catch((err) => console.log(err))
  }, [token])

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
  console.log('show', show)
  return (
      <>
        <HeaderWithoutBanner />
        <section className={styles.section}>
          {show?.title ? 
          <>
              <h5 className={styles.artistTitle}>{show.title}</h5>
              <div className={styles.poster} style={{  backgroundImage: "url(" + { Women } + ")", backgroundSize: 'auto' }}>
                <div className={styles.previewWrapper}>
                  <Image className={styles.preview} src={show.image_url} width={600} height={300} alt={show.title} />
                </div>
                {show.description && 
                  <div className={styles.posterWrapper}>
                      <p className={styles.desc}>
                        {show.description}
                      </p>
                  </div>
                }
                                <div className={styles.posterWrapper}>
                <div className="flex justify-center">
                        {
                              //@ts-ignore
                              show?.user?.business_name && (
                            <h5 className={styles.artistSubtitle}>{
                              //@ts-ignore
                              show?.user?.business_name}</h5>
                        )}
                        {
                                //@ts-ignore
                                show?.user?.email && (
                                <h5 className={styles.artistSubtitle} style={{marginLeft: '10px'}}>{
                                            //@ts-ignore
                                  show?.user?.email}</h5>
                          )}
                          {
                                //@ts-ignore
                                show?.user?.phone && (
                                <h5 className={styles.artistSubtitle} style={{marginLeft: '10px'}}>{
                                            //@ts-ignore
                                            show?.user?.phone}</h5>
                          )}
                        </div>
                        {
                          //@ts-ignore
                          show?.user?.website && (
                            //@ts-ignore
                        <Link target="_blank" href={`//${show?.user?.website}`} className={styles.artistSubtitle} style={{color: 'blue'}}>{
                                     //@ts-ignore
                                     show?.user?.website}</Link>
                  )}
                </div>
                {
                    //@ts-ignore
                    show?.user?.links && Object.values(show?.user?.links).length > 0 && 
                    <ul className={styles.socialItems}>
              {
                                                //@ts-ignore
                                                show?.user?.links['instagram'] && 
                //@ts-ignore
                <Link href={show?.user?.links['instagram']}
                  className={styles.socialItem}
                >
                  <Image src={InstIcon} alt="inst" />
                </Link>
              }
              {
                                                //@ts-ignore
                                                show?.user?.links['snapChat'] && 
                                                //@ts-ignore
                <Link href={show?.user?.links['snapChat']}
                  className={styles.socialItem}
                >
                  <Image src={SnapChatIcon} alt="snapchat" />
                </Link>
              }
              {
                                                //@ts-ignore
                                                show?.user?.links['spotify'] && 
                                                //@ts-ignore
              <Link href={show?.user?.links['spotify']}
                className={styles.socialItem}
              >
                <Image src={SpotifyIcon} alt="spotify" />
              </Link>
              }
              {
                //@ts-ignore
                show?.user?.links['instagram'] && 
                //@ts-ignore
              <Link href={show?.user?.links['instagram']}
                className={styles.socialItem}
              >
                <Image src={TikTokIcon} alt="inst" />
              </Link>
              }
              {
              //@ts-ignore
              show?.user?.links['twitter'] && 
              //@ts-ignore
              <Link href={show?.user?.links['twitter']}
                className={styles.socialItem}
              >
                <Image src={TwitterIcon} alt="twitter" />
              </Link>
              }
              {
              //@ts-ignore
              show?.user?.links['youtube'] && 
              //@ts-ignore
              <Link href={show?.user?.links['youtube']}
                className={styles.socialItem}
              >
                <Image src={YoutubeIcon} alt="youtube" />
              </Link>
              }
              {
                                                //@ts-ignore
                                                show?.user?.links['linkedin'] && 
                                                //@ts-ignore
              <Link href={show?.user?.links['linkedin']}
                className={styles.socialItem}
              >
                <Image src={LinkedInIcon} alt="linkedin" />
              </Link>
              }
                    </ul>
                   }
              </div>
              <div className={styles.banner}>
                  <Link href={`${process.env.FRONTEND_URL}/events/month`} className={styles.btnWrapper}>
                    <Button className={styles.btnBanner}>Look for shows</Button>
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
