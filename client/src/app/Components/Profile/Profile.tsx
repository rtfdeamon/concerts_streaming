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
import Loading from "../Loading/Loading"
import { checkAccessToken } from "@/app/utils/checkAccessToken"
import styles from './Profile.module.scss'

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

  const router = useRouter();

  const profileHandler = () => {
    setProfileIsOpen(true);
    setArtistsIsOpen(false);
    setShowsIsOpen(false);
    setUpcomingIsOpen(false);
    setArtistsShowsIsOpen(false);
    setScheduledShowsIsOpen(false);
    setSponsoredShowsIsOpen(false);
  }
  const artistsHandler = () => {
    setArtistsIsOpen(true);
    setProfileIsOpen(false);
    setShowsIsOpen(false);
    setUpcomingIsOpen(false);
    setArtistsShowsIsOpen(false);
    setScheduledShowsIsOpen(false);
    setSponsoredShowsIsOpen(false);
  }
  const showsHandler = () => {
    setShowsIsOpen(true);
    setProfileIsOpen(false);
    setArtistsIsOpen(false);
    setUpcomingIsOpen(false);
    setArtistsShowsIsOpen(false);
    setScheduledShowsIsOpen(false);
    setSponsoredShowsIsOpen(false);
  }
  const artistShowsHandler = () => {
    setArtistsShowsIsOpen(true);
    setShowsIsOpen(false);
    setProfileIsOpen(false);
    setArtistsIsOpen(false);
    setUpcomingIsOpen(false);
    setScheduledShowsIsOpen(false);
    setSponsoredShowsIsOpen(false);
  }
  const upcomingHandler = () => {
    setUpcomingIsOpen(true);
    setProfileIsOpen(false);
    setArtistsIsOpen(false);
    setShowsIsOpen(false);
    setArtistsShowsIsOpen(false);
    setScheduledShowsIsOpen(false);
    setSponsoredShowsIsOpen(false);
  }
  const scheduledShowsHandler = () => {
    setScheduledShowsIsOpen(true);
    setUpcomingIsOpen(false);
    setProfileIsOpen(false);
    setArtistsIsOpen(false);
    setShowsIsOpen(false);
    setArtistsShowsIsOpen(false);
    setSponsoredShowsIsOpen(false);
  }
  const sponsoredShowsHandler = () => {
    setSponsoredShowsIsOpen(true);
    setUpcomingIsOpen(false);
    setProfileIsOpen(false);
    setArtistsIsOpen(false);
    setShowsIsOpen(false);
    setArtistsShowsIsOpen(false);
    setScheduledShowsIsOpen(false);
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
            {user?.role.includes('artist') && 
              <ul className={styles.nav}>
              <li
                onClick={profileHandler}
                className={profileIsOpen ? styles.active : styles.notActive}
              >My Profile</li>
              <li
                onClick={artistShowsHandler}
                className={artistShowsIsOpen ? styles.active : styles.notActive}
              >My shows</li>
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
            {profileIsOpen && <ProfileSettings />}
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
          </div>
        </section>
    </>
  )
}
