'use client'
import { useState, useEffect } from 'react';
import HeaderWithoutBanner from '../Header/HeaderWithouBanner'
import Loading from '../Loading/Loading';
import PaginatedItems from '../Shows/Paginate/Paginate';
import styles from './Services.module.scss'

async function getData() {
    //TODO: switch url to services route
    const res = await fetch(`${process.env.BACKEND_URL}/concerts/`);
    const data = await res.json();
    return data
}

interface IService {

}

export default function Services() {
    const [serviceData, setServiceData] = useState<IService[]>([]);
    const [isLoaded, setIsLoaded] = useState(true);

    useEffect(() => {
        getData()
            .then(res => {
                setServiceData(res)
            })
            .catch(() => {
                setIsLoaded(false)   
            })
            .finally(() => {
                setIsLoaded(false)
            })
    }, [])

    return (
    <section>
        <HeaderWithoutBanner />
        <h5 className={styles.title}>Services</h5>
        <div className={styles.wrapper}>
            <PaginatedItems itemsPerPage={6} items={serviceData} type='genres'/>
            {isLoaded && <Loading />}
        </div>
    </section>
  )
}
