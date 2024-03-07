import { IEvent } from '@/app/types/interfaces';
import PaginatedItems from '../../Shows/Paginate/Paginate';
import styles from './LiveConcerts.module.scss'

async function getShows(){
    const res = await fetch(`${process.env.BACKEND_URL}/concerts/?status=live`)
    const data = await res.json();
    return data
}

export default async function LiveConcerts() {
    let shows: IEvent[] = await getShows()
    return (
    <section>
        <div className={styles.titleWrapper}>
            <span className={styles.span}></span>
            <h5 className={styles.title}>Live</h5>
        </div>
        <div className={styles.shows}>
        {
            shows && shows.length > 0 ?
            <PaginatedItems itemsPerPage={6} items={shows} type='followedShows'/>
            :
            <h6 className={styles.showsException}>Sorry! No live shows yet 🥲</h6>
        }
        </div>
    </section>
  )
}
