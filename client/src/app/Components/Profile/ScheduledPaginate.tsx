'use client'
import React, { useState } from 'react';
import ReactPaginate from 'react-paginate';
import Link from 'next/link';
import Image from 'next/image';
import CalendarIcon from '../../../../public/calendar-range.svg'
import { IEvent } from '@/app/types/interfaces';
import styles from './ScheduledShows.module.scss'

interface ISelect{
        selected: number;
}

function Items({shows}: {shows: IEvent[]}) {
    return (
      <>
      <div className={styles.shows}>
          {shows &&
            shows.map((s, i) => (
              <Link href={`/preview/${s.id}`} className={styles.wrapper} key={i}>
                <span className={styles.title}>{s.name}</span>
                <span className={styles.place}>{s.description}</span>
                  <Image className={styles.img} src={s.poster_url} width={300} height={200}  alt={s.name}/>
                <span className={styles.date}>
                  <Image src={CalendarIcon} width={30} height={20} alt={s.name}/>
                  {new Date(s.date).toUTCString()}
                </span>
            </Link>
            ))}
        </div>
      </>
    );
  }

  export default function ScheduledPaginate({itemsPerPage, items}: {itemsPerPage: number, items: IEvent[]}){
    // Here we use item offsets; we could also use page offsets
    // following the API or data you're working with.
    const [itemOffset, setItemOffset] = useState(0);
  
    // Simulate fetching items from another resources.
    // (This could be items from props; or items loaded in a local state
    // from an API endpoint with useEffect and useState)
    const endOffset = itemOffset + itemsPerPage;
    const currentItems = items.slice(itemOffset, endOffset);
    const pageCount = Math.ceil(items.length / itemsPerPage);
  
    // Invoke when user click to request another page.
    const handlePageClick = (event:ISelect) => {
      const newOffset = (event.selected * itemsPerPage) % items.length;
      setItemOffset(newOffset);
    };
  
    return (
      <>
        <Items shows={currentItems} />
        <div className={styles.paginate}>
          {
              items.length > 4 &&
                <ReactPaginate
                  nextLabel=">"
                  onPageChange={handlePageClick}
                  pageRangeDisplayed={0}
                  activeClassName={'active hidden'}
                  pageClassName={'hidden'}
                  breakClassName={'hidden'}
                  pageCount={pageCount}
                  previousLabel="<"
                  renderOnZeroPageCount={null}
              />
            }
        </div>
      </>
    );
  }
