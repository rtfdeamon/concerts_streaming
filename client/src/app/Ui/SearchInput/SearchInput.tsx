'use client'
import { useState, useEffect } from 'react'
import { useAppDispatch } from '@/app/hooks/rtkHooks'
import { setOpen } from '@/app/store/modal/modal-slice'
import useDebounce from '@/app/hooks/useDebounce'
import { ChangeEvent } from 'react'
import { Input } from '@/shadComponents/ui/input'
import SearchModal from './SearchModal/SearchModal'
import { IArtist, IEvent, IResult } from '@/app/types/interfaces'
import styles from './input.module.scss'

export default function SearchInput(
    {placeholder, variant}:
    {placeholder:string, variant: string}) {
    const dispatch = useAppDispatch();
    const [searchValue, setSearchValue] = useState('');
    const [isOpen, setIsOpen] = useState(false);
    const [results, setResults] = useState<IResult>();
    const [isSearching, setIsSearching] = useState(false);
    const debouncedSearchTerm = useDebounce(searchValue, 500);

    const getArtists = async (searchValue: string) => {
      try{
        const res = await fetch(`${process.env.BACKEND_URL}/artists/?filter=${searchValue}`)
        const data: IArtist[] = await res.json();
        return data;
      } catch{
        return []
      }
    }
    const getShows = async (searchValue: string) => {
      try{
        const res = await fetch(`${process.env.BACKEND_URL}/concerts/?filter=${searchValue}`)
        const data: IEvent[] = await res.json();
        return data;
      } catch{
        return []
      }

    }
    const resultHelper = async (debouncedSearchTerm: string) => {
      setIsSearching(true);
      let artists = await getArtists(debouncedSearchTerm);
      let shows = await getShows(debouncedSearchTerm)
      setResults({
        artists,
        shows
      })
      setIsSearching(false);
      dispatch(setOpen(true))
      setIsOpen(true);
    }
    useEffect(
      () => {
        if (debouncedSearchTerm) {
          resultHelper(debouncedSearchTerm)
        }
      },
      [debouncedSearchTerm]
    );

    const onChangeHandler = (e:ChangeEvent<HTMLInputElement>) => {
      setSearchValue(e.target.value);
    }

  return (
    <>
      <SearchModal
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        isSearching={isSearching}
        results={results}
        />
      <div className={variant === 'header' ? styles.inputHeader : styles.inputDefault}>
          <span></span>
          <Input
            className={styles.searchInput}
            onChange={(e) => onChangeHandler(e)}
            type="text"
            placeholder={placeholder} />
      </div>
    </>
  )
}
