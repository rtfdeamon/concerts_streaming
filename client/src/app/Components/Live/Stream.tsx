'use client'
import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { getTokenForApi } from '@/app/utils/getTokenForApi';
import ReactHlsPlayer from 'react-hls-player';
import { MediaPlayer, MediaProvider } from '@vidstack/react';
import { Poster, type PosterProps } from '@vidstack/react';
import { PIPButton, type PIPButtonProps } from "@vidstack/react";
import { Controls } from '@vidstack/react';
import { LiveButton } from '@vidstack/react';
import { PlayButton } from '@vidstack/react';
import { PauseIcon, PlayIcon, PictureInPictureExitIcon, PictureInPictureIcon } from '@vidstack/react/icons';
import { MuteButton } from '@vidstack/react';
import { MuteIcon, VolumeHighIcon, VolumeLowIcon } from '@vidstack/react/icons';
import { VolumeSlider, VolumeSliderInstance } from '@vidstack/react';
import { FullscreenButton } from '@vidstack/react';
import { FullscreenExitIcon, FullscreenIcon } from '@vidstack/react/icons';
import { useMediaState, MediaPlayerInstance } from '@vidstack/react';
import { Button } from '@/shadComponents/ui/button';
import BufferingSpinner from './BufferingSpinner';
import { IShow } from '@/app/types/interfaces';
import Image from 'next/image';
import '@vidstack/react/player/styles/base.css';
import styles from './Stream.module.scss'
import Player from './Player';

export default function Stream({id, concertInfo}: {id: string, concertInfo: any}) {
  const router = useRouter()
  const [show, setShow] = useState<IShow | undefined>()
  const player = useRef<MediaPlayerInstance>(null)
  const [endStream, setEndStream] = useState(false)

  // const [currIndex, setCurrIndex] = useState(0)
  const [currentStream, setCurrentStream] = useState<string>('')
  // const [currentDate, setCurrentDate] = useState<Date>(new Date())
  const timeDiff = useRef<String>('')
  const [[diffDays, diffH, diffM, diffS], setDiff] = useState([0, 0, 0, 0])
  const [tick, setTick] = useState(false)
  const timerId = useRef<NodeJS.Timeout>()
  const [lastStream, setLastStream] = useState<any>()

  const routerHandler = () => {
    router.back();
  }

  // useEffect(() => {
  //   if (typeof concertInfo.current !== 'undefined'){
  //     setCurrentDate(concertInfo.current[currIndex].date)
  //   }
  // }, [concertInfo.current])


  useEffect(() => {
    if (typeof concertInfo.current !== 'undefined' && !lastStream){
      const lastStream = concertInfo.current[concertInfo.current.length - 1]
      setLastStream(lastStream)
    }
  }, [tick])

  useEffect(() => {
    const getShow = async (id: string) => {
      const res = await fetch(`${process.env.BACKEND_URL}/concerts/${id}/`, {
        method: 'GET',
        headers: {
          'Authorization' : `Bearer ${await getTokenForApi()}`
        }
      })
      const data: IShow = await res.json();
      setShow(data);
    }
    getShow(id);
  }, [])
  useEffect(() => {
    const timerID = setInterval(() => setTick(!tick), 1000);
    return () => clearInterval(timerID);
  }, [show])
if (show){
  const showTime = new Date(show?.date as string);
  const DateNow = new Date();
  timeDiff.current = String(Math.abs(showTime.getTime() - DateNow.getTime()));
  // console.log(new Date(+timeDiff.current).toUTCString())
}
useEffect(()=> {
    const showTime = new Date(show?.date as string);
    const finishTime = showTime.getTime() / 1000
    const diff = (finishTime - new Date().getTime() / 1000)
    // console.log(diff)
    if (diff < 0) {
      setDiff([
          NaN,
          NaN,
          NaN,
          NaN
      ])
      return
    }
    setDiff([
      Math.floor(diff / 86400), 
      Math.floor((diff / 3600) % 24), 
      Math.floor((diff / 60) % 60), 
      Math.floor(diff % 60)
    ]) 
}, [tick])


useEffect(() => {
  if (typeof concertInfo.current !== 'undefined'){
    const now = new Date();
    concertInfo.current.forEach((performance: { start_date: string | number | Date; end_date: string | number | Date; playback_url: any; }) => {
      const startAt = new Date(performance.start_date);
      if(now < startAt) return;
      const endAt = new Date(performance.end_date);
      if(currentStream === lastStream?.playback_url && now >= new Date(lastStream?.end_date)) {
        setEndStream(true)
      }; 
      if(currentStream != performance?.playback_url && currentStream !== lastStream?.playback_url) {  
        setCurrentStream(performance?.playback_url)
      }
      
  })
  }
}, [tick])


useEffect(()=>{
  timerId.current = setInterval(() => setTick(!tick), 1000);
  return () => clearInterval(timerId.current);
}, [tick])
  return (
    <section className={styles.section}>
        <Button className={styles.backBtn} onClick={routerHandler}>Back</Button>
        <div className={styles.videoWrapper}>
        {endStream && <span className='text-2xl block mx-auto text-center'>Show is over</span>}
          {
            !isNaN(diffDays) && 
            <div className='text-center mt-4 absolute top-[20px] left-[45%]'>
              <span >Time before show</span>
              <p>{`${diffDays} days ${diffH.toString().padStart(2, '0')}:${diffM
              .toString()
              .padStart(2, '0')}:${diffS.toString().padStart(2, '0')}`}</p>
            </div>
          }
          {
            currentStream && endStream == false &&
            <Player currentStream={currentStream} />
          }
    </div>
    {show?.ads && typeof show?.ads[0]?.banner_url !== 'undefined' &&
     <Image className={styles.banner} src={show.ads[0].banner_url} width={1200} height={320} alt='Banner'/>}
    </section>

  )
}
