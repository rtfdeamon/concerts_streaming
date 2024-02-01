'use client'
import { Fragment } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { Dispatch, SetStateAction } from 'react'
import { Button } from '@/shadComponents/ui/button'
import Link from 'next/link'
import Image from 'next/image'
import Women from '../../../../../public/women.jpg'
import styles from './SearchModal.module.scss'

export default function SearchModal({isOpen, setIsOpen, results, isSearching}:
    {isOpen: boolean, setIsOpen: Dispatch<SetStateAction<boolean>>,
    results: any, isSearching: boolean
    }) {

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
              <h5 className={styles.Title}>Artists</h5>
                <div className={styles.artistsWrapper}>
                    {results?.map((r: any, i: number) => (
                        <Link href={`/artist/${i}`} key={i} className={styles.artist}>
                            <Image className={styles.Image} src={Women} width={300} height={300} alt={r.artistName} />
                            <span className={styles.artistName}>{r.artistName}</span>
                        </Link>
                    ))}
                </div>
                <h5 className={styles.Title}>Shows</h5>
                <div className={styles.artistsWrapper}>
                    {results?.map((r: any, i: number) => (
                        <Link href={`/artist/${i}`} key={i} className={styles.artist}>
                            <Image className={styles.Image} src={Women} width={300} height={300} alt={r.artistName} />
                            <span className={styles.artistName}>{r.artistName}</span>
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
