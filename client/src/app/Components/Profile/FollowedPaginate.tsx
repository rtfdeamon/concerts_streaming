'use client'
import { useState } from 'react';
import ReactPaginate from 'react-paginate';
import { IArtist } from '@/app/types/interfaces';
import Link from 'next/link';
import Image from 'next/image';
import User from '../../../../public/user (1).svg'
import styles from './FollowedArtists.module.scss'

interface ISelect{
    selected: number;
}

function Items(artists:{artists: IArtist[]}) {
  return (
    <div className={styles.wrapper}>
        {artists &&  artists.artists.map((a, i) => (
            <div className={styles.artistWrapper} key={i}>
                <Link className={styles.linkWrapper} href={`/artist/${a.id}`}>
                    <Image src={typeof a.avatar_url !== 'object' ? a.avatar_url : User} width={100} height={100} alt={'fds'} />
                    <div className={styles.artistInfo}>
                    <p className={styles.artistName}>{a.name}</p>
                    <span className={styles.genre}>{a?.artist_genre}</span>
                    </div>
                </Link>
            </div>
        ))}
    </div>
  );
}



export function FollowedPaginate({itemsPerPage, artists}:{itemsPerPage: number, artists: IArtist[]}) {
    // Here we use item offsets; we could also use page offsets
    // following the API or data you're working with.
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
      {artists.length > 9 &&
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