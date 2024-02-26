
'use client'
import { RefreshTokens } from '@/app/utils/refreshToken'
import { checkAccessToken } from '@/app/utils/checkAccessToken'
import { Button } from '@/shadComponents/ui/button'
import Link from 'next/link'
import styles from './Banner.module.scss'

export default function Banner() {
  // let accessToken = localStorage.getItem('accessToken')?.split('') as Array<string>;
  // accessToken?.pop();
  // accessToken?.shift();
  // let refreshToken: string | Array<string> = localStorage.getItem('refreshToken')?.split('') as Array<string>
  // refreshToken?.pop();
  // refreshToken?.shift();
  // refreshToken = refreshToken.join('');
  // RefreshTokens(accessToken.join(''), refreshToken)
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
