'use client'
import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { getTokenForApi } from '@/app/utils/getTokenForApi';
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

export default function Stream({id, concertInfo}: {id: string, concertInfo: any}) {
  const router = useRouter();
  const [show, setShow] = useState<IShow | undefined>();
  const player = useRef<MediaPlayerInstance>(null);
  const isActive = useMediaState('pictureInPicture', player);
  const [bufferingIsActive, setBufferingIsActive] = useState(false);
  const [volumeIsOpen, setVolumeIsOpen] = useState(false);
  const volumeRef = useRef<VolumeSliderInstance>(null);
  const timeDiff = useRef<String>('')
  const routerHandler = () => {
    router.back();
  }

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
    console.log(show)

  }, [show])
if (show){
  const showTime = new Date(show?.date as string);
  const DateNow = new Date();
  timeDiff.current = String(Math.abs(showTime.getTime() - DateNow.getTime()));
  console.log(showTime, DateNow)
}
  return (
    <section className={styles.section}>
        <Button className={styles.backBtn} onClick={routerHandler}>Back</Button>
        <div className={styles.videoWrapper}>
          <span className='text-center mt-4 block mx-auto'>
            Time to show: {timeDiff.current}
          </span>
        <MediaPlayer
          ref={player}
          className={styles.video}
          autoPlay
          streamType="live"
          aspectRatio="16/9"
          onLoad={() => setBufferingIsActive(true)}
          crossOrigin
          load="idle"
          posterLoad="idle"
          title="Sprite Fight"
          src={concertInfo ? concertInfo.playback_url : ''}>
          <Poster
            className={styles.poster}
            src={show?.poster_url}
            alt="Girl walks into campfire with gnomes surrounding her friend ready for their next meal!"
          />
            <Controls.Root className="data-[visible]:opacity-100 absolute inset-0 z-10 flex h-full w-full flex-col bg-gradient-to-t from-black/10 to-transparent opacity-0 transition-opacity pointer-events-none">
              <Controls.Group className="pointer-events-auto w-full flex items-center px-2">
                  <LiveButton className="w-10 h-10 flex items-center justify-center cursor-pointer group">
                    <span className="bg-gray-300 rounded-sm text-gray-950 text-xs font-semibold py-px px-1 group-data-[edge]:bg-red-600 group-data-[edge]:text-white group-data-[focus]:ring-4 ring-sky-400 tracking-wider">
                      LIVE
                    </span>
                  </LiveButton>
              </Controls.Group>
              <div className="flex-1" />
              <Controls.Group className="pointer-events-auto w-full flex items-center px-2">
                {bufferingIsActive && <BufferingSpinner />}
              </Controls.Group>
              <div className="flex-1" />
              <Controls.Group className={styles.bottomControls}>
                <div className={styles.muteWrapper}
                  onMouseEnter={() => setVolumeIsOpen(true)}
                  onMouseLeave={() => setVolumeIsOpen(false)}
                >
                  <MuteButton
                      className="group ring-sky-400 relative inline-flex h-3 w-10 cursor-pointer items-center justify-center rounded-md outline-none ring-inset hover:bg-white/20 data-[focus]:ring-4">
                      <MuteIcon className="w-8 h-8 hidden group-data-[state='muted']:block" />
                      <VolumeLowIcon className="w-8 h-8 hidden group-data-[state='low']:block" />
                      <VolumeHighIcon className="w-8 h-8 hidden group-data-[state='high']:block" />
                    </MuteButton>
                    {volumeIsOpen && 
                      <VolumeSlider.Root 
                        className={"block bg-white group ring-sky-400 relative my-3 h-2 w-20 cursor-pointer items-center justify-center rounded-md outline-none ring-inset hover:bg-white/20 data-[focus]:ring-4"} ref={volumeRef}>
                      <VolumeSlider.Track className="vds-slider-track" />
                      <VolumeSlider.TrackFill className="vds-slider-track-fill vds-slider-track h-2" />
                      <VolumeSlider.Preview className="vds-slider-preview">
                        <VolumeSlider.Value className="text-sm" />
                      </VolumeSlider.Preview>
                      <VolumeSlider.Thumb className="vds-slider-thumb" />
                    </VolumeSlider.Root>
                    }
                </div>
                  <PlayButton className="group ring-sky-400 relative inline-flex h-10 w-10 cursor-pointer items-center justify-center rounded-md outline-none ring-inset hover:bg-white/20 data-[focus]:ring-4 mr-4">
                    <PlayIcon className="w-8 h-8 hidden group-data-[paused]:block" />
                    <PauseIcon className="w-8 h-8 group-data-[paused]:hidden" />
                  </PlayButton>
                  <FullscreenButton className="group ring-sky-400 relative inline-flex h-10 w-10 cursor-pointer items-center justify-center rounded-md outline-none ring-inset hover:bg-white/20 data-[focus]:ring-4 aria-hidden:hidden">
                    <FullscreenIcon className="w-8 h-8 group-data-[active]:hidden" />
                    <FullscreenExitIcon className="w-8 h-8 hidden group-data-[active]:block" />
                  </FullscreenButton>
                  <PIPButton>
                    {!isActive ? <PictureInPictureIcon /> : <PictureInPictureExitIcon />}
                  </PIPButton>  
              </Controls.Group>
            </Controls.Root>
          <MediaProvider />
        </MediaPlayer>
    </div>
    {show?.ads && typeof show?.ads[0]?.banner_url !== 'undefined' &&
     <Image className={styles.banner} src={show.ads[0].banner_url} width={1200} height={320} alt='Banner'/>}
    </section>

  )
}
