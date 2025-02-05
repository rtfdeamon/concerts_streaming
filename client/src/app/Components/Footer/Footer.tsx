import Logo from '@/app/Ui/Logo/Logo'
import Link from 'next/link'
import styles from './Footer.module.scss'

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.links}>
        {/* <Link href={'/about'} className={styles.link}>About us</Link> */}
        <Link href={'/privacy'} className={styles.link}>Privacy policy</Link>
        <Link href={'/terms'} className={styles.link}>Terms of use</Link>
        <Link href={'/refund'} className={styles.link}>Cancel/Refund policy</Link>
      </div>
      <div className={styles.logoWrapper}>
        <Logo variant='dark'/>
        <span className={styles.copyright}>Digital Platform Entertainment, Copyright 2024</span>
      </div>
    </footer>
  )
}
