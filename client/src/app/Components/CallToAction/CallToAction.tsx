import { Button } from '@/shadComponents/ui/button'
import Link from 'next/link'
import Image from 'next/image'
import Circular from '../../../../public/Circular.svg'
import styles from './CallToAction.module.scss'

export default function CallToAction() {
  return (
    <section className={styles.section}>
            <div className={styles.spinner}>
                <Image src={Circular} width={200}  height={200} alt='circular' />
            </div>
            <div className={styles.content}>
                <h5>Big show</h5>
                <h6>The last days before the epic show</h6>
                <p>Don’t forget to search your artists or events and secure your ticket for your seat</p>
                <Link href={`${process.env.FRONTEND_URL}/scheduled`}>
                  <Button className={styles.btn}>Take a ticket</Button>
                </Link>
            </div>
    </section>
  )
}
