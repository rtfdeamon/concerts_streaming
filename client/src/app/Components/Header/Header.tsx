'use client'
import { useEffect, useRef, useState } from 'react'
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
import { cn } from '@/lib/utils'

export const dynamic = 'force-dynamic'

export default function Header({type, children}:{type: string, children?: React.ReactNode}) {
  const [burgerIsOpen, setBurgerIsOpen] = useState(false);
  const modalIsOpen = useAppSelector(state => state.modal?.isOpen);
  const [isVisible, setVisible] = useState(false)
  const user = useAppSelector(state => state.userInfo.user)
  let authed
  if (typeof window !== "undefined") {
    authed = localStorage.getItem('authed')
  }
  const isMobille = useRef(typeof window !== 'undefined' && window.innerWidth <= 900);

  const burgerHandler = () => {
    setBurgerIsOpen(!burgerIsOpen)
    if (burgerIsOpen){
      document.body.setAttribute('burgerIsActive', 'open');
    } else{
      document.body.setAttribute('burgerIsActive', 'close');
    }
  }

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(true)
    }, 0)
    return () => {
      clearTimeout(timer)
    }
  }, [])

  useEffect(() => {
    
    document.body.setAttribute('burgerIsActive', 'open');
    setBurgerIsOpen(false);
  }, [modalIsOpen])

  return (
    <header className={styles.header}>
      {
        isVisible && isMobille?.current === true && 
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
      {
        isVisible === true && (
          <div className={isMobille?.current === true ? styles.headerMobileWrapper : styles.headerWrapper}>
          <div className={styles.wrapper}>
              <Logo variant='light' />
              <SearchInput
                placeholder='Search artists & events'
                variant='header'/>
          </div>
          <div className={styles.events}>
          <Link className={styles.link} href={'/'}>Home</Link>
          {
            user?.role.includes('artist') && 
                                            //@ts-ignore
            user?.plan?.is_paid && (
              <Link className={styles.link} href={'/services'}>Services</Link>
             )
          }
          <NavigationMenu>
                  <NavigationMenuList>
                    <NavigationMenuItem>
                      <NavigationMenuTrigger>Categories</NavigationMenuTrigger>
                      <NavigationMenuContent>
                      <ul className={styles.categories}>
                        <div className='flex flex-col mr-4'>
                        <NavigationMenuLink href="/category/actors" title="Typography">
                            Actors
                          </NavigationMenuLink>
                          <NavigationMenuLink href="/category/all" title="Typography">
                              All events
                            </NavigationMenuLink>
                          <NavigationMenuLink href="/category/authors-and-writers" title="Typography">
                            Authors & Writers
                          </NavigationMenuLink>
                          <NavigationMenuLink href="/category/bloggers-and-podcasters" title="Typography">
                            Bloggers & Podcasters
                          </NavigationMenuLink>
                          <NavigationMenuLink href="/category/comedy" title="Installation">     
                            Comedy
                          </NavigationMenuLink>
                          <NavigationMenuLink href="/category/cosmetology" title="Typography">
                            Cosmetology
                          </NavigationMenuLink>
                        </div>
                        <div className='flex flex-col'>
                        <NavigationMenuLink href="/category/culinary" title="Introduction">
                            Culinary
                          </NavigationMenuLink>
                        <NavigationMenuLink href="/category/dance" title="Introduction">
                            Dance
                          </NavigationMenuLink>
                          <NavigationMenuLink href="/category/painter" title="Typography">
                            Painter
                          </NavigationMenuLink>
                          <NavigationMenuLink href="/category/photography-and-videography" title="Typography">
                            Photography & Videography
                          </NavigationMenuLink>
                          <NavigationMenuLink href="/category/producer" title="Typography">
                            Producer
                          </NavigationMenuLink>
                          <NavigationMenuLink href="/category/writer" title="Typography">
                            Writer
                          </NavigationMenuLink>
                        </div>
                      </ul>
                      </NavigationMenuContent>
                    </NavigationMenuItem>
                    <NavigationMenuItem>
                      <NavigationMenuTrigger>Artists</NavigationMenuTrigger>
                      <NavigationMenuContent>
                      <ul className="flex flex-col items-center justify-center w-[350px] text-center p-6">
                          <NavigationMenuLink href="/artists/all" title="Typography">
                            All Artists
                          </NavigationMenuLink>
                          <NavigationMenuLink href="/artists/followed" title="Introduction">
                            Followed Artists
                          </NavigationMenuLink>
                          <NavigationMenuLink href="/artists/trending" title="Installation">
                            New Member Artists
                          </NavigationMenuLink>
                        </ul>
                      </NavigationMenuContent>
                    </NavigationMenuItem>
                    <NavigationMenuItem>
                      <NavigationMenuTrigger>Music</NavigationMenuTrigger>
                      <NavigationMenuContent>
                      <ul className={styles.categories}>
                        <div className='flex flex-col'>
                        <NavigationMenuLink href="/artists/genre/alternative" title="Typography">
                              Alternative
                        </NavigationMenuLink>
                        <NavigationMenuLink href="/artists/genre/blues" title="Typography">
                          Blues
                        </NavigationMenuLink>
                        <NavigationMenuLink href="/artists/genre/classical" title="Typography">
                              Classical
                        </NavigationMenuLink>
                        <NavigationMenuLink href="/artists/genre/country" title="Installation">     
                            Country
                          </NavigationMenuLink>
                        <NavigationMenuLink href="/artists/genre/electronic" title="Introduction">
                            Electronic
                          </NavigationMenuLink>
                          <NavigationMenuLink href="/artists/genre/funk" title="Typography">
                            Funk
                          </NavigationMenuLink>
                          <NavigationMenuLink href="/artists/genre/jazz" title="Typography">
                            Jazz
                          </NavigationMenuLink>
                        </div>
                        <div className='flex flex-col justify-start'>
                        <NavigationMenuLink href="/artists/genre/latin" title="Typography">
                            Latin
                          </NavigationMenuLink>
                          <NavigationMenuLink href="/artists/genre/metal" title="Typography">
                              Metal
                            </NavigationMenuLink>
                            <NavigationMenuLink href="/artists/genre/pop" title="Typography">
                            Pop
                          </NavigationMenuLink>
                          <NavigationMenuLink href="/artists/genre/punk" title="Typography">
                            Punk
                          </NavigationMenuLink>
                          <NavigationMenuLink href="/artists/genre/hiphop" title="Typography" className='ml-4'>
                              Hip hop & R&B
                            </NavigationMenuLink>
                            <NavigationMenuLink href="/artists/genre/rap" title="Typography">
                              Rap
                            </NavigationMenuLink>
                            <NavigationMenuLink href="/artists/genre/rock" title="Typography">
                              Rock
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
                  <Link className={cn(styles.link, styles.linkSignIn)} href={'/login'}>Login</Link>
                  <Link className={styles.link} href={'/signup'}>Sign up</Link>
                </>
              }
              {/* <ThemeSwitcher /> */}
          </div>
      </div>
        )
      }
        {/* <RegionSelector /> */}
        {type === 'errorPage' && <h5 className={styles.error}>Sorry! Page does not exist 🥲</h5>}
        {type === 'banner' &&  <Banner />}
        {type === 'children' && children}
    </header>
  )
}
