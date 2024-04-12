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
        onLoad={() => {
            player.current.play()
        }}
        onPlay={() => {
        // setCurrSrc(prev => "")
        // setCurrSrc(prev => currentStream)
        // player.current.width = 800
        console.log('play')
        // setCurrSrc(currentStream)
        // getStreamingInfo() 
    }}
    onPause={() => {
        console.log('pause')
        // setCurrSrc(currentStream)
        // getStreamingInfo() 
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