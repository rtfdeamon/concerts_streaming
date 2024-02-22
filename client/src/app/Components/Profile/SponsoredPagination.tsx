'use client'
import React, { useState } from 'react';
import ReactPaginate from 'react-paginate';
import Link from 'next/link';
import Image from 'next/image';
import CalendarIcon from '../../..//../public/calendar-range.svg'
import { IAd } from '@/app/types/interfaces';
import styles from './SponsoredPagination.module.scss'

interface ISelect{
        selected: number;
}

function Items({items}: {items: IAd[]}) {
    return (
      <>
      <div className={styles.shows}>
          {items &&
            items.map((s, i) => (
            <>
              <Link href={`/preview/${s.id}`} className={styles.wrapper} key={i}>
                    <span className={styles.title}>{s.concert.name}</span>
                        <span className={styles.place}>{s.concert.description}</span>
                        <Image className={styles.img} src={s.concert.poster_url} width={300} height={200}  alt={s.concert.name}/>
                        <span className={styles.date}>
                        <Image src={CalendarIcon} width={30} height={20} alt={s.concert.name}/>
                        {new Date(s.concert.date).toUTCString()}
                    </span>
                </Link>
                <div>
                    <span>Suggested banner:</span>
                    <Image src={s.banner_url} width={300} height={150} alt='banner'/>
                    <span>Status: {s.status}</span>
                </div>
            </>
            ))}
        </div>
      </>
    );
  }

  export default function SponsoredPagination({itemsPerPage, items}: {itemsPerPage: number, items: IAd[]}){
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
        <Items items={currentItems} />
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
