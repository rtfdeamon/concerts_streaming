import { ArtistsPaginate } from '../ArtistsPaginate/ArtistsPaginate';
import { IArtist } from '@/app/types/interfaces';
import styles from './TrendingArtists.module.scss'

async function getShows(){
  const res = await fetch('')
  const data = await res.json()
  return data;
}

export default function TrendingArtists() {
  let artists: IArtist[] = [];
  getShows()
    .then(res => artists = res)
  return (
    <section>
    <h5 className={styles.title}>Trending artists</h5>
    {artists && artists.length >0 ?
          <ArtistsPaginate itemsPerPage={4} artists={artists} />
          :
          <div className={styles.showsException}>
            Sorry! No trending artists yet 🥲
          </div>
        }
</section>
  )
}
