'use client'
import { useState, useEffect, lazy, Suspense } from "react"
import { useAppDispatch, useAppSelector } from "@/app/hooks/rtkHooks"
import { getCurrUser } from "@/app/store/user/userSlice"
import { useRouter } from "next/navigation"
import HeaderWithoutBanner from "../Header/HeaderWithouBanner"
import ProfileSettings from "./ProfileSettings"
const FollowedArtists = lazy(() => import('./FollowedArtists'))
const FollowedShows = lazy(() => import('./FollowedShows'))
const UpcomingShows = lazy(() => import('./UpcomingShows'))
const ArtistShows = lazy(() => import('./ArtistShows'))
const ScheduledShows = lazy(() => import('./ScheduledShows'))
const SponsoredShows = lazy(() => import('./SponsoredShows'))
const TicketsList = lazy(() => import('./TicketsList'))
import Loading from "../Loading/Loading"
import { checkAccessToken } from "@/app/utils/checkAccessToken"
import Tariff from "./Tariff"

import styles from './Profile.module.scss'
import Services from "./Services"
import ProfileServiceSettings from "./ProfileServiceSettings"

export default function Profile() {
  const dispatch = useAppDispatch();
  const user = useAppSelector(state => state.userInfo.user)
  const [profileIsOpen, setProfileIsOpen] = useState(true);
  const [artistsIsOpen, setArtistsIsOpen] = useState(false);
  const [showsIsOpen, setShowsIsOpen] = useState(false);
  const [upcomingIsOpen, setUpcomingIsOpen] = useState(false);
  const [artistShowsIsOpen, setArtistsShowsIsOpen] = useState(false);
  const [scheduledShowsIsOpen, setScheduledShowsIsOpen] = useState(false);
  const [sponsoredShowsIsOpen, setSponsoredShowsIsOpen] = useState(false);
  const [ticketsListIsOpen, setTicketsListIsOpen] = useState(false);
  const [tariffIsOpen, setTariffIsOpen] = useState(false);
  const [servicesIsOpen, setServicesIsOpen] = useState(false);
  const [serviceSettingsIsOpen, setServiceSettingsIsOpen] = useState(false);

  const router = useRouter();

  // useEffect(() => {
  //   if (user?.role.includes('service')){
  //     setProfileIsOpen(false);
  //     setServiceSettingsIsOpen(true)
  //   }
  // }, [user])

  const profileHandler = () => {
    setProfileIsOpen(true);
    setArtistsIsOpen(false);
    setShowsIsOpen(false);
    setUpcomingIsOpen(false);
    setArtistsShowsIsOpen(false);
    setScheduledShowsIsOpen(false);
    setSponsoredShowsIsOpen(false);
    setTicketsListIsOpen(false);
    setTariffIsOpen(false);
    setServicesIsOpen(false)
    setServiceSettingsIsOpen(false)

  }
  const artistsHandler = () => {
    setArtistsIsOpen(true);
    setProfileIsOpen(false);
    setShowsIsOpen(false);
    setUpcomingIsOpen(false);
    setArtistsShowsIsOpen(false);
    setScheduledShowsIsOpen(false);
    setSponsoredShowsIsOpen(false);
    setTicketsListIsOpen(false);
    setTariffIsOpen(false);
    setServicesIsOpen(false)
    setServiceSettingsIsOpen(false)

  }
  const showsHandler = () => {
    setShowsIsOpen(true);
    setProfileIsOpen(false);
    setArtistsIsOpen(false);
    setUpcomingIsOpen(false);
    setArtistsShowsIsOpen(false);
    setScheduledShowsIsOpen(false);
    setSponsoredShowsIsOpen(false);
    setTicketsListIsOpen(false);
    setTariffIsOpen(false);
    setServicesIsOpen(false)
    setServiceSettingsIsOpen(false)

  }
  const artistShowsHandler = () => {
    setArtistsShowsIsOpen(true);
    setShowsIsOpen(false);
    setProfileIsOpen(false);
    setArtistsIsOpen(false);
    setUpcomingIsOpen(false);
    setScheduledShowsIsOpen(false);
    setSponsoredShowsIsOpen(false);
    setTicketsListIsOpen(false);
    setTariffIsOpen(false);
    setServicesIsOpen(false)
    setServiceSettingsIsOpen(false)

  }
  const upcomingHandler = () => {
    setUpcomingIsOpen(true);
    setProfileIsOpen(false);
    setArtistsIsOpen(false);
    setShowsIsOpen(false);
    setArtistsShowsIsOpen(false);
    setScheduledShowsIsOpen(false);
    setSponsoredShowsIsOpen(false);
    setTicketsListIsOpen(false);
    setTariffIsOpen(false);
    setServicesIsOpen(false)
    setServiceSettingsIsOpen(false)

  }
  const scheduledShowsHandler = () => {
    setScheduledShowsIsOpen(true);
    setUpcomingIsOpen(false);
    setProfileIsOpen(false);
    setArtistsIsOpen(false);
    setShowsIsOpen(false);
    setArtistsShowsIsOpen(false);
    setSponsoredShowsIsOpen(false);
    setTicketsListIsOpen(false);
    setTariffIsOpen(false);
    setServicesIsOpen(false)
    setServiceSettingsIsOpen(false)

  }
  const sponsoredShowsHandler = () => {
    setSponsoredShowsIsOpen(true);
    setUpcomingIsOpen(false);
    setProfileIsOpen(false);
    setArtistsIsOpen(false);
    setShowsIsOpen(false);
    setArtistsShowsIsOpen(false);
    setScheduledShowsIsOpen(false);
    setTicketsListIsOpen(false);
    setTariffIsOpen(false);
    setServicesIsOpen(false)
    setServiceSettingsIsOpen(false)

  }
  const ticketsListHandler = () => {
    setTicketsListIsOpen(true);
    setSponsoredShowsIsOpen(false);
    setUpcomingIsOpen(false);
    setProfileIsOpen(false);
    setArtistsIsOpen(false);
    setShowsIsOpen(false);
    setArtistsShowsIsOpen(false);
    setScheduledShowsIsOpen(false);
    setTariffIsOpen(false);
    setServicesIsOpen(false)
    setServiceSettingsIsOpen(false)

  }

  const tariffHandler = () => {
    setServicesIsOpen(false)
    setTariffIsOpen(true)
    setTicketsListIsOpen(false)
    setSponsoredShowsIsOpen(false)
    setUpcomingIsOpen(false)
    setProfileIsOpen(false)
    setArtistsIsOpen(false)
    setShowsIsOpen(false)
    setArtistsShowsIsOpen(false)
    setScheduledShowsIsOpen(false)
    setServiceSettingsIsOpen(false)

  }

  const servicesHandler = () => {
    setServicesIsOpen(true)
    setTariffIsOpen(false)
    setTicketsListIsOpen(false)
    setSponsoredShowsIsOpen(false)
    setUpcomingIsOpen(false)
    setProfileIsOpen(false)
    setArtistsIsOpen(false)
    setShowsIsOpen(false)
    setArtistsShowsIsOpen(false)
    setScheduledShowsIsOpen(false)
    setServiceSettingsIsOpen(false)
  }

  const serviceSettingsHandler = () => {
    setServiceSettingsIsOpen(true)
    setServicesIsOpen(false)
    setTariffIsOpen(false)
    setTicketsListIsOpen(false)
    setSponsoredShowsIsOpen(false)
    setUpcomingIsOpen(false)
    setProfileIsOpen(false)
    setArtistsIsOpen(false)
    setShowsIsOpen(false)
    setArtistsShowsIsOpen(false)
    setScheduledShowsIsOpen(false)
  }

  useEffect(() => {
    checkAccessToken();
  }, [])
  useEffect(() => {
    dispatch(getCurrUser());
    if (typeof window !== 'undefined'){
        const authed = localStorage.getItem('authed')
        if (!authed){
            router.push('/')
        }
    }
}, [])
  return (
    <>
        <HeaderWithoutBanner />
        <section className={styles.wrapper}>
          <div className={styles.content}>
            {!user?.role.includes('administrator') && !user?.role.includes('service') && 
            !user?.role.includes('sponsor') && !user?.role.includes('advertiser') &&
              <ul className={styles.nav}>
              <li
                onClick={profileHandler}
                className={profileIsOpen ? styles.active : styles.notActive}
              >My Profile</li>
                <li
                  onClick={tariffHandler}
                  className={tariffIsOpen ? styles.active : styles.notActive}
                >Artist Plans</li>
                <li
                  onClick={servicesHandler}
                  className={servicesIsOpen ? styles.active : styles.notActive}
                >Services</li>
              <li
                onClick={artistShowsHandler}
                className={artistShowsIsOpen ? styles.active : styles.notActive}
              >My shows</li>
              <li
                onClick={upcomingHandler}
                className={upcomingIsOpen ? styles.active : styles.notActive}
              >Upcoming shows</li>
                <li
                  onClick={artistsHandler}
                  className={artistsIsOpen ? styles.active : styles.notActive}
                >Followed Artists</li>
            </ul> }
            {user?.role.includes('advertiser') && 
              <ul className={styles.nav}>
              <li
                onClick={profileHandler}
                className={profileIsOpen ? styles.active : styles.notActive}
              >My Profile</li>
                <li
                  onClick={servicesHandler}
                  className={servicesIsOpen ? styles.active : styles.notActive}
                >Services</li>
                {/* <li
                  onClick={tariffHandler}
                  className={tariffIsOpen ? styles.active : styles.notActive}
                >Advertiser Plans</li> */}
              <li
                onClick={upcomingHandler}
                className={upcomingIsOpen ? styles.active : styles.notActive}
              >Upcoming shows</li>
                <li
                  onClick={artistsHandler}
                  className={artistsIsOpen ? styles.active : styles.notActive}
                >Followed Artists</li>
            </ul> }
            {user?.role.includes('service') && 
              <ul className={styles.nav}>
                <li
                  onClick={profileHandler}
                  className={profileIsOpen ? styles.active : styles.notActive}
                >My Profile</li>
                <li
                  onClick={serviceSettingsHandler}
                  className={serviceSettingsIsOpen ? styles.active : styles.notActive}
                >Service Profile</li>
                {/* <li
                  onClick={tariffHandler}
                  className={tariffIsOpen ? styles.active : styles.notActive}
                >Services Plans</li> */}
                {/* <li
                  onClick={servicesHandler}
                  className={servicesIsOpen ? styles.active : styles.notActive}
                >My services</li> */}
              <li
                onClick={upcomingHandler}
                className={upcomingIsOpen ? styles.active : styles.notActive}
              >Upcoming shows</li>
            </ul> }
            {user?.role.includes('viewer') &&
                <ul className={styles.nav}>
                <li
                  onClick={profileHandler}
                  className={profileIsOpen ? styles.active : styles.notActive}
                >My Profile</li>
                <li
                  onClick={artistsHandler}
                  className={artistsIsOpen ? styles.active : styles.notActive}
                >My Artists</li>
                <li
                  onClick={ticketsListHandler}
                  className={ticketsListIsOpen ? styles.active : styles.notActive}
                >My Tickets</li>
                <li
                  onClick={showsHandler}
                  className={showsIsOpen ? styles.active : styles.notActive}
                >Followed shows</li>
              </ul>
            }
            {user?.role.includes('administrator') &&
                <ul className={styles.nav}>
                <li
                  onClick={profileHandler}
                  className={profileIsOpen ? styles.active : styles.notActive}
                >My Profile</li>
                <li
                  onClick={upcomingHandler}
                  className={upcomingIsOpen ? styles.active : styles.notActive}
                >Upcoming shows</li>
              </ul>
            }
            {user?.role.includes('sponsor') &&
                <ul className={styles.nav}>
                <li
                  onClick={profileHandler}
                  className={profileIsOpen ? styles.active : styles.notActive}
                >My Profile</li>
                <li
                  onClick={scheduledShowsHandler}
                  className={scheduledShowsIsOpen ? styles.active : styles.notActive}
                >Scheduled shows</li>
                <li
                  onClick={sponsoredShowsHandler}
                  className={sponsoredShowsIsOpen ? styles.active : styles.notActive}
                >Shows sponsored by you</li>
              </ul>
            }
            {profileIsOpen && 
                <ProfileSettings />
            }
            {serviceSettingsIsOpen && 
                <ProfileServiceSettings />
            }
            {artistsIsOpen && 
              <Suspense fallback={<Loading />}>
                 <FollowedArtists />
              </Suspense>
            }
            {showsIsOpen && 
              <Suspense fallback={<Loading />}>
                    <FollowedShows />
              </Suspense>
            }
            {upcomingIsOpen && 
              <Suspense fallback={<Loading />}>
                  <UpcomingShows />
              </Suspense>
            }
            {artistShowsIsOpen &&
              <Suspense fallback={<Loading />}>
                <ArtistShows />
              </Suspense>
            }
            {scheduledShowsIsOpen &&
              <Suspense fallback={<Loading />}>
                <ScheduledShows />
              </Suspense>
            }
            {sponsoredShowsIsOpen &&
              <Suspense fallback={<Loading />}>
                <SponsoredShows />
              </Suspense>
            }
            {ticketsListIsOpen && 
              <Suspense fallback={<Loading />}>
                <TicketsList />
              </Suspense>
            }
            {tariffIsOpen && 
              <Suspense fallback={<Loading />}>
                <Tariff />
              </Suspense>
            }
            {servicesIsOpen && 
              <Suspense fallback={<Loading />}>
                <Services />
              </Suspense>
            }
          </div>
        </section>
    </>
  )
}
