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


  async function getConcert(){
    fetch(`${process.env.BACKEND_URL}/services/${params.id}/`, {
      method: 'GET',
      headers: !role ?
      {}
      :
      {
        'Authorization':`Bearer ${await getTokenForApi()}`
      }
    })
    .then(res => res.json())
    .then(res => setShow(res))
  }
  useEffect(() => {
    getConcert()
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
                <div className={styles.posterWrapper}>
                  {
                    //@ts-ignore
                  user?.ein && (
                        <h5 className={styles.artistSubtitle}>EIN: {
                                     //@ts-ignore
                          user?.ein}</h5>
                  )}
                 {
                             //@ts-ignore
                 user?.email && (
                        <h5 className={styles.artistSubtitle}>Email: {
                                     //@ts-ignore
                          user?.email}</h5>
                  )}
                                   {
                                              //@ts-ignore
                                   user?.phone && (
                        <h5 className={styles.artistSubtitle}>Phone: {
                                     //@ts-ignore
                          user?.phone}</h5>
                  )}
                                   {
                                              //@ts-ignore
                                   user?.website && (
                        <h5 className={styles.artistSubtitle}>Website: {
                                     //@ts-ignore
                          user?.website}</h5>
                  )}
                                   {
                                              //@ts-ignore
                                   user?.business_name && (
                        <h5 className={styles.artistSubtitle}>Business name: {
                                     //@ts-ignore
                          user?.business_name}</h5>
                  )}
                </div>
                  <div className={styles.posterWrapper}>
                      <p className={styles.desc}>
                        Description: {show.description}
                      </p>
                  </div>
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
