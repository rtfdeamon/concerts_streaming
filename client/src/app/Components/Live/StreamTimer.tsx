import React from 'react'
import { useRef, useState, useEffect } from 'react';
import { IShow } from '@/app/types/interfaces';

export default function StreamTimer({show}:{show:IShow}) {
    const timeDiff = useRef<String>('')
    const [[diffDays, diffH, diffM, diffS], setDiff] = useState([0, 0, 0, 0]);
    const [tick, setTick] = useState(false);
    const timerId = useRef<NodeJS.Timeout>()

    if (show){
        const showTime = new Date(show?.date as string);
        const DateNow = new Date();
        timeDiff.current = String(Math.abs(showTime.getTime() - DateNow.getTime()));
        // console.log(new Date(+timeDiff.current).toUTCString())
      }

    useEffect(() => {
        const timerID = setInterval(() => setTick(!tick), 1000);
        return () => clearInterval(timerID);
      }, [tick])
    useEffect(()=> {
        const showTime = new Date(show?.date as string);
        const finishTime = showTime.getTime() / 1000
        const diff = (finishTime - new Date().getTime() / 1000)
        if (diff < 0) {
          setDiff([
              NaN,
              NaN,
              NaN,
              NaN
          ])
          return
        }
        setDiff([
          Math.floor(diff / 86400), 
          Math.floor((diff / 3600) % 24), 
          Math.floor((diff / 60) % 60), 
          Math.floor(diff % 60)
        ]) 
    }, [tick])

  return (
    <div>
        {
            !isNaN(diffDays) && 
            <div className='text-center mt-4 absolute top-[20px] left-[45%]'>
                <span >Time before show</span>
                <p>{`${diffDays} days ${diffH.toString().padStart(2, '0')}:${diffM
                .toString()
                .padStart(2, '0')}:${diffS.toString().padStart(2, '0')}`}</p>
            </div>
        }
    </div>
  )
}
