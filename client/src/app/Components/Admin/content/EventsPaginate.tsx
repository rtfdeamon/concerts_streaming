'use client'
import { useState } from 'react';
import { useAppDispatch } from '@/app/hooks/rtkHooks';
import { deleteShow } from '@/app/store/shows/showsSlice';
import ReactPaginate from 'react-paginate';
import { IEvents } from '@/app/types/interfaces';
import { IEvent } from '@/app/types/interfaces';
import { Button } from '@/shadComponents/ui/button';
import ChangeEventModal from './Modal/ChangeEventModal';
import Image from 'next/image';
import Link from 'next/link';
import CalendarIcon from '../../../../../public/calendar-range.svg'
import Show from '../../../../../public/show.jpg';
import Pen from '../../../../../public/pen.svg';
import X from '../../../../../public/x.svg';
import styles from './EventsPaginate.module.scss';

interface ISelect{
    selected: number;
}

function Items(events:IEvents) {
  const dispatch = useAppDispatch();
  const [isOpen, setIsOpen] = useState(false);
  const [eventId, setEventId] = useState('');
  const onChangeHandler = (id: string) => {
    setEventId(id);
    setIsOpen(true)
  }
  return (
    <>
    <ChangeEventModal isOpen={isOpen} setIsOpen={setIsOpen} eventId={eventId}/>
    {events.events.map((e: IEvent) => (
        <div className={styles.showWrapper} key={e.id}>
          <Link href={`/preview/${e.name}`} className={styles.title} >{e.name}</Link>
          <span className={styles.date}>
            <Image src={CalendarIcon} width={30} height={20} alt={e.name}/>
            {new Date(e.date).toLocaleString()}</span>
            {e.poster_url && <Image className={styles.showImage} src={e.poster_url} width={400} height={250} alt='Show' />}
            <p className={styles.desc}>{e.description}</p>
            <div className={styles.info}>
              <p className={styles.paragraph}>Slots count: {e.slots}</p>
              <p className={styles.paragraph}>Accessibility: </p>
              <p className={styles.paragraph}>Perfomance time: </p>
            </div>
          <div className={styles.show}>
              <div className={styles.controls}>
                <Button
                  onClick={() => onChangeHandler(e.id)}
                  className={styles.changeBtn}> 
                  Change
                  <Image className={styles.btnImage} src={Pen} width={25} height={25} alt='change' />
                </Button>
                <Button onClick={() => dispatch(deleteShow(e.id))} className={styles.deleteBtn}>
                  Delete
                  <Image className={styles.btnImage} src={X} width={25} height={25} alt='change' />
                </Button>
              </div>
            </div>
        </div>
    ))}
    </>
  );
}



export function EventsPaginate({itemsPerPage, events}:{itemsPerPage: number, events: IEvents}) {
  const [itemOffset, setItemOffset] = useState(0);

  const endOffset = itemOffset + itemsPerPage;
  console.log(`Loading items from ${itemOffset} to ${endOffset}`);
  const currentItems = events.events.slice(itemOffset, endOffset);
  const pageCount = Math.ceil(events.events.length / itemsPerPage);
  const handlePageClick = (event: ISelect) => {
    const newOffset = (event.selected * itemsPerPage) % currentItems.length;
    console.log(
      `User requested page number ${event.selected}, which is offset ${newOffset}`
    );
    setItemOffset(newOffset);
  };

  return (
    <>
      <Items events={currentItems} />
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
    </>
  );
}