'use client'
import TariffPaypalModal from './TariffPaypalModal'
import { Button } from '@/shadComponents/ui/button'
import Image from 'next/image'
import Smile from '../../../../public/smile.svg'
import Heart from '../../../../public/heart.svg'
import Flame from '../../../../public/flame.svg'
import styles from './Tariff.module.scss'
import { useState } from 'react'
import { useAppSelector } from '@/app/hooks/rtkHooks'

export default function Tariff() {
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [variant, setVariant] = useState('');
    const user = useAppSelector(state => state.userInfo.user)
    const openModalHandler = (variant: string) => {
        setVariant(variant)
        setModalIsOpen(true)
    } 
    let role: string
    if (user?.role.includes('service')){
        role = 'Service'
    } else if (user?.role.includes('advertiser')){
        role = 'Advertiser'
    } else {
        role = 'Artist'
    }
    return (
    <section className={styles.sectionWrapper}>
        {modalIsOpen && <TariffPaypalModal isOpen={modalIsOpen} setIsOpen={setModalIsOpen} variant={variant} />}
        <h5 className={styles.title}>Choose your { role } plan</h5>
            {user?.plan?.is_paid && (
                <>
                    <p className='text-xl text-center mt-6 mb-6'>Current plan: 
                    {
                        user?.plan?.plan === '00000001-8000-11ee-8000-102030405060' && ' Basic'
                            ||
                        user?.plan?.plan === '00000002-8000-11ee-8000-102030405060' && ' Advanced'
                            ||
                        user?.plan?.plan === '00000003-8000-11ee-8000-102030405060' && ' Professional'
                        ||
                        user?.plan?.plan === '00000010-8000-11ee-8000-102030405060' && ' Service'
                    }</p>
                    <span className='text-xl text-center mb-6'>Active untill: {new Date(user?.plan?.end_date).toLocaleDateString()}</span>
                </>
            )}
            <div className={styles.tariffWrapper}>
                {user?.role.includes('service') ? (
                <div className={styles.tariffItem}>
                <h6 className={styles.subtitle}>Basic</h6>
                <Image className={styles.image} src={Smile} width={100} height={100} alt='Heart' />
                <p className={styles.price}>29,99$</p>
                <Button className={styles.btn}
                    onClick={() => openModalHandler('service')}
                >Take a plan</Button>
            </div>
                )
                :
                <>
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
                </>
                }
            </div>
    </section>
  )
}
