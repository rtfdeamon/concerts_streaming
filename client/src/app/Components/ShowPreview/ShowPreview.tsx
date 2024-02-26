'use client'
import { useState, useEffect } from "react";
import { getTokenForApi } from "@/app/utils/getTokenForApi";
import HeaderWithoutBanner from "../Header/HeaderWithouBanner";
import SponsorModal from "./SponsorModal";
import { useToast } from "@/shadComponents/ui/use-toast";
import { ToastAction } from "@radix-ui/react-toast";
import { IUser } from "@/app/types/interfaces";
import { IPreviewParams } from "@/app/genre/[id]/page";
import { Button } from "@/shadComponents/ui/button";
import Image from "next/image";
import Link from "next/link";
import Women from '../../../../public/women.jpg'
import Live from '../../../../public/radio.svg'
import CalendarIcon from '../../../../public/calendar-range.svg'
import styles from './ShowPreview.module.scss'
import RequestButton from "./RequestButton";
import { IEvent } from "@/app/types/interfaces";
import Loading from "../Loading/Loading";

const followShow = async (id: string) => {
  const res = await fetch(`${process.env.BACKEND_URL}/concerts/${id}/subscribe/`, {
    method: 'POST',
    headers: {
      'Authorization' : `Bearer ${await getTokenForApi()}`
    },
    body: JSON.stringify({id: id})
  })
  const data: unknown = await res.json();
  return data;
}

const unFollowShow = async (id: string) => {
  const res = await fetch(`${process.env.BACKEND_URL}/concerts/${id}/unsubscribe/`, {
    method: 'POST',
    headers: {
      'Authorization' : `Bearer ${await getTokenForApi()}`
    },
    body: JSON.stringify({id: id})
  })
  const data: unknown = await res.json();
  return data;
}

export default function ShowPreview({params}:IPreviewParams) {
  let role : string | undefined;
  if (typeof window !== 'undefined' && typeof localStorage.getItem('role') !== undefined){
    role = JSON.parse(localStorage.getItem('role') as string);
  }
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [show, setShow] = useState<IEvent | null>(null);
  const [token, setToken] = useState<string | undefined>(undefined);
  const [user, setUser] = useState<IUser | null>();
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const { toast } = useToast();

  const onSubscribeHandler = async (id: string) => {
    const res: any = await followShow(id);
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
    const res: any = await unFollowShow(id);
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

  const modalHandler = () => {
    setModalIsOpen(true)
  }

  useEffect(() => {
      fetch(`${process.env.BACKEND_URL}/concerts/${params.id}`)
      .then(res => res.json())
      .then(res => setShow(res))
  }, [])
  useEffect(() => {
    getTokenForApi()
      .then(res => setToken(res))
      if (typeof token !== 'undefined'){
        fetch(`${process.env.BACKEND_URL}/users/current`, {
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
    if (user?.concerts_followed.every(u => u.id !== params.id)){
      setIsSubscribed(false)
    } else{
      setIsSubscribed(true)
    }
  }, [user])
  return (
      <>
        <HeaderWithoutBanner />
        {modalIsOpen && show && <SponsorModal isOpen={modalIsOpen} setIsOpen={setModalIsOpen} showId={show?.id} showTitle={show.name}/>}
        <section className={styles.section}>
          {show?.name ? 
          <>
              <h5 className={styles.artistTitle}>{show.name}</h5>
              <div className={styles.poster} style={{  backgroundImage: "url(" + { Women } + ")", backgroundSize: 'auto' }}>
                <div className={styles.previewWrapper}>
                  <Image className={styles.preview} src={show.poster_url} width={600} height={300} alt={show.name} />
                  {role === 'viewer' && 
                            <Button
                            // onClick={}
                            disabled={!role}
                            className={styles.buyBtn}>
                            Buy a ticket</Button>
                    }
                </div>
                  <div className={styles.posterWrapper}>
                      <p className={styles.desc}>
                        {show.description}
                      </p>
                      <div className={styles.calendar}>
                          <div className={styles.live}>
                              <Image className={styles.LiveIcon} src={Live} height={50} width={50} alt="live" />
                              <p className={styles.text}>Live stream</p>
                          </div>
                          <div className={styles.date}>
                              <Image className={styles.CalendarIcon} src={CalendarIcon} height={50} width={50} alt="calendar" />
                              <div className={styles.wrapper}>
                                <p className={styles.text}>{new Date(show.date).toLocaleString()}</p>
                                {/* <span className={styles.span}>09:00 AM, GMT+3</span> */}
                              </div>
                          </div>
                      </div>
                      {!isSubscribed && role !== 'sponsor' &&
                          <Button
                          onClick={() => onSubscribeHandler(show.id)}
                          disabled={!role}
                          className={styles.btn}>
                          Follow this show</Button>
                      }
                      {isSubscribed && role !== 'sponsor' && 
                          <Button
                          onClick={() => onUnsubscribeHandler(show.id)}
                          disabled={!role}
                          className={styles.btn}>
                          Unsubcribe</Button>
                      }
                      {role && role === 'sponsor' &&
                          <Button
                          onClick={() => modalHandler()}
                          className={styles.btn}>
                          Become a sponsor</Button>
                        }
                  </div>
              </div>
              <div className={styles.aboutWrapper}>
                <h6 className={styles.aboutTitle}>About this show</h6>
                <p className={styles.aboutDesc}>
                  Тут будет список артистов, принимающих участие
                </p>
              </div>
              <div className={styles.banner}>
                  <Link href={`${process.env.FRONTEND_URL}/events/month`} className={styles.btnWrapper}>
                    <Button className={styles.btnBanner}>Look for more shows</Button>
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
