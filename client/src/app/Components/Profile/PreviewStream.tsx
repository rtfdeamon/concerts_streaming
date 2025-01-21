'use client'
import { useRef } from 'react';
import { IStreamingInfo } from '@/app/types/interfaces';
import '@vidstack/react/player/styles/base.css';
import styles from './PreviewStream.module.scss'
import { useToast } from '@/shadComponents/ui/use-toast';
import { ToastAction } from '@/shadComponents/ui/toast';
import Player from './Player';

export default function PreviewStream({streamStatus, steamingInfo}:{streamStatus: IStreamingInfo ,steamingInfo?: IStreamingInfo}) {
  const { toast } = useToast()
  //@ts-ignore
  const player = useRef<HTMLVideoElement>([])
  const toastHandler = () => {
    toast({
      description: "Playlist is loading. Please, wait",
      variant: 'destructive',
      action: (
        <ToastAction altText="Hide">Hide</ToastAction>
      ),
    })
  }


  return (
    <div className={styles.videoWrapper}>
      {steamingInfo?.playback_url && 
      <Player currentStream={steamingInfo?.playback_url} />
      }
        {/* <MediaPlayer
          ref={player}
          className={styles.video}
          autoPlay
          streamType="live"
          aspectRatio="16/9"
          crossOrigin
          load="idle"
          title="Sprite Fight"
          src={steamingInfo?.playback_url}>
            <Controls.Root className="data-[visible]:opacity-100 absolute inset-0 z-10 flex h-full w-full flex-col  transition-opacity pointer-events-none">
              <div className="flex-1" />
              <div className="flex-1" />
              <Controls.Group className={styles.bottomControls}>
                <div className={styles.muteWrapper}
                  onMouseEnter={() => setVolumeIsOpen(true)}
                  onMouseLeave={() => setVolumeIsOpen(false)}
                >
                  <MuteButton
                      className="group ring-sky-400 relative inline-flex mt- h-3 w-10 cursor-pointer items-center justify-center rounded-md outline-none ring-inset hover:bg-white/20 data-[focus]:ring-4">
                      <MuteIcon className="w-8 h-8 hidden group-data-[state='muted']:block" />
                      <VolumeLowIcon className="w-8 h-8 hidden group-data-[state='low']:block" />
                      <VolumeHighIcon className="w-8 h-8 hidden group-data-[state='high']:block" />
                    </MuteButton>
                    {volumeIsOpen && 
                      <VolumeSlider.Root 
                        className={"bg-white group ring-sky-400 relative inline-flex h-2 w-20 cursor-pointer items-center justify-center rounded-md outline-none ring-inset hover:bg-white/20 data-[focus]:ring-4"} ref={volumeRef}>
                      <VolumeSlider.Track className="vds-slider-track" />
                      <VolumeSlider.TrackFill className="vds-slider-track-fill vds-slider-track" />
                      <VolumeSlider.Preview className="vds-slider-preview">
                        <VolumeSlider.Value className="text-sm" />
                      </VolumeSlider.Preview>
                      <VolumeSlider.Thumb className="vds-slider-thumb" />
                    </VolumeSlider.Root>
                    }
                </div>
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
        </MediaPlayer> */}

    </div>
  )
}
