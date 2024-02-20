
import { Button } from '@/shadComponents/ui/button'
import Link from 'next/link'
import styles from './Banner.module.scss'

export default function Banner() {
  return (
    <section className={styles.section}>
        <div className={styles.promo}>
            <h1>Enjoy your favourite musicians shows!</h1>
            <Link href={`${process.env.FRONTEND_URL}/events/month`}>
              <Button className={styles.btn}>Look for shows</Button>            
            </Link>
        </div>
    </section>
  )
}
