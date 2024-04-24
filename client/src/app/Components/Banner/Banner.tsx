import { Button } from '@/shadComponents/ui/button'
import Link from 'next/link'
import styles from './Banner.module.scss'
import Loading from '../Loading/Loading'

export default function Banner() {
  return (
    <section className={styles.section}>
        <div className={styles.promo}>
            <h1>Enjoy your favorite musicians or artists!</h1>
            <span>Come be a part of the community</span>
            <Link href={`${process.env.FRONTEND_URL}/events/month`}>
              <Button className={styles.btn}>Look for shows</Button>            
            </Link>
        </div>
    </section>
  )
}
