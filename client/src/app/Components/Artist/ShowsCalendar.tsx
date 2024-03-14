'use client'
import { useState } from "react"
import Link from "next/link"
import styles from './Artist.module.scss'
import { IEvent } from "@/app/types/interfaces"

export default function ShowsCalendar({concerts, isAbout}: {concerts: IEvent[], isAbout: boolean}) {
    const [isOpen, setIsOpen] = useState(false);
    const onOpenHandler = () => {
        setIsOpen(!isOpen)
    }
    return (
        <ul
            className={!isOpen ? styles.upcomingShowsWrapper : styles.upcomingShowsWrapperActive}
            style={isAbout ? {width: '48%'} : {width: '100%'}}
        >
            {concerts.map(c => (
                    <li key={c.id} className={styles.upcomingShows}>
                        <p className={styles.upcomingDate}>{new Date(c.date).toLocaleString()}</p>
                        <p className={styles.upcomingDesc}>{c.description}</p>
                        <Link href={`/shows/$showID`}>
                            <Link href={`${process.env.FRONTEND_URL}/preview/${c.id}`} className={styles.btn}>Go to the show</Link>
                        </Link>
                    </li>
            ))}
            {
                concerts.length > 5 && 
                <span
                onClick={onOpenHandler}
                className={styles.more}
                >show more</span>
            }
        </ul>
  )
}
