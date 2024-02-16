'use client'
import { useEffect } from "react"
import { useAppDispatch, useAppSelector } from "@/app/hooks/rtkHooks"
import { getShowByFilter } from "@/app/store/shows/showsSlice"
import HeaderWithoutBanner from "@/app/Components/Header/HeaderWithouBanner"
import ShowsByDate from "@/app/Components/Shows/ShowsByDate/ShowsByDate"

export default function page() {
  const shows = useAppSelector(state => state.shows.events);
  useEffect(() => {
    const today = new Date().toISOString();
    const lastDayOfPrevMonth = new Date(new Date().setDate(0)).toISOString();
    dispatch(getShowByFilter({to: today, from: lastDayOfPrevMonth}));
  }, [])
  const dispatch = useAppDispatch();

  return (
      <>
        <HeaderWithoutBanner />
        <ShowsByDate shows={shows} />
      </>
  )
}
