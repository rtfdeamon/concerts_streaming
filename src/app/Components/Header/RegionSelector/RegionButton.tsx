'use client'
import { Button } from '@/shadComponents/ui/button'
import MapPin from '../../../../../public/map-pin.svg'
import { Dispatch, SetStateAction } from 'react'
import Image from 'next/image'
import styles from './RegionButton.module.scss'

export default function RegionButton({modalIsOpen, setModalIsOpen}:{modalIsOpen: boolean, setModalIsOpen: Dispatch<SetStateAction<boolean>>}) {
  const onClickHandler = () => {
    setModalIsOpen(!modalIsOpen)
  }
  return (
    <Button
      className={styles.button}
      onClick={() => onClickHandler()}
    >
        <Image src={MapPin} width={25} height={20} alt='Geo'/> Berlin, Germany
    </Button>
  )
}
