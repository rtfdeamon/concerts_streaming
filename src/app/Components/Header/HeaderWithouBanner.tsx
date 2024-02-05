'use client'
import { useEffect, useState } from 'react'
import { useAppSelector } from '@/app/hooks/rtkHooks'
import Logo from '../../Ui/Logo/Logo'
import SearchInput from '@/app/Ui/SearchInput/SearchInput'
import ProfileDropdown from './ProfileDropdown/ProfileDropdown'
import ThemeSwitcher from './ThemeSwitcher.tsx/ThemeSwitcher'
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger
} from "@/shadComponents/ui/navigation-menu"
import styles from './Header.module.scss'
import Image from 'next/image'
import Link from 'next/link'
import X from '../../../../public/x.svg'
import Menu from '../../../../public/menu.svg'


export default function HeaderWithoutBanner() {
  const [isMobille, setIsMobile] = useState(false);
  const [burgerIsOpen, setBurgerIsOpen] = useState(false);
  const modalIsOpen = useAppSelector(state => state.modal?.isOpen);
  let authed
  if (typeof window !== undefined) {
    authed = localStorage.getItem('authed')
  }
  console.log(authed);
  
  const burgerHandler = () => {
    setBurgerIsOpen(!burgerIsOpen)
    if (burgerIsOpen){
      document.body.setAttribute('burgerIsActive', 'open');
    } else{
      document.body.setAttribute('burgerIsActive', 'close');
    }
  }

  useEffect(() => {
    document.body.setAttribute('burgerIsActive', 'open');
    setBurgerIsOpen(false);
  }, [modalIsOpen])

  useEffect(() => {
    if (window.innerWidth <= 900){
      setIsMobile(true);
    }
  }, [])
  return (
    <header className={styles.headerWithoutBanner}>
      {
        isMobille && 
        <div
          onClick={() => burgerHandler()}
          className={!burgerIsOpen ? styles.burger : styles.burgerClose}
          >
          {
            burgerIsOpen ? 
              <Image
                className={styles.burgerActive}
                src={X}
                width={80}
                height={80}
                alt='Close burger' />
            :
              <Image
                className={styles.burgerNonActive}
                src={Menu}
                width={80}
                height={80}
                alt='Open burger' />
          }
       </div>
      }
      <div className={!isMobille? styles.headerWrapper : styles.headerMobileWrapper}>
          <div className={styles.wrapper}>
              <Logo variant='light' />
              <SearchInput
                placeholder='Search for some artists or concerts'
                variant='default'/>
          </div>
          <div className={styles.events}>
          <Link className={styles.link} href={'/'}>Home</Link>
              <NavigationMenu>
                  <NavigationMenuList>
                    <NavigationMenuItem>
                      <NavigationMenuTrigger>Events</NavigationMenuTrigger>
                      <NavigationMenuContent>
                        <ul className="flex flex-col items-center justify-center w-[350px] text-center p-6 z-50">
                          <NavigationMenuLink href="/docs" title="Introduction">
                            Today
                          </NavigationMenuLink>
                          <NavigationMenuLink href="/docs/installation" title="Installation">
                            This week
                          </NavigationMenuLink>
                          <NavigationMenuLink href="/docs/primitives/typography" title="Typography">
                            This month
                          </NavigationMenuLink>
                        </ul>
                      </NavigationMenuContent>
                    </NavigationMenuItem>
                    <NavigationMenuItem>
                      <NavigationMenuTrigger>Artists</NavigationMenuTrigger>
                      <NavigationMenuContent>
                      <ul className="flex flex-col items-center justify-center w-[350px] text-center p-6">
                          <NavigationMenuLink href="/docs" title="Introduction">
                            Today
                          </NavigationMenuLink>
                          <NavigationMenuLink href="/docs/installation" title="Installation">
                            This week
                          </NavigationMenuLink>
                          <NavigationMenuLink href="/docs/primitives/typography" title="Typography">
                            This month
                          </NavigationMenuLink>
                        </ul>
                      </NavigationMenuContent>
                    </NavigationMenuItem>
                    <NavigationMenuItem>
                      <NavigationMenuTrigger>Music</NavigationMenuTrigger>
                      <NavigationMenuContent>
                      <ul className="flex flex-col items-center justify-center w-[350px] text-center p-6">
                          <NavigationMenuLink href="/docs" title="Introduction">
                            Today
                          </NavigationMenuLink>
                          <NavigationMenuLink href="/docs/installation" title="Installation">
                            This week
                          </NavigationMenuLink>
                          <NavigationMenuLink href="/docs/primitives/typography" title="Typography">
                            This month
                          </NavigationMenuLink>
                        </ul>
                      </NavigationMenuContent>
                    </NavigationMenuItem>
                  </NavigationMenuList>
              </NavigationMenu>
          </div>
          <div className={styles.profileWrapper}>
            {
                authed == "true" ? 
                <ProfileDropdown />
                :
                <>
                  <Link className={styles.link} href={'/login'}>Login</Link>
                  <Link className={styles.link} href={'/signup'}>Sign up</Link>
                </>
              }
              <ThemeSwitcher />
          </div>
        </div>
    </header>
  )
}
