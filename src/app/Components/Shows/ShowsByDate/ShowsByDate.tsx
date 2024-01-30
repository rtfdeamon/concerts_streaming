import Image from 'next/image'
import Link from 'next/link'
import { IShows } from '../Shows'
import CalendarIcon from '../../../../../public/calendar-range.svg'
import Show from '../../../../../public/show.jpg'
import styles from './ShowsByDate.module.scss'

export default function ShowsByDate({shows}:IShows) {
  return (
    <div className={styles.shows}>
      {shows.map((s, i) => (
        <Link className={styles.wrapper} href={`/shows/${s.title}`} key={i}>
          <h5 className={styles.title}>{s.title}</h5>
          <span className={styles.place}>{s.place}</span>
            <Image className={styles.img} src={Show} width={300} height={75}  alt={s.title}/>
          <span className={styles.date}>
            <Image src={CalendarIcon} width={30} height={20} alt={s.title}/>
            {s.date}
          </span>
        </Link>
      ))}
    </div>
  )
}
