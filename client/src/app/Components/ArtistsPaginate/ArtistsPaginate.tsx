'use client'
import { useState } from 'react';
import ReactPaginate from 'react-paginate';
import { IArtist } from '@/app/types/interfaces';
import Link from 'next/link';
import Image from 'next/image';
import User from '../../../../public/user (1).svg'
import styles from './ArtistsPaginate.module.scss'
import { getHostName } from '@/app/utils/getHostName';

interface ISelect{
    selected: number;
}

function Items({artists, isProfile}:{artists: IArtist[], isProfile?: boolean}) {
  return (
    <div className={styles.wrapper}>
        {artists &&  artists.map((a, i) => (
            <div key={i} className={styles.requestWrapper}>
                <div className={!isProfile ? styles.showWrapper : styles.showProfileWrapper}>
                  <div className={styles.request}>
                  <Link href={`/artist/${a.id}`} className={styles.imageWrapper}>
                      <Image className={styles.image} src={typeof a.avatar_url !== 'object' ? `${getHostName(a?.avatar_url)}` : User} width={80} height={80} alt="artistIcon" />
                      <p>{a.name}</p>
                  </Link>
                  </div>
              </div>
            </div>
        ))}
    </div>
  );
}



export function ArtistsPaginate(
  {itemsPerPage, artists, all, isArtistList, isProfile}
  :{itemsPerPage: number, artists: IArtist[],
    all?: boolean, isArtistList?: boolean, isProfile?: boolean}) {
  const [itemOffset, setItemOffset] = useState(0);
  
    // Simulate fetching items from another resources.
    // (This could be items from props; or items loaded in a local state
    // from an API endpoint with useEffect and useState)
    const endOffset = itemOffset + itemsPerPage;
    const currentItems = artists.slice(itemOffset, endOffset);
    const pageCount = Math.ceil(artists.length / itemsPerPage);
  
    // Invoke when user click to request another page.
    const handlePageClick = (event:ISelect) => {
      const newOffset = (event.selected * itemsPerPage) % artists.length;
      setItemOffset(newOffset);
  };
  return (
    <>
      <Items artists={currentItems} isProfile={isProfile} />
      {typeof all !== 'undefined' && artists.length > 15 && 
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
      {typeof all === 'undefined' && artists.length > 0 &&
        <ReactPaginate
          className={isArtistList ? styles.listPaginate : styles.paginate}
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