'use client'
import { useState, useEffect } from 'react'
import { useAppDispatch } from '@/app/hooks/rtkHooks'
import { setOpen } from '@/app/store/modal/modal-slice'
import useDebounce from '@/app/hooks/useDebounce'
import { ChangeEvent } from 'react'
import { Input } from '@/shadComponents/ui/input'
import SearchModal from './SearchModal/SearchModal'
import { IArtists } from '@/app/Components/Recommendations/Recommendations'
import styles from './input.module.scss'

export default function SearchInput(
    {placeholder, variant}:
    {placeholder:string, variant: string}) {
    const dispatch = useAppDispatch();
    const [searchValue, setSearchValue] = useState('');
    const [isOpen, setIsOpen] = useState(false);
    const [results, setResults] = useState<any>();
    const [isSearching, setIsSearching] = useState(false);
    const debouncedSearchTerm = useDebounce(searchValue, 500);
    const artists = [
      {
        artistName: 'Artist 1',
        genre: 'Rock'
      },
      {
        artistName: 'Artist 2',
        genre: 'Rock'
      },
      {
        artistName: 'Artist 3',
        genre: 'Rock'
      },
      {
        artistName: 'Artist 4',
        genre: 'Alternative'
      },
      {
        artistName: 'Artist 5',
        genre: 'Folk'
      },
      {
        artistName: 'Artist 6',
        genre: 'Pop'
      },
      {
        artistName: 'Artist 7',
        genre: 'Rock'
      },
      {
        artistName: 'Artist 8',
        genre: 'Blues'
      },
      {
        artistName: 'Artist 9',
        genre: 'Rock'
      }
    ]
    useEffect(
      () => {
        if (debouncedSearchTerm) {
          setIsSearching(true);
          setResults(artists);
          dispatch(setOpen(true))
          setIsOpen(true);
          // api req
          // searchCharacters(debouncedSearchTerm).then(results => {
          //   setIsSearching(false);
          //   setResults(results);
          // });
        } else {
          setResults([]);
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
            onChange={(e) => onChangeHandler(e)}
            type="text"
            placeholder={placeholder} />
      </div>
    </>
  )
}
