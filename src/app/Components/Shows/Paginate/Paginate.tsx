import React, { useEffect, useState } from 'react';
import ReactPaginate from 'react-paginate';
import Link from 'next/link';
import Image from 'next/image';
import CalendarIcon from '../../../../../public/../public/calendar-range.svg'
import Show from '../../../../../public/show.jpg'
import { IShows } from '../Shows';
import styles from '..//ShowsByDate/ShowsByDate.module.scss'

interface ISelect{
        selected: number;
}

function Items(shows: IShows) {
    return (
      <>
        {shows &&
          shows.shows.map((s, i) => (
            <Link className={styles.wrapper} href={`/shows/${s.title}`} key={i}>
            <h5 className={styles.title}>{s.title}</h5>
            <span className={styles.place}>{s.place}</span>
              <Image className={styles.img} src={Show} width={300} height={75}  alt={s.title}/>
            <span className={styles.date}>
              <Image src={CalendarIcon} width={30} height={20} alt={s.title}/>
              {s.date}
            </span>
          </Link>
          ))}
      </>
    );
  }

  export default function PaginatedItems({itemsPerPage, items, type}: {itemsPerPage: number, items: IShows, type?: string}){
    // Here we use item offsets; we could also use page offsets
    // following the API or data you're working with.
    const [itemOffset, setItemOffset] = useState(0);
  
    // Simulate fetching items from another resources.
    // (This could be items from props; or items loaded in a local state
    // from an API endpoint with useEffect and useState)
    const endOffset = itemOffset + itemsPerPage;
    console.log(`Loading items from ${itemOffset} to ${endOffset}`);
    const currentItems = items.shows.slice(itemOffset, endOffset);
    const pageCount = Math.ceil(items.shows.length / itemsPerPage);
  
    // Invoke when user click to request another page.
    const handlePageClick = (event:ISelect) => {
      const newOffset = (event.selected * itemsPerPage) % items.shows.length;
      console.log(
        `User requested page number ${event.selected}, which is offset ${newOffset}`
      );
      setItemOffset(newOffset);
    };
  
    return (
      <>
        <Items shows={currentItems} />
        <div className={!type ? styles.paginate : styles.followedShowsPaginate}>
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
        </div>
      </>
    );
  }
