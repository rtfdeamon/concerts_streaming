import styles from './Loading.module.scss'

export default function Loading({isClient}:{isClient?: boolean}) {

  return (
    <div className={!isClient ? styles.loading : styles.clientLoading}>
         <div className={styles.ldsRing}><div></div><div></div><div></div><div></div></div>
    </div>
  )
}
