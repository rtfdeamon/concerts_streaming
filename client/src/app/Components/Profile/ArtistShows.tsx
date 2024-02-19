import { ArtistShowsPaginate } from './ArtistShowsPaginate'
import styles from './ArtistShows.module.scss'
import { IAcceptedShow } from '@/app/types/interfaces';

async function getShows(){
  const res = await fetch(`${process.env.BACKEND_URL}/concerts/`);
  const data = await res.json();
  return data;
}

export default async function ArtistShows() {
  let shows: IAcceptedShow[] = [];
  shows = await getShows();
  return (
    <section className={styles.wrapper}>
      <h5 className={styles.title}>My shows</h5>
      {
          shows.length >0 ? <ArtistShowsPaginate  itemsPerPage={4} shows={shows}/>
          :
          <div className={styles.showsException}>
              Sorry! No shows yet 🥲
          </div>
      }
    </section>
  )
}
