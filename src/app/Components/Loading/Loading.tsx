"use client"
import { useState, useEffect }from "react"
import { Progress } from "@radix-ui/react-progress"

import styles from './Loading.module.scss'

export default function Loading() {
 const [progress, setProgress] = useState(13)
 useEffect(() => {
    const timer = setTimeout(() => setProgress(66), 500)
    return () => clearTimeout(timer)
 }, [])
  return (
    <div className={styles.loading}>
         <Progress value={progress} />
    </div>
  )
}
