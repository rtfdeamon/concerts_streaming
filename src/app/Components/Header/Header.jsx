import Logo from '../../Ui/Logo/Logo'
import SearchInput from '@/app/Ui/SearchInput/SearchInput'
import RegionSelector from './RegionSelector/RegionSelector'
import ProfileDropdown from './ProfileDropdown/ProfileDropdown'
import styles from './Header.module.scss'
import Link from 'next/link'

export default function Header() {
  return (
    <header className={styles.header}>
        <div className={styles.wrapper}>
            <Logo variant='light' />
            <SearchInput placeholder='Search for some artists or concerts' variant='header'/>
        </div>
        <div className=''>
          <ProfileDropdown />
        </div>
        {/* <RegionSelector /> */}
    </header>
  )
}
