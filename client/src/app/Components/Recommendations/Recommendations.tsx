import Loading from '../Loading/Loading'
import { IArtist } from '@/app/types/interfaces'
import Women from '../../../../public/women.jpg'
import Link from 'next/link'
import Image from 'next/image'
import styles from './Recommendations.module.scss'

export const dynamic = 'force-dynamic'

async function getShows(){
  const res = await fetch(`${process.env.BACKEND_URL}/artists/trending/`)
  const data = await res.json()
  return data;
}

export default async function Recommendations() {
  let artists: IArtist[] = await getShows();
  return (
    <>
        <section className={styles.section}>
            <h5 className={styles.title}>Trending artists</h5>
            <div className={styles.artistsWrapper}>
              {artists 
                ? artists.map((a, i) => (
                  <div className={styles.artistWrapper} key={i}>
                      <Link className={styles.linkWrapper} href={`/artist/${a.id}`}>
                          <Image src={typeof a.avatar_url !== 'object' ? a.avatar_url : Women} width={120} height={120} alt={'fds'} />
                          <div className={styles.artistInfo}>
                            <p className={styles.artistName}>{a.name}</p>
                            {/* <span className={styles.genre}>{a.}</span> */}
                          </div>
                      </Link>
                  </div>
                ))
                :<Loading />
              }
            </div>
        </section>
    </>
  )
}
