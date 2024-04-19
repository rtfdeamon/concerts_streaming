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
    const player = useRef<HTMLVideoElement>([])
    const [currSTR, setCurrStr] = useState('')
    const currSrc = useRef(currSTR)
    const [rerender, setRerender] = useState(false);
    // const isActive = useMediaState('pictureInPicture', player);
    // const [bufferingIsActive, setBufferingIsActive] = useState(false);
    // const [volumeIsOpen, setVolumeIsOpen] = useState(false);
    // const volumeRef = useRef<VolumeSliderInstance>(null);
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
      <ReactHlsPlayer
      playerRef={player}
      src={currSrc.current}
      autoPlay={true}
      onPlay={() => {
        // setCurrSrc(prev => "")
        // setCurrSrc(prev => currentStream)
        // player.current.width = 800
        console.log('play')
        setCurrStr(currentStream)
        getStreamingInfo() 
    }}
    onPause={() => {
      console.log('pause')
      setCurrStr(currentStream)
      getStreamingInfo() 
      // setCurrSrc(prev => "")
      // setCurrSrc(prev => currentStream)
      // setCurrSrc(prev => "")
      // setCurrSrc(prev => currentStream)
      // player.current.width = 800
  }}
      controls
      hlsConfig={{ 
        maxLoadingDelay: 4,
        minAutoBitrate: 0,
        lowLatencyMode: true,
      }}
      // muted
      playsInline
      width="100%"
      height="auto"
    /> 
  )
}
