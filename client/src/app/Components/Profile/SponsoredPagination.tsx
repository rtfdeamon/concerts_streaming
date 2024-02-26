'use client'
import React, { useState } from 'react';
import { useAppDispatch } from '@/app/hooks/rtkHooks';
import { resAd } from '@/app/store/ads/ads-slice';
import ReactPaginate from 'react-paginate';
import { getTokenForApi } from '@/app/utils/getTokenForApi';
import Link from 'next/link';
import Image from 'next/image';
import CalendarIcon from '../../..//../public/calendar-range.svg';
import { IAd } from '@/app/types/interfaces';
import X from '../../../../public/xBlack.svg';
import Accept from '../../../../public/plus.svg';
import styles from './SponsoredPagination.module.scss';

interface ISelect{
        selected: number;
}

function Items({items, isAdmin}: {items: IAd[], isAdmin?: boolean}) {
    const dispatch = useAppDispatch();
    return (
      <>
      {!isAdmin ? 
        <div className={styles.shows}>
          {items &&
            items.map((s, i) => (
            <>
              <Link href={`/preview/${s.id}`} className={styles.wrapper} key={i}>
                    <span className={styles.title}>{s.concert.name}</span>
                        <p className={styles.suggested}>Suggested banner:</p>
                        <Image className={styles.img}  src={s.banner_url} width={300} height={150} alt='banner'/>
                        <span>Status: {s.status}</span>
                        {/* <Image className={styles.img} src={s.concert.poster_url} width={300} height={200}  alt={s.concert.name}/> */}
                        <span className={styles.date}>
                        <Image src={CalendarIcon} width={30} height={20} alt={s.concert.name}/>
                        {new Date(s.concert.date).toUTCString()}
                    </span>
                </Link>
            </>
            ))}
        </div>
      :
      <div className={styles.shows}>
      {items &&
        items.map((s, i) => (
        <>
          <div className={styles.wrapper} key={i}>
              <Link href={`/preview/${s.id}`}>
                  <span className={styles.title}>{s.concert.name}</span>
                      <p className={styles.suggested}>Suggested banner:</p>
                      <Image className={styles.img} src={s.banner_url} width={300} height={150} alt='banner'/>
                      <span className={styles.date}>
                      <Image src={CalendarIcon} width={30} height={20} alt={s.concert.name}/>
                      {new Date(s.concert.date).toUTCString()}
                    </span>
              </Link>
                <div className={styles.controls}>
                      <Image
                        onClick={() => dispatch(resAd({id: s.id, status: 'accepted'}))}
                        src={Accept} width={40} height={40} alt="accept" title="Accept" />
                      <Image
                        onClick={() => dispatch(resAd({id: s.id, status: 'rejected'}))}
                        src={X} width={40} height={40} alt="x" title="Decline" />
                  </div>
            </div>
        </>
        ))}
    </div>
      }
      </>
    );
  }

  export default function SponsoredPagination({itemsPerPage, items, isAdmin}: {itemsPerPage: number, items: IAd[], isAdmin?: boolean}){
    // Here we use item offsets; we could also use page offsets
    // following the API or data you're working with.
    const [itemOffset, setItemOffset] = useState(0);
  
    // Simulate fetching items from another resources.
    // (This could be items from props; or items loaded in a local state
    // from an API endpoint with useEffect and useState)
    const endOffset = itemOffset + itemsPerPage;
    console.log(`Loading items from ${itemOffset} to ${endOffset}`);
    const currentItems = items.slice(itemOffset, endOffset);
    const pageCount = Math.ceil(items.length / itemsPerPage);
  
    // Invoke when user click to request another page.
    const handlePageClick = (event:ISelect) => {
      const newOffset = (event.selected * itemsPerPage) % items.length;
      console.log(
        `User requested page number ${event.selected}, which is offset ${newOffset}`
      );
      setItemOffset(newOffset);
    };
  
    return (
      <>
        <Items items={currentItems} isAdmin={isAdmin} />
        <div className={styles.paginate}>
          {
              items.length > 6 &&
                <ReactPaginate
                  nextLabel=">"
                  onPageChange={handlePageClick}
                  pageRangeDisplayed={0}
                  activeClassName={'active hidden'}
                  pageClassName={'hidden'}
                  pageCount={pageCount}
                  previousLabel="<"
                  renderOnZeroPageCount={null}
              />
            }
        </div>
      </>
    );
  }
