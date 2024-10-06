'use client'
import { useEffect } from "react"
import { useAppDispatch, useAppSelector } from "@/app/hooks/rtkHooks"
import { getShowByFilter } from "@/app/store/shows/showsSlice"
import HeaderWithoutBanner from "@/app/Components/Header/HeaderWithouBanner"
import ShowsByDate from "@/app/Components/Shows/ShowsByDate/ShowsByDate"
import { CSTTimeZoneOptions } from "@/app/utils/constants"
import { getIsoStringDate } from "@/app/utils/getIsoStringDate"

export default function page() {
  const shows = useAppSelector(state => state.shows.events).filter(show => new Date(show.date) > new Date(Date.now()));
  useEffect(() => {
    const today = new Date();
    const yesterday = new Date(Date.now()-86400000)
    dispatch(getShowByFilter({to: getIsoStringDate(today.toLocaleString('en-US', CSTTimeZoneOptions)), from: getIsoStringDate(yesterday.toLocaleString('en-US', CSTTimeZoneOptions))}))
  }, [])
  const dispatch = useAppDispatch();

  return (
      <>
        <HeaderWithoutBanner />
        <ShowsByDate shows={shows} />
      </>
  )
}
