'use client'
import { Button } from '@/shadComponents/ui/button'
import styles from './Services.module.scss'
import { useState } from 'react'
import AddServiceModal from './AddServiceModal'
import { useAppSelector } from '@/app/hooks/rtkHooks'

export default function Services() {
    const user = useAppSelector(state => state.userInfo.user)
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [services, setServices] = useState([]);
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
            services.length > 0 ?
            <span></span>
            :
            <h5 className={styles.servicesException}>No services yet</h5>
        }
    </section>
  )
}
