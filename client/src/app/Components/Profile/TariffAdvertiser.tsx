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

export default function TariffAdvertiser() {
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
    } else if (user?.role.includes('sponsor')){
        role = 'Advertiser'
    } else {
        role = 'Artist'
    }
    return (
    <section className={styles.sectionWrapper}>
        {modalIsOpen && <TariffPaypalModal isOpen={modalIsOpen} setIsOpen={setModalIsOpen} variant={variant} />}
        <h5 className={styles.title}>Choose your { role } plan</h5>
            {
                                            //@ts-ignore
            user?.plan?.is_paid && (
                <>
                    <p className='text-xl text-center mt-6 mb-6'>Current plan: 
                    {                                   //@ts-ignore
                        user?.plan?.plan === '00000001-8000-11ee-8000-102030405060' && ' Basic'
                            ||                                 //@ts-ignore
                        user?.plan?.plan === '00000002-8000-11ee-8000-102030405060' && ' Advanced'
                            ||                                 //@ts-ignore
                        user?.plan?.plan === '00000003-8000-11ee-8000-102030405060' && ' Professional'
                        ||                                 //@ts-ignore
                        user?.plan?.plan === '00000010-8000-11ee-8000-102030405060' && ' Service'
                    }</p>
                    <span className='text-xl text-center mb-6'>Active untill: {
                                                    //@ts-ignore
                    new Date(user?.plan?.end_date).toLocaleDateString()}</span>
                </>
            )}
            <div className={styles.tariffWrapper}>
                <div className={styles.tariffItem} style={{height: '370px'}}>
                    <h6 className={styles.subtitle}>3 month</h6>
                    <Image className={styles.image} src={Smile} width={100} height={100} alt='Heart' />
                    <p className={styles.price}>$599</p>
                    <Button className={styles.btn}
                        onClick={() => openModalHandler('3 month')}
                    >Take a plan</Button>
                    <p className={styles.payInfo}>
                        *3-month access to promote your advertisement
                    </p>
                </div>
                <div className={styles.tariffItem} style={{height: '370px'}}>
                    <h6 className={styles.subtitle}>6 months</h6>
                    <Image className={styles.image} src={Flame} width={100} height={100} alt='Heart' />
                    <p className={styles.price}>$799</p>
                    <Button className={styles.btn}
                        onClick={() => openModalHandler('6 months')}
                    >Take a plan</Button>
                    <p className={styles.payInfo}>
                        *6-month access to promote your advertisement
                    </p>
                </div>
                <div className={styles.tariffItem} style={{height: '370px'}}>
                    <h6 className={styles.subtitle}>9 months</h6>
                    <Image className={styles.image} src={Heart} width={100} height={100} alt='Heart' />
                    <p className={styles.price}>$999</p>
                    <Button className={styles.btn}
                        onClick={() => openModalHandler('9 months')}
                    >Take a plan</Button>
                    <p className={styles.payInfo}>
                        *9-month access to promote your advertisement
                    </p>
                </div>
            </div>
            <div className="flex flex-col justify-center items-center mt-[-35px]">
              <h6>“Disallowed Businesses for Advertising”</h6>
              <p className="mt-6 max-w-[80%] ">
                Tobacco & related of age products (including vape), Firearms and related of age products, Alcohol, Adult Products (Sexual, toys, lubricants, condoms, gels, clothing and any of age related products), Pharmaceuticals - drugs of any type requiring age buyer for prescribed or OTC.
              </p>
            </div>
    </section>
  )
}
