import React, {useRef, useState} from "react"
import ReactHlsPlayer from "react-hls-player"

export default React.memo(function Player({currentStream}:{currentStream: string}) {
    //@ts-ignore
    const player = useRef<HTMLVideoElement>([])
    const [currSrc, setCurrSrc] = useState(currentStream)
    console.log(player)
  return (
      <ReactHlsPlayer
      playerRef={player}
      src={currSrc}
      autoPlay={true}
      onPlay={() => {
        setCurrSrc(prev => "")
        console.log(currSrc)
        setCurrSrc(prev => currentStream)
        console.log(currSrc)
    }}
    onPause={() => {
      setCurrSrc(prev => "")
      console.log(currSrc)
      setCurrSrc(prev => currentStream)
      console.log(currSrc)
  }}
      controls
      controlsList='volume'
      hlsConfig={{ 
        maxLoadingDelay: 400,
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