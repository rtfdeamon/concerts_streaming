'use client'
import styles from './Artist.module.scss'
export default function About({id}:{id:string}) {
  return (
    <div className={styles.about}>
        <h6 className={styles.aboutTitle}>More about {id}</h6>
        <p className={styles.aboutDesc}>DescDescDescDescDescDescDescDescDescDescDescDescDescDescDescDescDescDescDescDescDescDescDescDescDescDescDescDescDescDescDescDescDescDescDescDescDescDescDescDescDescDescDescDescDescDescDescDescDescDescDescDescDescDescDescDescDescDescDescDescDescDescDescDescDescDescDescDescDescDesc</p>
    </div>
  )
}
