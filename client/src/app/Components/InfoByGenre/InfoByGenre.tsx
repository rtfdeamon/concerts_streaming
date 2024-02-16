'use client'
import { useState, useEffect } from 'react';
import HeaderWithoutBanner from '../Header/HeaderWithouBanner'
import PaginatedItems from '../Shows/Paginate/Paginate';
import { IPreviewParams } from '@/app/genre/[id]/page'
import styles from './InfoByGenre.module.scss'
import { IEvent } from '@/app/types/interfaces';

async function getData(id:string) {
    const res = await fetch(`${process.env.BACKEND_URL}/concerts?category=${id}`)
    const data = await res.json();
    return data
}

export default function InfoByGenre({params}:IPreviewParams) {
    const [data, setData] = useState<IEvent[]>([]);
    useEffect(() => {
        getData(params.id)
            .then(res => setData(res))
    }, [])
    return (
    <section>
        <HeaderWithoutBanner />
        <h5 className={styles.title}>{params.id}</h5>
        <div className={styles.wrapper}>
            {
                data.length >0 ? <PaginatedItems  itemsPerPage={4} items={data}/>
                :
                <div className={styles.showsException}>
                    Sorry! No shows yet 🥲
                </div>
            }
        </div>
    </section>
  )
}
