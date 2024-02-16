import styles from './Loading.module.scss'

export default function Loading() {

  return (
    <div className={styles.loading}>
         <div className={styles.ldsRing}><div></div><div></div><div></div><div></div></div>
    </div>
  )
}
