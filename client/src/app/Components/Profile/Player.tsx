import React, {useRef, useState} from "react"
import ReactHlsPlayer from "react-hls-player"
import { getTokenForApi } from "@/app/utils/getTokenForApi"
import { IStreamingInfo } from "@/app/types/interfaces"

export default React.memo(function Player({currentStream}:{currentStream: string}) {
    //@ts-ignore
    const player = useRef<HTMLVideoElement>([])
    const [currSTR, setCurrStr] = useState('')
    const [currSrc, setCurrSrc] = useState(currSTR)
    console.log('re-render')
    console.log(player)
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
      src={currSrc}
      autoPlay={true}
      onPlay={() => {
        // setCurrSrc(prev => "")
        // setCurrSrc(prev => currentStream)
        // player.current.width = 800
        console.log('play')
        setCurrSrc(currentStream)
        getStreamingInfo() 
    }}
    onPause={() => {
      console.log('pause')
      setCurrSrc(currentStream)
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
})
