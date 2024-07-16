import Image from 'next/image'
import LogoWithoutText from '../../../../public/LogoWihoutText.png'
import styles from './Loading.module.scss'

export default function Loading({isClient}:{isClient?: boolean}) {

  return (
    <div className={!isClient ? styles.loading : styles.clientLoading}>
         <div className={styles.ldsRing}><div>
            <Image src={LogoWithoutText} width={80} height={80} alt="logo"/>
          </div></div>
    </div>
  )
}
