'use client'
import { useState, useEffect } from 'react';
import HeaderWithoutBanner from '../Header/HeaderWithouBanner'
import { ArtistsPaginate } from '../ArtistsPaginate/ArtistsPaginate';
import PaginatedItems from '../Shows/Paginate/Paginate';
import { IPreviewParams } from '@/app/genre/[id]/page'
import { IArtist, IEvent } from '@/app/types/interfaces';
import styles from './InfoByGenre.module.scss'

async function getData(id:string, isArtists?: boolean) {
    let res
    if (!isArtists){
        res = await fetch(`${process.env.BACKEND_URL}/concerts?category=${id}`);
    } else {
        res = await fetch(`${process.env.BACKEND_URL}/artists?category=${id}`);
    }
    const data = await res.json();
    return data
}

export default function InfoByGenre({params, isArtists}:{params: IPreviewParams, isArtists?: boolean}) {
    const [artistData, setArtistData] = useState<IArtist[]>([]);
    const [eventData, setEventData] = useState<IEvent[]>([]);
    const id = params.params.id;
    useEffect(() => {
        getData(id, isArtists)
            .then(res => {
                isArtists
                ? 
                    setArtistData(res)
                :
                    setEventData(res)
            })
    }, [])
    return (
    <section>
        <HeaderWithoutBanner />
        <h5 className={styles.title}>{id}</h5>
        <div className={styles.wrapper}>
            {isArtists ? 
                artistData.length >0 ? <ArtistsPaginate  itemsPerPage={15} artists={artistData}/>
                :
                <div className={styles.showsException}>
                    Sorry! No artist in {id} genre yet 🥲
                </div>
                :
                eventData.length >0 ? <PaginatedItems  itemsPerPage={6} items={eventData} type='genres'/>
                :
                <div className={styles.showsException}>
                    Sorry! No shows in {id} genre yet 🥲
                </div>
            }
        </div>
    </section>
  )
}
