'use client'
import { useEffect } from "react"
import { useAppDispatch, useAppSelector } from "@/app/hooks/rtkHooks"
import { getShowByFilter } from "@/app/store/shows/showsSlice"
import HeaderWithoutBanner from "@/app/Components/Header/HeaderWithouBanner"
import ShowsByDate from "@/app/Components/Shows/ShowsByDate/ShowsByDate"

export default function page() {
  const shows = useAppSelector(state => state.shows.events);
  useEffect(() => {
    const today = new Date();
    const lastWeek = new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000);
    dispatch(getShowByFilter({to: today.toISOString(), from: lastWeek.toISOString()}));
  }, [])
  const dispatch = useAppDispatch();

  return (
      <>
        <HeaderWithoutBanner />
        <ShowsByDate shows={shows} />
      </>
  )
}
