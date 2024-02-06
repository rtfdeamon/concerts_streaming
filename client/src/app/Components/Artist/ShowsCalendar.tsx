'use client'
import { useState } from "react"
import { Button } from "@/shadComponents/ui/button"
import Link from "next/link"
import styles from './Artist.module.scss'

export default function ShowsCalendar() {
    const [isOpen, setIsOpen] = useState(false);
    const onOpenHandler = () => {
        setIsOpen(!isOpen)
    }
    return (
    <ul className={!isOpen ? styles.upcomingShowsWrapper : styles.upcomingShowsWrapperActive}>
    <li className={styles.upcomingShows}>
        <p className={styles.upcomingDate}>10.10.2024</p>
        <p className={styles.upcomingDesc}>descdescdesc</p>
        <Link href={`/shows/$showID`}>
            <Button className={styles.btn}>Go to the show</Button>
        </Link>
    </li>
    <li className={styles.upcomingShows}>
        <p className={styles.upcomingDate}>10.10.2024</p>
        <p className={styles.upcomingDesc}>descdescdesc</p>
        <Link href={`/shows/$showID`}>
            <Button className={styles.btn}>Go to the show</Button>
        </Link>
    </li>
    <li className={styles.upcomingShows}>
        <p className={styles.upcomingDate}>10.10.2024</p>
        <p className={styles.upcomingDesc}>descdescdesc</p>
        <Link href={`/shows/$showID`}>
            <Button className={styles.btn}>Go to the show</Button>
        </Link>
    </li>
    <li className={styles.upcomingShows}>
        <p className={styles.upcomingDate}>10.10.2024</p>
        <p className={styles.upcomingDesc}>descdescdesc</p>
        <Link href={`/shows/$showID`}>
            <Button className={styles.btn}>Go to the show</Button>
        </Link>
    </li>
    <li className={styles.upcomingShows}>
        <p className={styles.upcomingDate}>10.10.2024</p>
        <p className={styles.upcomingDesc}>descdescdesc</p>
        <Link href={`/shows/$showID`}>
            <Button className={styles.btn}>Go to the show</Button>
        </Link>
    </li>
    <li className={styles.upcomingShows}>
        <p className={styles.upcomingDate}>10.10.2024</p>
        <p className={styles.upcomingDesc}>descdescdesc</p>
        <Link href={`/shows/$showID`}>
            <Button className={styles.btn}>Go to the show</Button>
        </Link>
    </li>
    <li className={styles.upcomingShows}>
        <p className={styles.upcomingDate}>10.10.2024</p>
        <p className={styles.upcomingDesc}>descdescdesc</p>
        <Link href={`/shows/$showID`}>
            <Button className={styles.btn}>Go to the show</Button>
        </Link>
    </li>
    <li className={styles.upcomingShows}>
        <p className={styles.upcomingDate}>10.10.2024</p>
        <p className={styles.upcomingDesc}>descdescdesc</p>
        <Link href={`/shows/$showID`}>
            <Button className={styles.btn}>Go to the show</Button>
        </Link>
    </li>
    <span
    onClick={onOpenHandler}
    className={styles.more}
    >show more</span>
</ul>
  )
}
