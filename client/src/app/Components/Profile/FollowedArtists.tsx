import Image from 'next/image'
import Link from 'next/link'
import Women from '../../../../public/women.jpg'
import styles from './FollowedArtists.module.scss'

const artists = [
  {
    artistName: 'Artist 1',
    genre: 'Rock'
  },
  {
    artistName: 'Artist 2',
    genre: 'Rock'
  },
  {
    artistName: 'Artist 3',
    genre: 'Rock'
  },
  {
    artistName: 'Artist 4',
    genre: 'Alternative'
  },
  {
    artistName: 'Artist 5',
    genre: 'Folk'
  },
  {
    artistName: 'Artist 6',
    genre: 'Pop'
  },
  {
    artistName: 'Artist 7',
    genre: 'Rock'
  },
  {
    artistName: 'Artist 8',
    genre: 'Blues'
  },
  {
    artistName: 'Artist 9',
    genre: 'Rock'
  }
]

export default function FollowedArtists() {
  return (
    <div className={styles.menuWrapper}>
      <h5 className={styles.title}>My Artists</h5>
      <div className={styles.artistsWrapper}>
              {artists.map((a, i) => (
                <div className={styles.artistWrapper} key={i}>
                    <Link className={styles.linkWrapper} href={`/artists/${a.artistName}`}>
                        <Image src={Women} width={120} height={120} alt={'fds'} />
                        <div className={styles.artistInfo}>
                          <p className={styles.artistName}>{a.artistName}</p>
                          <span className={styles.genre}>{a.genre}</span>
                        </div>
                    </Link>
                </div>
              ))}
            </div>
    </div>
  )
}
