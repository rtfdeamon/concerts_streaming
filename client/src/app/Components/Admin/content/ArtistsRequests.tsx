
import { ArtistsPaginate } from "./ArtistsPaginate"
import styles from './ArtistsRequests.module.scss'

interface IArtistRequest {
  name: string,
  fileName: string
}

export interface IArtistsRequests {
  artists: IArtistRequest[]
}

export default function ArtistsRequests() {
  const artists = [
    {
      name: 'Alex P',
      fileName: 'Audio.mp3' 
    },
    {
      name: 'Alex P',
      fileName: 'Audio.mp3' 
    },
    {
      name: 'Alex P',
      fileName: 'Audio.mp3' 
    },
    {
      name: 'Alex P',
      fileName: 'Audio.mp3' 
    },
    {
      name: 'Alex P',
      fileName: 'Audio.mp3' 
    },
    {
      name: 'Alex P',
      fileName: 'Audio.mp3' 
    },
    {
      name: 'Alex P',
      fileName: 'Audio.mp3' 
    },
  ]
  return (
    <div className={styles.wrapper}>
      <h5 className={styles.title}>Artists requests</h5>
      <ArtistsPaginate itemsPerPage={4} artists={{artists}} />
    </div>
  )
}
