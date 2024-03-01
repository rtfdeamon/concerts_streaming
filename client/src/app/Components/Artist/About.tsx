'use client'
import styles from './Artist.module.scss'
export default function About({id, description, isCalendar}:{id:string, description: string | undefined, isCalendar: boolean}) {
  console.log(isCalendar);
  
  return (
    <div className={isCalendar ? styles.aboutHalf : styles.about }>
        <h6 className={styles.aboutTitle}>More about {id}</h6>
          <p className={styles.aboutDesc}>{description}</p>
    </div>
  )
}
