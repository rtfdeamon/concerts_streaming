import React, {useEffect, useRef, useState} from "react"
import ReactHlsPlayer from "react-hls-player"
import { MediaPlayer, MediaProvider, useMediaState,
    useMediaStore, } from "@vidstack/react"

export default React.memo(function Player({currentStream}:{currentStream: string}) {
    //@ts-ignore
    const player = useRef<MediaPlayerInstance>([])
    const currSrc= useRef(currentStream)
    const [rerender, setRerender] = useState(false);
    const forceUpdate = () => setRerender(!rerender);

    useEffect(() => {
        console.log('change', currentStream)
        // location.reload()
        currSrc.current = currentStream
        forceUpdate()
    }, [currentStream])
    useEffect(() => {
      // currSrc !== currentStream && location.reload()
    }, [currentStream, currSrc])
  return (
    <>

     {/* <ReactHlsPlayer
        playerRef={player}
        src={currentStream}
        autoPlay={true}
        onLoadedData={() => {
          player.current.play()
        }}
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
    />  */}
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

    <MediaProvider />
  </MediaPlayer>
    </>
    )
})