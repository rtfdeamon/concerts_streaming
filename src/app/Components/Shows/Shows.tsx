import styles from './Shows.module.scss'

export default function Shows() {
  return (
    <section className={styles.section}>
        <h2 className={styles.sectionTitle}>
            Choose by your pleasures
        </h2>
        <span className={styles.subtitle}>Find a concert by your genre, artist or date</span>
        <div className={styles.concertCategories}>
            <span>Live concerts</span>
            <span>Scheduled concerts</span>
        </div>
        <div className={styles.genres}>
            <span>Country</span>
            <span>Electronic</span>
            <span>Funk</span>
            <span>Hip hop</span>
            <span>Jazz</span>
            <span>Latin</span>
            <span>Pop</span>
            <span>Punk</span>
            <span>Rock</span>
            <span>Metal</span>
            <span>R&B</span>
        </div>
        <div className={styles.artists}>
            <span>All artists</span>
            <span>Followed artists</span>
        </div>
    </section>
  )
}
