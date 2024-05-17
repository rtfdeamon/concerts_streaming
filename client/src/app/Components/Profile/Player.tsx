import React, {useRef, useState} from "react"
import ReactHlsPlayer from "react-hls-player"
import { getTokenForApi } from "@/app/utils/getTokenForApi"
import { IStreamingInfo } from "@/app/types/interfaces"

export default function Player({currentStream}:{currentStream: string}) {
    //@ts-ignore
    const player = useRef<HTMLVideoElement>([])
    const [currSTR, setCurrStr] = useState('')
    const [currSrc, setCurrSrc] = useState(currSTR)
    async function getStreamingInfo() {
      const res = await fetch(`${process.env.BACKEND_URL}/streaming/info/`, {
          method: 'GET',
          headers: {
              'Authorization' : `Bearer ${await getTokenForApi()}`
          }
      })
      const data: IStreamingInfo = await res.json()
      setCurrStr(data.playback_url)
    }

  return (
      <ReactHlsPlayer
      playerRef={player}
      src={currSrc === '' ? currentStream : currSrc}  
      autoPlay
      onPlay={() => {
        setCurrSrc(currentStream)
        getStreamingInfo() 
    }}
    onPause={() => {
      setCurrSrc(currentStream)
      getStreamingInfo() 
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
