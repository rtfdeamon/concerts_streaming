'use client'
import { useState, useEffect, useRef } from 'react';
import ReactHlsPlayer from 'react-hls-player';
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
import { IStreamingInfo } from '@/app/types/interfaces';
import { getTokenForApi } from '@/app/utils/getTokenForApi';
import Loading from '../.././../../public/images.png'
import '@vidstack/react/player/styles/base.css';
import styles from './PreviewStream.module.scss'

export default function PreviewStream({streamStatus, steamingInfo}:{streamStatus: IStreamingInfo ,steamingInfo?: IStreamingInfo}) {
  const player = useRef<MediaPlayerInstance>(null)
  const isActive = useMediaState('pictureInPicture', player)
  const [volumeIsOpen, setVolumeIsOpen] = useState(false)
  const volumeRef = useRef<VolumeSliderInstance>(null)

  return (
    <div className={styles.videoWrapper}>
      {steamingInfo?.playback_url && 
      <ReactHlsPlayer
        src={steamingInfo?.playback_url}
        autoPlay={true}
        // muted
        playsInline
        width="100%"
        height="auto"
      />  
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
