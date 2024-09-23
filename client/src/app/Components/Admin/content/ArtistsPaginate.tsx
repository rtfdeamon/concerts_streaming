import { useState } from 'react';
import { useAppDispatch } from '@/app/hooks/rtkHooks';
import { changeSessionStatus } from '@/app/store/sessions/sessionsSlice';
import ReactPaginate from 'react-paginate';
import { IArtistRequest } from '@/app/types/interfaces';
import Link from 'next/link';
import Image from 'next/image';
import User from '../../../../../public/user (1).svg'
import X from '../../../../../public/xBlack.svg'
import Accept from '../../../../../public/plus.svg'
import styles from './ArtistsRequests.module.scss'
import { Input } from '@/shadComponents/ui/input';

interface ISelect{
    selected: number;
}

function Items({sessions}: {sessions:IArtistRequest[]}) {
  const dispatch = useAppDispatch();
  const [perfomanceTime, setPerfomanceTime] = useState<number | undefined>();
  return (
    <>
        {sessions &&  sessions.map((a, i) => (
            <div key={i} className={styles.requestWrapper}>
                <div className={styles.showWrapper}>
                <Link className={styles.showLink} href={`/preview/${a.concert?.id}`} >Show: {a.concert?.name}</Link>
                {a.concert?.performance_time && <div className='flex items-center my-1 justify-center'>
                      <p style={{marginBottom: '-1px', marginLeft: '5px', fontSize: '14px', textAlign: 'center', display: 'block'}} className={styles.desc}>default perfomance time: {a.concert?.performance_time}</p>
                    </div>}
                  <div className={styles.request}>
                  <Link href={`/artist/${a.user?.id}`} className={styles.imageWrapper}>
                      <Image src={typeof a.user?.avatar_url !== 'object' ? `https://${location.host}${a?.user?.avatar_url}` : User} className={styles.image} width={80} height={80} alt="artistIcon" />
                      <p className={styles.artistName}>{a.user?.name}</p>
                  </Link>
                  <div className={styles.fileWrapper}>
                      <audio controls src={`${a.artist_demo_url}`}>
                      </audio>
                  </div>
                  <div className={styles.controls}>
                      <Image
                        onClick={() => {
                          dispatch(changeSessionStatus({id: a.id as string, status: 'accepted', performance_time: perfomanceTime}))
                        }}
                        src={Accept} width={40} height={40} alt="accept" title="Accept" />
                      <Image
                        onClick={() => dispatch(changeSessionStatus({id: a.id as string, status: 'rejected'}))}
                        src={X} width={40} height={40} alt="x" title="Decline" />
                  </div>
                  </div>
                  <div className={styles.artistMessage}>
                    <span>Request message: </span><span className={styles.desc}>{a.description}</span>
                  </div>
                  <Input className='mb-4 w-[95%] mx-auto' placeholder='Set perfomance time' type='number' min={1}  onChange={(e) => setPerfomanceTime(+e.target.value)} />
              </div>
            </div>
        ))}
    </>
  );
}



export function ArtistsPaginate({itemsPerPage, sessions}:{itemsPerPage: number, sessions: IArtistRequest[]}) {
    // Here we use item offsets; we could also use page offsets
    // following the API or data you're working with.
    const [itemOffset, setItemOffset] = useState(0);
  
    // Simulate fetching items from another resources.
    // (This could be items from props; or items loaded in a local state
    // from an API endpoint with useEffect and useState)
    const endOffset = itemOffset + itemsPerPage;
    const currentItems = sessions.slice(itemOffset, endOffset);
    const pageCount = Math.ceil(sessions.length / itemsPerPage);
  
    // Invoke when user click to request another page.
    const handlePageClick = (event:ISelect) => {
      const newOffset = (event.selected * itemsPerPage) % sessions.length;
      setItemOffset(newOffset);
    };

  return (
    <>
      <Items sessions={currentItems} />
      {sessions.length >= 3 && 
        <ReactPaginate
          className={styles.paginate}
          breakLabel="..."
          nextLabel=">"
          breakClassName={'hidden'}
          onPageChange={handlePageClick}
          pageRangeDisplayed={5}
          pageCount={pageCount}
          previousLabel="<"
          renderOnZeroPageCount={null}
      />  
      }
    </>
  );
}