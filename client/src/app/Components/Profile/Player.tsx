import React, {useRef, useState, useEffect} from "react"
import ReactHlsPlayer from "react-hls-player"
import { getTokenForApi } from "@/app/utils/getTokenForApi"
import { IStreamingInfo } from "@/app/types/interfaces"
import { MediaPlayer, PIPButton } from "@vidstack/react"
import { MediaProvider } from "@vidstack/react"
import { VolumeSliderInstance } from "@vidstack/react"
import { useMediaState } from "@vidstack/react"
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

export default function Player({currentStream}:{currentStream: string}) {
    //@ts-ignore
    const player = useRef<MediaPlayerInstance>([])
    const [currSTR, setCurrStr] = useState('')
    const currSrc = useRef(currSTR)
    const [rerender, setRerender] = useState(false);
    const isActive = useMediaState('pictureInPicture', player);
    const [bufferingIsActive, setBufferingIsActive] = useState(false);
    const [volumeIsOpen, setVolumeIsOpen] = useState(false);
    const volumeRef = useRef<VolumeSliderInstance>(null);
    const forceUpdate = () => setRerender(!rerender);

    useEffect(() => {
      console.log('change', currentStream)
      // location.reload()
      currSrc.current = currentStream
      forceUpdate()
  }, [currentStream])

    async function getStreamingInfo() {
      const res = await fetch(`${process.env.BACKEND_URL}/streaming/info/`, {
          method: 'GET',
          headers: {
              'Authorization' : `Bearer ${await getTokenForApi()}`
          }
      })
      const data: IStreamingInfo = await res.json()
      console.log('playb', data.playback_url)
      setCurrStr(data.playback_url)
    }

  return (
  //     <ReactHlsPlayer
  //     playerRef={player}
  //     src={currSrc}
  //     autoPlay={true}
  //     onPlay={() => {
  //       // setCurrSrc(prev => "")
  //       // setCurrSrc(prev => currentStream)
  //       // player.current.width = 800
  //       console.log('play')
  //       setCurrSrc(currentStream)
  //       getStreamingInfo() 
  //   }}
  //   onPause={() => {
  //     console.log('pause')
  //     setCurrSrc(currentStream)
  //     getStreamingInfo() 
  //     // setCurrSrc(prev => "")
  //     // setCurrSrc(prev => currentStream)
  //     // setCurrSrc(prev => "")
  //     // setCurrSrc(prev => currentStream)
  //     // player.current.width = 800
  // }}
  //     controls
  //     hlsConfig={{ 
  //       maxLoadingDelay: 4,
  //       minAutoBitrate: 0,
  //       lowLatencyMode: true,
  //     }}
  //     // muted
  //     playsInline
  //     width="100%"
  //     height="auto"
  //   /> 
  <MediaPlayer
  ref={player}
  // className={styles.video}
  autoPlay
  muted
  streamType="live"
  aspectRatio="16/9"
  // onLoad={() => setBufferingIsActive(true)}
  controls={true}
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
  src={currSrc.current}>
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

  )
}
