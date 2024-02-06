'use client'
import { MediaPlayer, MediaProvider } from '@vidstack/react';
import { Poster, type PosterProps } from '@vidstack/react';
import { Controls } from '@vidstack/react';
import { LiveButton } from '@vidstack/react';
import { PlayButton } from '@vidstack/react';
import { PauseIcon, PlayIcon } from '@vidstack/react/icons';
import { MuteButton } from '@vidstack/react';
import { MuteIcon, VolumeHighIcon, VolumeLowIcon } from '@vidstack/react/icons';
import { FullscreenButton } from '@vidstack/react';
import { FullscreenExitIcon, FullscreenIcon } from '@vidstack/react/icons';
import '@vidstack/react/player/styles/base.css';


export default function Stream() {
  return (
    <MediaPlayer
      title="Sprite Fight"
      src="https://stream.mux.com/VZtzUzGRv02OhRnZCxcNg49OilvolTqdnFLEqBsTwaxU.m3u8">
      <Poster
        className="absolute inset-0 block h-[300px] w-[500px] rounded-md opacity-0 transition-opacity data-[visible]:opacity-100 [&>img]:h-full [&>img]:w-full [&>img]:object-cover"
        src="https://media-files.vidstack.io/sprite-fight/poster.webp"
        alt="Girl walks into campfire with gnomes surrounding her friend ready for their next meal!"
      />
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
            Center Controls Group
          </Controls.Group>
          <div className="flex-1" />
          <Controls.Group className="pointer-events-auto w-full flex items-center px-2">  
              <MuteButton className="group ring-sky-400 relative inline-flex h-10 w-10 cursor-pointer items-center justify-center rounded-md outline-none ring-inset hover:bg-white/20 data-[focus]:ring-4">
                <MuteIcon className="w-8 h-8 hidden group-data-[state='muted']:block" />
                <VolumeLowIcon className="w-8 h-8 hidden group-data-[state='low']:block" />
                <VolumeHighIcon className="w-8 h-8 hidden group-data-[state='high']:block" />
              </MuteButton>
              <PlayButton className="group ring-sky-400 relative inline-flex h-10 w-10 cursor-pointer items-center justify-center rounded-md outline-none ring-inset hover:bg-white/20 data-[focus]:ring-4">
                <PlayIcon className="w-8 h-8 hidden group-data-[paused]:block" />
                <PauseIcon className="w-8 h-8 group-data-[paused]:hidden" />
              </PlayButton>
              <FullscreenButton className="group ring-sky-400 relative inline-flex h-10 w-10 cursor-pointer items-center justify-center rounded-md outline-none ring-inset hover:bg-white/20 data-[focus]:ring-4 aria-hidden:hidden">
                <FullscreenIcon className="w-8 h-8 group-data-[active]:hidden" />
                <FullscreenExitIcon className="w-8 h-8 hidden group-data-[active]:block" />
              </FullscreenButton>
          </Controls.Group>
        </Controls.Root>
      <MediaProvider />
    </MediaPlayer>
  )
}
