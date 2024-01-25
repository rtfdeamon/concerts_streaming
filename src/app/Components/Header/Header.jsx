import Logo from '../../Ui/Logo/Logo'
import SearchInput from '@/app/Ui/SearchInput/SearchInput'
import RegionSelector from './RegionSelector/RegionSelector'
import ProfileDropdown from './ProfileDropdown/ProfileDropdown'
import styles from './Header.module.scss'

export default function Header() {
  return (
    <header className={styles.header}>
        <Logo variant='light' />
        <SearchInput placeholder='Search for some artists or concerts' variant='header'/>
        <RegionSelector />
        <ProfileDropdown />
    </header>
  )
}
