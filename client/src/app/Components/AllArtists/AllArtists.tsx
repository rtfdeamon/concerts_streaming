import { IArtist } from '@/app/types/interfaces'
import { ArtistsPaginate } from '../ArtistsPaginate/ArtistsPaginate'
import styles from './AllArtists.module.scss'

async function getShows(){
  const res = await fetch('')
  const data = await res.json()
  return data;
}

export default async function AllArtists() {
  let artists: IArtist[] = [];
  getShows()
    .then(res => artists = res)
  return (
    <section>
        <h5 className={styles.title}>All artists</h5>
        {/* artists paginate */}
        {artists && artists.length >0 ?
          <ArtistsPaginate itemsPerPage={4} artists={artists} />
          :
          <div className={styles.showsException}>
            Sorry! No artists yet 🥲
          </div>
        }
    </section>
  )
}
