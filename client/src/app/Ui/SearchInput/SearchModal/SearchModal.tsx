'use client'
import { useAppSelector } from '@/app/hooks/rtkHooks'
import { useEffect } from 'react'
import { setInputState } from '@/app/store/searchInput/searchInput-slice'
import { getArtists, getShows } from '../SearchInput'
import useDispatch from '@/app/hooks/useDispatch'
import useDebounce from '@/app/hooks/useDebounce'
import { Fragment } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { Dispatch, SetStateAction } from 'react'
import { Input } from '@/shadComponents/ui/input'
import { Button } from '@/shadComponents/ui/button'
import Link from 'next/link'
import Image from 'next/image'
import User from '../../../../../public/user (1).svg'
import { IResult } from '@/app/types/interfaces'
import { ChangeEvent } from 'react'
import styles from './SearchModal.module.scss'
import { A } from '@vidstack/react/dist/types/vidstack.js'
import { getHostName } from '@/app/utils/getHostName'

export default function SearchModal({isOpen, setIsOpen, results, isSearching, setResults, setIsSearching}:
    {isOpen: boolean, setIsOpen: Dispatch<SetStateAction<boolean>>,
    results: IResult | undefined, isSearching: boolean, setResults: Dispatch<SetStateAction<IResult | undefined>>
    setIsSearching: Dispatch<SetStateAction<boolean>>
    }) {
      const {dispatch} = useDispatch();
      const inputValue = useAppSelector(state => state.inputValue.value);
      const debouncedSearchTerm = useDebounce(inputValue, 500);

      const resultHelper = async (debouncedSearchTerm: string) => {
        setIsSearching(true);
        let artists = await getArtists(debouncedSearchTerm);
        let shows = await getShows(debouncedSearchTerm)
        setResults({
          artists,
          shows
        })
        setIsSearching(false);
      }
      useEffect(
        () => {
          if (debouncedSearchTerm) {
            resultHelper(debouncedSearchTerm)
          }
        },
        [debouncedSearchTerm]
      );

      const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        dispatch(setInputState(e.target.value))
      }

      const closeModal = () => {
        setIsOpen(false)
      }
  return (
    <Transition appear show={isOpen} as={Fragment}>
    <Dialog as="div" className="relative z-10" onClose={closeModal}>
      <Transition.Child
        as={Fragment}
        enter="ease-out duration-300"
        enterFrom="opacity-0"
        enterTo="opacity-100"
        leave="ease-in duration-200"
        leaveFrom="opacity-100"
        leaveTo="opacity-0"
      >
        <div className="fixed inset-0 bg-black/25" />
      </Transition.Child>

      <div className="fixed inset-0 overflow-y-auto">
        <div className="flex min-h-full items-center justify-center p-4 text-center">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 scale-95"
            enterTo="opacity-100 scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-95"
          >
            <Dialog.Panel className="w-full max-w-7xl transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
              <Dialog.Title
                as="h3"
                className={styles.title}
              >
                Results
              </Dialog.Title>
              {isSearching && <span className={styles.searching}>Searching...</span>}
              <Input
                onChange={onChangeHandler}
                className={styles.searchInput}
                type="text"
                value={inputValue}
                placeholder={'Search artists & events'} />
              {typeof results !== 'undefined' && results?.artists.length > 0 ?  
                  <h5 className={styles.Title}>Artists</h5>
                  :
                  <h5 className={styles.Title}>No artists for this query</h5>
                }
                <div className={styles.artistsWrapper}>
                    {results?.artists.map((a) => (
                        <Link href={`/artist/${a.id}`} key={a.id} className={styles.artist}>
                            <Image className={styles.Image} src={typeof a.avatar_url === 'object' ? User : `${getHostName(a?.avatar_url)}`} width={300} height={300} alt={a.name} />
                            <span className={styles.artistName}>{a.name}</span>
                        </Link>
                    ))}
                </div>
                {typeof results !== 'undefined' && results?.shows.length > 0 ?  
                  <h5 className={styles.Title}>Shows</h5>
                  :
                  <h5 className={styles.Title}>No shows for this query</h5>
                }
                <div className={styles.artistsWrapper}>
                    {results?.shows.map((s) => (
                        <Link href={`/preview/${s.id}`} key={s.id} className={styles.artist}>
                            <Image className={styles.showImage} src={typeof s.poster_url === 'object' ? User : getHostName(s.poster_url)} width={300} height={300} alt={s.name} />
                            <span className={styles.artistName}>{s.name}</span>
                        </Link>
                    ))}
                </div>
              <div className="mt-4">
              <Button
                onClick={closeModal}
                className={styles.btn}
              >Close</Button>
              </div>
            </Dialog.Panel>
          </Transition.Child>
        </div>
      </div>
    </Dialog>
  </Transition>
  )
}
