'use client'
import { useState, useEffect } from "react"
import { useAppDispatch, useAppSelector } from "@/app/hooks/rtkHooks"
import { getCurrUser } from "@/app/store/user/userSlice"
import { useRouter } from "next/navigation"
import HeaderWithoutBanner from "../Header/HeaderWithouBanner"
import ProfileSettings from "./ProfileSettings"
import FollowedArtists from "./FollowedArtists"
import FollowedShows from "./FollowedShows"
import UpcomingShows from "./UpcomingShows"
import ArtistShows from "./ArtistShows"
import styles from './Profile.module.scss'
import { checkAccessToken } from "@/app/utils/checkAccessToken"

export default function Profile() {
  const dispatch = useAppDispatch();
  const user = useAppSelector(state => state.userInfo.user)
  const [profileIsOpen, setProfileIsOpen] = useState(true);
  const [artistsIsOpen, setArtistsIsOpen] = useState(false);
  const [showsIsOpen, setShowsIsOpen] = useState(false);
  const [upcomingIsOpen, setUpcomingIsOpen] = useState(false);
  const [artistShowsIsOpen, setArtistsShowsIsOpen] = useState(false);
  const router = useRouter();

  const profileHandler = () => {
    setProfileIsOpen(true);
    setArtistsIsOpen(false);
    setShowsIsOpen(false);
    setUpcomingIsOpen(false);
    setArtistsShowsIsOpen(false);
  }
  const artistsHandler = () => {
    setArtistsIsOpen(true);
    setProfileIsOpen(false);
    setShowsIsOpen(false);
    setUpcomingIsOpen(false);
    setArtistsShowsIsOpen(false);
  }
  const showsHandler = () => {
    setShowsIsOpen(true);
    setProfileIsOpen(false);
    setArtistsIsOpen(false);
    setUpcomingIsOpen(false);
    setArtistsShowsIsOpen(false);
  }
  const artistShowsHandler = () => {
    setArtistsShowsIsOpen(true);
    setShowsIsOpen(false);
    setProfileIsOpen(false);
    setArtistsIsOpen(false);
    setUpcomingIsOpen(false);
  }
  const upcomingHandler = () => {
    setUpcomingIsOpen(true);
    setProfileIsOpen(false);
    setArtistsIsOpen(false);
    setShowsIsOpen(false);
    setArtistsShowsIsOpen(false);
 
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
            {user?.role === 'artist' ? 
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
            </ul>
              :
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
            {profileIsOpen && <ProfileSettings />}
            {artistsIsOpen && <FollowedArtists />}
            {showsIsOpen && <FollowedShows />}
            {upcomingIsOpen && <UpcomingShows />}
            {artistShowsIsOpen && <ArtistShows />}
          </div>
        </section>
    </>
  )
}
