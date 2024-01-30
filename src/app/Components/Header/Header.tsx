import Logo from '../../Ui/Logo/Logo'
import SearchInput from '@/app/Ui/SearchInput/SearchInput'
import RegionSelector from './RegionSelector/RegionSelector'
import ProfileDropdown from './ProfileDropdown/ProfileDropdown'
import ThemeSwitcher from './ThemeSwitcher.tsx/ThemeSwitcher'
import styles from './Header.module.scss'
import Link from 'next/link'

export default function Header() {
  const authed = false;
  return (
    <header className={styles.header}>
        <div className={styles.wrapper}>
            <Logo variant='light' />
            <SearchInput placeholder='Search for some artists or concerts' variant='header'/>
        </div>
        <div className={styles.profileWrapper}>
          {
              authed ? 
              <ProfileDropdown />
              :
              <>
                <Link className={styles.link} href={'/signin'}>Sign in</Link>
                <Link className={styles.link} href={'/signup'}>Sign up</Link>
              </>
            }
            <ThemeSwitcher />
        </div>
        {/* <RegionSelector /> */}
    </header>
  )
}
