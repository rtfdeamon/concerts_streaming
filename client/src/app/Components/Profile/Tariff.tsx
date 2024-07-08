'use client'
import TariffPaypalModal from './TariffPaypalModal'
import { Button } from '@/shadComponents/ui/button'
import Image from 'next/image'
import Smile from '../../../../public/smile.svg'
import Heart from '../../../../public/heart.svg'
import Flame from '../../../../public/flame.svg'
import styles from './Tariff.module.scss'
import { useState } from 'react'

export default function Tariff() {
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [variant, setVariant] = useState('');
    const openModalHandler = (variant: string) => {
        setVariant(variant)
        setModalIsOpen(true)
    } 
    return (
    <section className={styles.sectionWrapper}>
        {modalIsOpen && <TariffPaypalModal isOpen={modalIsOpen} setIsOpen={setModalIsOpen} variant={variant} />}
        <h5 className={styles.title}>Choose your tariff plan</h5>
        <div className={styles.tariffWrapper}>
            <div className={styles.tariffItem}>
                <h6 className={styles.subtitle}>Basic</h6>
                <Image className={styles.image} src={Smile} width={100} height={100} alt='Heart' />
                <p className={styles.price}>9,99$</p>
                <span className={styles.concertsCount}>1 event</span>
                <Button className={styles.btn}
                    onClick={() => openModalHandler('basic')}
                >Take a plan</Button>
            </div>
            <div className={styles.tariffItem}>
                <h6 className={styles.subtitle}>Advanced</h6>
                <Image className={styles.image} src={Flame} width={100} height={100} alt='Heart' />
                <p className={styles.price}>12,99$</p>
                <span className={styles.concertsCount}>2 events</span>
                <Button className={styles.btn}
                    onClick={() => openModalHandler('advanced')}
                >Take a plan</Button>
            </div>
            <div className={styles.tariffItem}>
                <h6 className={styles.subtitle}>Professional</h6>
                <Image className={styles.image} src={Heart} width={100} height={100} alt='Heart' />
                <p className={styles.price}>15,99$</p>
                <span className={styles.concertsCount}>All access</span>
                <Button className={styles.btn}
                    onClick={() => openModalHandler('professional')}
                >Take a plan</Button>
            </div>
        </div>
    </section>
  )
}
