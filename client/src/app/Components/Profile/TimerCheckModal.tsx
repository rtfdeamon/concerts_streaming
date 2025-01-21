import { useRef, useState, useEffect } from "react";

export default function TimerCheckModal({startDate}: {startDate: any}) {
    const intervalId = useRef<NodeJS.Timeout>()
    const [tick, setTick] = useState(false);
    const timerId = useRef<NodeJS.Timeout>()
    const [[diffDays, diffH, diffM, diffS], setDiff] = useState([0, 0, 0, 0]);
    useEffect(() => {
        const timerID = setInterval(() => setTick(!tick), 1000)
        // getStreamStatus()
        return () => clearInterval(timerID)
      }, [tick])
      useEffect(()=> {
        const showTime = new Date(startDate.current as string).getTime() / 1000
        const finishTime = new Date().getTime() / 1000
        const diff = (showTime - finishTime)
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
}, [tick, startDate])
  return (
                <div className="mt-4">
                {
                    !isNaN(diffDays) && 
                    <div className='text-center mt-4 top-[20px] w-full'>
                    <span >Time before show</span>
                    <p>{`${diffDays} days ${diffH.toString().padStart(2, '0')}:${diffM
                    .toString()
                    .padStart(2, '0')}:${diffS.toString().padStart(2, '0')}`}</p>
                    </div>
                }
                </div>
  )
}
