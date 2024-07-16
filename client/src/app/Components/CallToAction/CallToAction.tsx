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
                <h6>Don’t miss the next epic show!</h6>
                <p>Registration is easy, simple, and free for viewers and listeners. Sign up and get your seat for the next epic show.  Wide variety of artists so you can choose 1, 2 or more. Thinking you want to perform at a live event? Simply sign up as an artist and follow the process. Thanks for visiting <Link className='text-blue-400 hover:text-blue-500 transition-all duration-500'
                target="_blank"
                href={'dp-ent.com'}
                >
                  dp-ent.com
                </Link>
                  – <span className='font-bold italic'>“Because you deserve it…”</span></p>
                <Link href={`${process.env.FRONTEND_URL}/scheduled`}>
                  <Button className={styles.btn}>Take a ticket</Button>
                </Link>
            </div>
    </section>
  )
}
