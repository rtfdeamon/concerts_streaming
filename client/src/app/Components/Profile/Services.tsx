'use client'
import { Button } from '@/shadComponents/ui/button'
import styles from './Services.module.scss'
import { useEffect, useState } from 'react'
import AddServiceModal from './AddServiceModal'
import { useAppDispatch, useAppSelector } from '@/app/hooks/rtkHooks'
import { getServices } from '@/app/store/service/serviceSlice'
import { ServicesPaginate } from '../Services/ServicesPaginate/ServicesPaginate'

export default function Services() {
    const user = useAppSelector(state => state.userInfo.user)
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const services = useAppSelector(state => state.services.services)
    const dispatch = useAppDispatch()

    useEffect(() => {
        dispatch(getServices())
    }, [])

    const openModalHandler = () => {
        setModalIsOpen(true)
    } 
    return (
    <section className={styles.sectionWrapper}>
        {modalIsOpen && <AddServiceModal isOpen={modalIsOpen} setIsOpen={setModalIsOpen} />}
        <h5 className={styles.title}>Services</h5>
        <div className={styles.wrapper}>
            {user?.role.includes('service') && <Button className={styles.btn} onClick={openModalHandler}>Add service</Button>}
        </div>
        {
            //фильтровать по роли. артистам доступны все сервисы
            services.length > 0 ? (
                <ServicesPaginate artists={services} itemsPerPage={4} />
            )
            :
            <h5 className={styles.servicesException}>No services yet or you need to pay for tariff</h5>
        }
    </section>
  )
}
