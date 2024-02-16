'use client'
import { useEffect } from "react"
import { useAppDispatch, useAppSelector } from "@/app/hooks/rtkHooks"
import { loadAllShows } from "@/app/store/shows/showsSlice"
import { EventsPaginate } from "./EventsPaginate"
export default function Shows() {
    const dispatch = useAppDispatch();
    const events = useAppSelector(state => state.shows.events)
    useEffect(() => {
        dispatch(loadAllShows())
    }, [events.length])
    return (
        <EventsPaginate itemsPerPage={4} events={{events}} />
  )
}
