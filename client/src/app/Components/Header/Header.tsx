'use client'
import { useEffect, useState } from 'react'
import { useAppSelector } from '@/app/hooks/rtkHooks'
import Logo from '../../Ui/Logo/Logo'
import SearchInput from '@/app/Ui/SearchInput/SearchInput'
import RegionSelector from './RegionSelector/RegionSelector'
import ProfileDropdown from './ProfileDropdown/ProfileDropdown'
import ThemeSwitcher from './ThemeSwitcher.tsx/ThemeSwitcher'
import Banner from '../Banner/Banner'
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

export default function Header({type, children}:{type: string, children?: React.ReactNode}) {
  const [isMobille, setIsMobile] = useState(false);
  const [burgerIsOpen, setBurgerIsOpen] = useState(false);
  const modalIsOpen = useAppSelector(state => state.modal?.isOpen);
  const [isClient, setIsClient] = useState(true);
  let authed
  if (typeof window !== 'undefined') {
    authed = window?.localStorage?.getItem('authed')
  }
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
  const testHandler = () => {
    console.log('test')
  }
  return (
    <header className={styles.header}>
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
                variant='header'/>
          </div>
          <div className={styles.events}>
          <Link className={styles.link} href={'/'}>Home</Link>
              <NavigationMenu>
                  <NavigationMenuList>
                    <NavigationMenuItem>
                      <NavigationMenuTrigger>Events</NavigationMenuTrigger>
                      <NavigationMenuContent>
                      <ul className="flex items-center justify-around w-[350px] text-center p-6">
                        <div className='flex flex-col'>
                        <NavigationMenuLink href="/genre/electronic" title="Introduction">
                            Electronic
                          </NavigationMenuLink>
                          <NavigationMenuLink href="/genre/country" title="Installation">     
                            Country
                          </NavigationMenuLink>
                          <NavigationMenuLink href="/genre/hiphop" title="Typography">
                            Hip hop
                          </NavigationMenuLink>
                          <NavigationMenuLink href="/genre/funk" title="Typography">
                            Funk
                          </NavigationMenuLink>
                          <NavigationMenuLink href="/genre/jazz" title="Typography">
                            Jazz
                          </NavigationMenuLink>
                          <NavigationMenuLink href="/genre/latin" title="Typography">
                            Latin
                          </NavigationMenuLink>
                          <NavigationMenuLink href="/genre/pop" title="Typography">
                            Pop
                          </NavigationMenuLink>
                          <NavigationMenuLink href="/genre/punk" title="Typography">
                            Punk
                          </NavigationMenuLink>
                        </div>
                        <div className='flex flex-col'>
                          <NavigationMenuLink href="/genre/alternative" title="Typography">
                              Alternative
                            </NavigationMenuLink>
                            <NavigationMenuLink href="/genre/classical" title="Typography">
                              Classical
                            </NavigationMenuLink>
                            <NavigationMenuLink href="/genre/r&b" title="Typography">
                              R&B
                            </NavigationMenuLink>
                            <NavigationMenuLink href="/genre/rock" title="Typography">
                              Rock
                            </NavigationMenuLink>
                            <NavigationMenuLink href="/genre/blues" title="Typography">
                              Blues
                            </NavigationMenuLink>
                            <NavigationMenuLink href="/genre/metal" title="Typography">
                              Metal
                            </NavigationMenuLink>
                            <NavigationMenuLink href="/genre/indie" title="Typography">
                              Indie
                            </NavigationMenuLink>
                            <NavigationMenuLink href="/genre/all" title="Typography">
                              All events
                            </NavigationMenuLink>
                        </div>
                        </ul>
                      </NavigationMenuContent>
                    </NavigationMenuItem>
                    <NavigationMenuItem>
                      <NavigationMenuTrigger>Artists</NavigationMenuTrigger>
                      <NavigationMenuContent>
                      <ul className="flex flex-col items-center justify-center w-[350px] text-center p-6">
                          <NavigationMenuLink href="/artists/followed" title="Introduction">
                            Followed Artists
                          </NavigationMenuLink>
                          <NavigationMenuLink href="/artists/trending" title="Installation">
                            Trending Artists
                          </NavigationMenuLink>
                          <NavigationMenuLink href="/artists/all" title="Typography">
                            All Artists
                          </NavigationMenuLink>
                        </ul>
                      </NavigationMenuContent>
                    </NavigationMenuItem>
                    <NavigationMenuItem>
                      <NavigationMenuTrigger>Music</NavigationMenuTrigger>
                      <NavigationMenuContent>
                      <ul className="flex items-center justify-around w-[350px] text-center p-6">
                        <div className='flex flex-col'>
                        <NavigationMenuLink href="/artists/genre/electronic" title="Introduction">
                            Electronic
                          </NavigationMenuLink>
                          <NavigationMenuLink href="/artists/genre/country" title="Installation">     
                            Country
                          </NavigationMenuLink>
                          <NavigationMenuLink href="/artists/genre/hiphop" title="Typography">
                            Hip hop
                          </NavigationMenuLink>
                          <NavigationMenuLink href="/artists/genre/funk" title="Typography">
                            Funk
                          </NavigationMenuLink>
                          <NavigationMenuLink href="/artists/genre/jazz" title="Typography">
                            Jazz
                          </NavigationMenuLink>
                          <NavigationMenuLink href="/artists/genre/latin" title="Typography">
                            Latin
                          </NavigationMenuLink>
                          <NavigationMenuLink href="/artists/genre/pop" title="Typography">
                            Pop
                          </NavigationMenuLink>
                          <NavigationMenuLink href="/artists/genre/punk" title="Typography">
                            Punk
                          </NavigationMenuLink>
                        </div>
                        <div className='flex flex-col'>
                          <NavigationMenuLink href="/artists/genre/alternative" title="Typography">
                              Alternative
                            </NavigationMenuLink>
                            <NavigationMenuLink href="/artists/genre/classical" title="Typography">
                              Classical
                            </NavigationMenuLink>
                            <NavigationMenuLink href="/artists/genre/r&b" title="Typography">
                              R&B
                            </NavigationMenuLink>
                            <NavigationMenuLink href="/artists/genre/rock" title="Typography">
                              Rock
                            </NavigationMenuLink>
                            <NavigationMenuLink href="/artists/genre/blues" title="Typography">
                              Blues
                            </NavigationMenuLink>
                            <NavigationMenuLink href="/artists/genre/metal" title="Typography">
                              Metal
                            </NavigationMenuLink>
                            <NavigationMenuLink href="/artists/genre/indie" title="Typography">
                              Indie
                            </NavigationMenuLink>
                            <NavigationMenuLink href="/artists/genre/all" title="Typography">
                              All artists
                            </NavigationMenuLink>
                        </div>
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
              {/* <ThemeSwitcher /> */}
          </div>
      </div>
        {/* <RegionSelector /> */}
        {type === 'errorPage' && <h5 className={styles.error}>Sorry! Page does not exist 🥲</h5>}
        {type === 'banner' &&  <Banner />}
        {type === 'children' && children}
    </header>
  )
}
