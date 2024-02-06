'use client'
import { useState } from "react"
import HeaderWithoutBanner from "../Header/HeaderWithouBanner"
import ProfileSettings from "./ProfileSettings"
import FollowedArtists from "./FollowedArtists"
import FollowedShows from "./FollowedShows"
import UpcomingShows from "./UpcomingShows"
import styles from './Profile.module.scss'

export default function Profile() {
  const [profileIsOpen, setProfileIsOpen] = useState(true);
  const [artistsIsOpen, setArtistsIsOpen] = useState(false);
  const [showsIsOpen, setShowsIsOpen] = useState(false);
  const [upcomingIsOpen, setUpcomingIsOpen] = useState(false);
    // const router = useRouter();
    // useEffect(() => {
    //     if (typeof window !== undefined){
    //         const authed = localStorage.getItem('authed')
    //         alert(authed)
    //         // if (!authed){
    //         //     router.push('/')
    //         // }
    //     }
    // }, [])
  const profileHandler = () => {
    setProfileIsOpen(true);
    setArtistsIsOpen(false);
    setShowsIsOpen(false);
    setUpcomingIsOpen(false);
  }
  const artistsHandler = () => {
    setArtistsIsOpen(true);
    setProfileIsOpen(false);
    setShowsIsOpen(false);
    setUpcomingIsOpen(false);
  }
  const showsHandler = () => {
    setShowsIsOpen(true);
    setProfileIsOpen(false);
    setArtistsIsOpen(false);
    setUpcomingIsOpen(false);
  }
  const upcomingHandler = () => {
    setUpcomingIsOpen(true);
    setProfileIsOpen(false);
    setArtistsIsOpen(false);
    setShowsIsOpen(false);  }
  return (
    <>
        <HeaderWithoutBanner />
        <section className={styles.wrapper}>
          <div className={styles.content}>
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
              <li
                onClick={upcomingHandler}
                className={upcomingIsOpen ? styles.active : styles.notActive}
              >Upcoming shows</li>
            </ul>
            {profileIsOpen && <ProfileSettings />}
            {artistsIsOpen && <FollowedArtists />}
            {showsIsOpen && <FollowedShows />}
            {upcomingIsOpen && <UpcomingShows />}
          </div>
        </section>
    </>
  )
}
