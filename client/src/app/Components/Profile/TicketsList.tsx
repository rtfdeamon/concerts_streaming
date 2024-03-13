'use client'
import { useState, useEffect } from 'react'
import { getTokenForApi } from '@/app/utils/getTokenForApi'
import Loading from '../Loading/Loading'
import Image from 'next/image'
import Link from 'next/link'
import { ITicket } from '@/app/types/interfaces'
import styles from './TicketsList.module.scss'

export default function TicketsList() {
    const [ticketInfo, setTicketInfo] = useState<ITicket[] | []>([]);
    const [isLoaded, setIsLoaded] = useState(true);
    useEffect(() => {
        async function getTicketInfo(){
            const res = await fetch(`${process.env.BACKEND_URL}/tickets/`, {
                method: 'GET',
                headers: {
                    'Authorization':`Bearer ${await getTokenForApi()}`,
                    'Content-type':'application/json'
                },
            })
            const data: any = await res.json();
            setTicketInfo(data);
            setIsLoaded(false);
        }
        getTicketInfo();
    }, [])
    return (
    <section className={styles.sectionWrapper}>
        <div className={styles.titleWrapper}>
            <h5 className={styles.title}>My tickets</h5>
        </div>
        <div className={styles.shows}>
            {
                ticketInfo && ticketInfo.length > 0 &&
                    <div className={styles.ticketInfos}>
                        {ticketInfo.map((t) => (
                            <Link key={t.id} className={styles.link} href={`${process.env.FRONTEND_URL}/preview/${t.concert.id}`} >
                                <h5 className={styles.concTitle}>{t.concert.name}</h5>
                                {t.concert.poster_url !== '' && typeof t.concert.poster_url !=='undefined' &&
                                <Image className={styles.poster} src={t.concert.poster_url} width={250} height={150} alt='Poster' />}
                                <span className={styles.genre}>{t.concert.category}</span>
                            </Link>
                        ))}
                    </div>
            }
            {isLoaded && <Loading />}
            {!isLoaded && ticketInfo?.length === 0 && 
                <h6 className={styles.showsException}>Sorry! You haven't bought any tickets yet  🥲</h6>
            }
        </div>
    </section>
  )
}
