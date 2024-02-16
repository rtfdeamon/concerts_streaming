import { ArtistsPaginate } from '../ArtistsPaginate/ArtistsPaginate';
import { IArtist } from '@/app/types/interfaces';
import styles from './FollowedArtists.module.scss'

async function getShows(){
  const res = await fetch('')
  const data = await res.json()
  return data;
}

export default function FollowedArtists() {
  let artists: IArtist[] = [];
  getShows()
    .then(res => artists = res)
  return (
    <section>
    <h5 className={styles.title}>Followed artists</h5>
    {artists && artists.length >0 ?
          <ArtistsPaginate itemsPerPage={4} artists={artists} />
          :
          <div className={styles.showsException}>
            Sorry! You are not subscribed to any artist yet 🥲
          </div>
        }
</section>
  )
}
