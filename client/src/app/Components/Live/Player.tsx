import React, {useEffect, useRef, useState} from "react"
import { Poster, type PosterProps } from '@vidstack/react';
import { MediaPlayer, MediaProvider, PIPButton, useMediaState,
  useMediaStore, type PIPButtonProps, VolumeSliderInstance } from "@vidstack/react";
import { Controls } from '@vidstack/react';
import { LiveButton } from '@vidstack/react';
import { PlayButton } from '@vidstack/react';
import { PauseIcon, PlayIcon, PictureInPictureExitIcon, PictureInPictureIcon } from '@vidstack/react/icons';
import { MuteButton } from '@vidstack/react';
import { MuteIcon, VolumeHighIcon, VolumeLowIcon } from '@vidstack/react/icons';
import { VolumeSlider } from '@vidstack/react';
import { FullscreenButton } from '@vidstack/react';
import { FullscreenExitIcon, FullscreenIcon } from '@vidstack/react/icons';
import { MediaPlayerInstance } from '@vidstack/react';
import styles from './Player.module.scss'

export default React.memo(function Player({currentStream}:{currentStream: string}) {
    //@ts-ignore
    const player = useRef<MediaPlayerInstance>([])
    const currSrc= useRef(currentStream)
    const [rerender, setRerender] = useState(false);
    const isActive = useMediaState('pictureInPicture', player);
    const [bufferingIsActive, setBufferingIsActive] = useState(false);
    const [volumeIsOpen, setVolumeIsOpen] = useState(false);
    const volumeRef = useRef<VolumeSliderInstance>(null);
    const forceUpdate = () => setRerender(!rerender);

    useEffect(() => {
        // location.reload()
        currSrc.current = currentStream
        forceUpdate()
    }, [currentStream])
    useEffect(() => {
      // currSrc !== currentStream && location.reload()
    }, [currentStream, currSrc])
  return (
    <>
    <MediaPlayer
    ref={player}
    className={styles.video}
    autoPlay
    streamType="live"
    aspectRatio="16/9"
    // onLoad={() => setBufferingIsActive(true)}
    controls={false}
    onError={() => {
      // location.reload()
      currSrc.current = ''
      currSrc.current = currentStream
      forceUpdate()
    }}
    onHlsError={(err) => {
      currSrc.current = currentStream
      currSrc.current = ''
      currSrc.current = currentStream
      forceUpdate()
          // player.current.play()
          // player.current.refresh()
          // console.log('err', err)
          // if (err.details ==  'manifestLoadError'){
          //   location.reload()
          // }
          // location.reload()

    }}
    crossOrigin
    load="idle"
    posterLoad="idle"
    title="Sprite Fight"
    volume={0.7}
    src={currSrc.current}
    // src={'https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8'}
    >
    {/* <Poster
      className={styles.poster}
      src={show?.poster_url}
      alt="Girl walks into campfire with gnomes surrounding her friend ready for their next meal!"
    /> */}
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
                   </Controls.Group>
                  <div className="flex-1" />
                   <Controls.Group className="absolute bottom-[-40px] pointer-events-auto w-full flex justify-center items-baseline px-2 bg-gray-300">
                     <div className="flex items-center"
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
                      {/* <PlayButton className="group ring-sky-400 relative inline-flex h-10 w-10 cursor-pointer items-center justify-center rounded-md outline-none ring-inset hover:bg-white/20 data-[focus]:ring-4 mr-4">
                        <PlayIcon className="w-8 h-8 hidden group-data-[paused]:block" />
                        <PauseIcon className="w-8 h-8 group-data-[paused]:hidden" />
                      </PlayButton> */}
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
    </>
    )
})