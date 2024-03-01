
'use client'
import { useRouter } from 'next/navigation'
import { useAppDispatch } from '@/app/hooks/rtkHooks'
import { changeMenuOption } from '@/app/store/admin/adminMenu-slice'
import Logo from '@/app/Ui/Logo/Logo'
import Image from 'next/image'
import ChevronLeft from '../../../../../public/chevron-left.svg'
import styles from './Navbar.module.scss'

export default function Navbar() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  return (
    <div className={styles.Navbar}>
      <div className={styles.logoWrapper}>
        <Logo variant='light' />
      </div>
      <div className={styles.prevBtn} onClick={() => router.back()}>
        <Image className={styles.prevImage} src={ChevronLeft} width={30} height={30}  alt='ChevronLeft'/>
        Back
      </div>
      <ul className={styles.nav}>
        <li
          onClick={() => dispatch(changeMenuOption('events'))}
          className={styles.navEl}>Create an event</li>
        <li
          onClick={() => dispatch(changeMenuOption('scheduled'))}
          className={styles.navEl}>Scheduled events</li>
        <li
          onClick={() => dispatch(changeMenuOption('requests'))}
          className={styles.navEl}>Artists requests</li>
        <li
          onClick={() => dispatch(changeMenuOption('sponsors'))}
          className={styles.navEl}>Sponsors requests</li>
      </ul>
    </div>
  )
}
