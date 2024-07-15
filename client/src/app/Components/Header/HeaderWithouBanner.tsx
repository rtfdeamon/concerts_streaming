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
import Image from 'next/image'
import Link from 'next/link'
import X from '../../../../public/x.svg'
import Menu from '../../../../public/menu.svg'
import styles from './Header.module.scss'


export default function HeaderWithoutBanner() {
  const [isMobille, setIsMobile] = useState(false);
  const [burgerIsOpen, setBurgerIsOpen] = useState(false);
  const modalIsOpen = useAppSelector(state => state.modal?.isOpen);
  const user = useAppSelector(state => state.userInfo.user)
  let authed
  if (typeof window !== "undefined") {
    authed = localStorage.getItem('authed')
  }
  console.log('authed', authed)
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
                placeholder='Search artists & events'
                variant='default'/>
          </div>
          <div className={styles.events}>
          <Link className={styles.link} href={'/'}>Home</Link>
          {
                                            //@ts-ignore
            user?.role.includes('artist') && user?.plan?.is_paid && (
              <Link className={styles.link} href={'/services'}>Services</Link>
             )
          }
          <NavigationMenu>
                  <NavigationMenuList>
                    <NavigationMenuItem>
                      <NavigationMenuTrigger>Events</NavigationMenuTrigger>
                      <NavigationMenuContent>
                      <ul className="flex items-start justify-center w-[350px] text-center p-6">
                        <div className='flex flex-col mr-4'>
                        <NavigationMenuLink href="/category/culinary" title="Introduction">
                            Culinary
                          </NavigationMenuLink>
                          <NavigationMenuLink href="/category/comedy" title="Installation">     
                            Comedy
                          </NavigationMenuLink>
                          <NavigationMenuLink href="/category/videography" title="Typography">
                            Videography
                          </NavigationMenuLink>
                          <NavigationMenuLink href="/category/bloggers" title="Typography">
                            Bloggers
                          </NavigationMenuLink>
                          <NavigationMenuLink href="/category/authors" title="Typography">
                            Authors
                          </NavigationMenuLink>
                          <NavigationMenuLink href="/category/actors" title="Typography">
                            Actors
                          </NavigationMenuLink>
                          <NavigationMenuLink href="/category/fashion" title="Typography">
                            Fashion
                          </NavigationMenuLink>
                          <NavigationMenuLink href="/category/cosmetology" title="Typography">
                            Cosmetology
                          </NavigationMenuLink>
                          <NavigationMenuLink href="/category/producer" title="Typography">
                            Producer
                          </NavigationMenuLink>
                        </div>
                        <div className='flex flex-col'>
                          <NavigationMenuLink href="/category/dancer" title="Typography">
                              Dancer
                            </NavigationMenuLink>
                            <NavigationMenuLink href="/category/painter" title="Typography">
                              Painter
                            </NavigationMenuLink>
                            <NavigationMenuLink href="/category/photography" title="Typography">
                              Photography
                            </NavigationMenuLink>
                            <NavigationMenuLink href="/category/podcaster" title="Typography">
                              Podcaster
                            </NavigationMenuLink>
                            <NavigationMenuLink href="/category/writer" title="Typography">
                              Writer
                            </NavigationMenuLink>
                            <NavigationMenuLink href="/category/cheer" title="Typography">
                              Cheer
                            </NavigationMenuLink>
                            <NavigationMenuLink href="/category/hainNailSkin" title="Typography">
                              Hair-Nail-Skin
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
                            <NavigationMenuLink href="/artists/all" title="Typography">
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
    </header>
  )
}
