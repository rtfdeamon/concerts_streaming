import { useState } from 'react';
import ReactPaginate from 'react-paginate';
import { IArtistsRequests } from './ArtistsRequests';
import Link from 'next/link';
import Image from 'next/image';
import Women from '../../../../../public/women.jpg'
import X from '../../../../../public/xBlack.svg'
import Accept from '../../../../../public/plus.svg'
import styles from './ArtistsRequests.module.scss'

interface ISelect{
    selected: number;
}

function Items(artists:IArtistsRequests) {
  return (
    <>
        {artists.artists &&  artists.artists.map((a, i) => (
            <div key={i} className={styles.requestWrapper}>
                <div className={styles.showWrapper}>
                <Link className={styles.showLink} href={`/preview/Example%202`} >Show: ExampleShow1</Link>
                  <div className={styles.request}>
                  <Link href={`/artist/${a.name}`} className={styles.imageWrapper}>
                      <Image src={Women} width={80} height={80} alt="artistIcon" />
                      <p>{a.name}</p>
                  </Link>
                  <div className={styles.fileWrapper}>
                      <p>{a.fileName}</p>
                      <audio controls src="">
                      </audio>
                  </div>
                  <div className={styles.controls}>
                      <Image src={Accept} width={40} height={40} alt="accept" title="Accept" />
                      <Image src={X} width={40} height={40} alt="x" title="Decline" />
                  </div>
                  </div>
              </div>
            </div>
        ))}
    </>
  );
}



export function ArtistsPaginate({itemsPerPage, artists}:{itemsPerPage: number, artists: IArtistsRequests}) {
  // Here we use item offsets; we could also use page offsets
  // following the API or data you're working with.
  const [itemOffset, setItemOffset] = useState(0);

  // Simulate fetching items from another resources.
  // (This could be items from props; or items loaded in a local state
  // from an API endpoint with useEffect and useState)
  const endOffset = itemOffset + itemsPerPage;
  console.log(`Loading items from ${itemOffset} to ${endOffset}`);
  const currentItems = artists.artists.slice(itemOffset, endOffset);
  const pageCount = Math.ceil(artists.artists.length / itemsPerPage);

  // Invoke when user click to request another page.
  const handlePageClick = (event: ISelect) => {
    const newOffset = (event.selected * itemsPerPage) % currentItems.length;
    console.log(
      `User requested page number ${event.selected}, which is offset ${newOffset}`
    );
    setItemOffset(newOffset);
  };

  return (
    <>
      <Items artists={currentItems} />
      {currentItems.length >= 4 && 
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