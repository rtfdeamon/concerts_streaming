'use client'
import { useState, useEffect } from 'react';
import { getTokenForApi } from '@/app/utils/getTokenForApi';
import HeaderWithoutBanner from '../Header/HeaderWithouBanner'
import { ArtistsPaginate } from '../ArtistsPaginate/ArtistsPaginate';
import Loading from '../Loading/Loading';
import PaginatedItems from '../Shows/Paginate/Paginate';
import { IPreviewParams } from '@/app/genre/[id]/page'
import { IArtist, IEvent } from '@/app/types/interfaces';
import styles from './InfoByGenre.module.scss'

async function getData(id:string, isArtists?: boolean) {
    console.log(!isArtists && id ==='all')
    let res
    if (!isArtists && id ==='all'){
        res = await fetch(`${process.env.BACKEND_URL}/concerts/`);
        const data = await res.json();
        return data
    } 
    if (!isArtists){
        res = await fetch(`${process.env.BACKEND_URL}/concerts/?category=${id}`);
        const data = await res.json();
        return data
    }
    if (isArtists){
        res = await fetch(`${process.env.BACKEND_URL}/artists/?category=${id}`);
        const data = await res.json();
        return data
    }
    if (isArtists && id ==='all'){
        res = await fetch(`${process.env.BACKEND_URL}/artists/`);
        const data = await res.json();
        return data
    }
}

export default function InfoByGenre({params, isArtists}:{params: IPreviewParams, isArtists?: boolean}) {
    const [artistData, setArtistData] = useState<IArtist[]>([]);
    const [eventData, setEventData] = useState<IEvent[]>([]);
    const [isLoaded, setIsLoaded] = useState(true);
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
            .finally(() => {
                setIsLoaded(false)
            })
    }, [])
    return (
    <section>
        <HeaderWithoutBanner />
        <h5 className={styles.title}>{isArtists ? <span>{id} artists</span> : <span>{id} shows</span>}</h5>
        <div className={styles.wrapper}>
            {isArtists ? 
                !isLoaded  && artistData.length === 0 ?
                <div className={styles.showsException}>
                    Sorry! No artist in {id} genre yet 🥲
                </div>
                :
                <ArtistsPaginate  itemsPerPage={15} artists={artistData}/>
                :
                !isLoaded && eventData.length === 0 ? 
                    <div className={styles.showsException}>
                        Sorry! No shows in {id} genre yet 🥲
                    </div>
                :
                <PaginatedItems  itemsPerPage={6} items={eventData} type='genres'/>
            }
            {isLoaded && <Loading />}
        </div>
    </section>
  )
}
