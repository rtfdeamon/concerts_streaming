'use client'
import { useState, useEffect } from 'react';
import HeaderWithoutBanner from '../Header/HeaderWithouBanner'
import Loading from '../Loading/Loading';
import PaginatedItems from '../Shows/Paginate/Paginate';
import styles from './Services.module.scss'
import { getTokenForApi } from '@/app/utils/getTokenForApi';
import { ServicesPaginate } from './ServicesPaginate/ServicesPaginate';

async function getData() {
    //TODO: switch url to services route
    const res = await fetch(`${process.env.BACKEND_URL}/services/`, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${await getTokenForApi()}`
        }
    });
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
            {
                       serviceData.length > 0 ? (
                        <ServicesPaginate itemsPerPage={15} 
                                                        //@ts-ignore
                        artists={serviceData} type='genres'/>
                    )
                    :
                    <h5 className={styles.servicesException}>No services yet</h5>
            }
        </div>
    </section>
  )
}
