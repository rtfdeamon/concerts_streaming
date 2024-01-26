import Link from 'next/link'
import styles from './Shows.module.scss'

export default function Shows() {
  return (
    <section className={styles.section}>
        <h2 className={styles.sectionTitle}>
            Choose by your pleasures
        </h2>
        <span className={styles.subtitle}>Find a concert by your genre, artist or date</span>
        <div className={styles.concertCategories}>
            <Link href={'/live'}>Live concerts</Link>
            <Link href={'/schedule'}>Scheduled concerts</Link>
        </div>
        <div className={styles.genres}>
            <Link href={'/live'}>Country</Link>
            <Link href={'/live'}>Electronic</Link>
            <Link href={'/live'}>Funk</Link>
            <Link href={'/live'}>Hip hop</Link>
            <Link href={'/live'}>Jazz</Link>
            <Link href={'/live'}>Latin</Link>
            <Link href={'/live'}>Pop</Link>
            <Link href={'/live'}>Punk</Link>
            <Link href={'/live'}>Rock</Link>
            <Link href={'/live'}>Metal</Link>
            <Link href={'/live'}>R&B</Link>
            <Link href={'/live'}>Alternative</Link>
            <Link href={'/live'}>Blues</Link>
            <Link href={'/live'}>Classical</Link>
            <Link href={'/live'}>Indie</Link>
            <Link href={'/live'}>Other</Link>
        </div>
        <div className={styles.artists}>
            <Link href={'/artists'}>All artists</Link>
            <Link href={'/followed'}>Followed artists</Link>
        </div>
    </section>
  )
}
