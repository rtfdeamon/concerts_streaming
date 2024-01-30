
import { Button } from '@/shadComponents/ui/button'
import Image from 'next/image'
import Link from 'next/link'
// import BannerImg from '../../../../public/banner.jpg'
import styles from './Banner.module.scss'

export default function Banner() {
  return (
    <section className={styles.section}>
        <div className={styles.promo}>
            <h1>Enjoy your favourite musicians shows!</h1>
            <Button className={styles.btn}>Look for shows</Button>
        </div>
    </section>
  )
}
