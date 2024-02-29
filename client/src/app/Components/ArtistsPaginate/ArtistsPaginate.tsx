'use client'
import { useState } from 'react';
import ReactPaginate from 'react-paginate';
import { IArtist } from '@/app/types/interfaces';
import Link from 'next/link';
import Image from 'next/image';
import User from '../../../../public/user (1).svg'
import styles from './ArtistsPaginate.module.scss'

interface ISelect{
    selected: number;
}

function Items(artists:{artists: IArtist[]}) {
  return (
    <div className={styles.wrapper}>
        {artists &&  artists.artists.map((a, i) => (
            <div key={i} className={styles.requestWrapper}>
                <div className={styles.showWrapper}>
                  <div className={styles.request}>
                  <Link href={`/artist/${a.id}`} className={styles.imageWrapper}>
                      <Image src={typeof a.avatar_url !== 'object' ? a.avatar_url : User} width={80} height={80} alt="artistIcon" />
                      <p>{a.name}</p>
                  </Link>
                  </div>
              </div>
            </div>
        ))}
    </div>
  );
}



export function ArtistsPaginate({itemsPerPage, artists}:{itemsPerPage: number, artists: IArtist[]}) {
  const [itemOffset, setItemOffset] = useState(0);
  
    // Simulate fetching items from another resources.
    // (This could be items from props; or items loaded in a local state
    // from an API endpoint with useEffect and useState)
    const endOffset = itemOffset + itemsPerPage;
    console.log(`Loading items from ${itemOffset} to ${endOffset}`);
    const currentItems = artists.slice(itemOffset, endOffset);
    const pageCount = Math.ceil(artists.length / itemsPerPage);
  
    // Invoke when user click to request another page.
    const handlePageClick = (event:ISelect) => {
      const newOffset = (event.selected * itemsPerPage) % artists.length;
      console.log(
        `User requested page number ${event.selected}, which is offset ${newOffset}`
      );
      setItemOffset(newOffset);
  };

  return (
    <>
      <Items artists={currentItems} />
      {artists.length > 4 &&
        <ReactPaginate
          className={styles.paginate}
          breakLabel="..."
          nextLabel=">"
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