'use client'
import React, { useState } from 'react';
import ReactPaginate from 'react-paginate';
import { Button } from '@/shadComponents/ui/button';
import CheckModal from './CheckModal';
import OptionsModal from './OptionsModal';
import Image from 'next/image';
import Link from 'next/link';
import Women from '../../../../public/women.jpg'
import { IArtistRequest, IUser } from '@/app/types/interfaces';
import { useRef } from 'react';
import styles from './ArtistShows.module.scss';
import { getHostName } from '@/app/utils/getHostName';

interface ISelect{
    selected: number;
}

function Items({ filteredSessions }: {filteredSessions: IArtistRequest[]}) {
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [optionsModalIsOpen, setOptionsModalIsOpen] = useState(false);
    const [posterUrl, setPosterUrl] = useState('');
    const [currShowId, setCurrShowId] = useState<string | undefined>('')
    const [id, setId] = useState('');
    const [concertId, setConcertId] = useState<string>('')
    const onPreviewHandler = () => {
        setModalIsOpen(true);
    }
    const onOptionsHandler = (id:string, url:string) => {
        setPosterUrl(url);
        setId(id);
        setOptionsModalIsOpen(true);
    }
    return (
    <>
     <CheckModal concertId={concertId} id={currShowId} isOpen={modalIsOpen} setIsOpen={setModalIsOpen} />
     <OptionsModal isOpen={optionsModalIsOpen} setIsOpen={setOptionsModalIsOpen}  id={id} posterUrl={posterUrl} />
        {filteredSessions.length > 0 ? filteredSessions.map(s => (
            <div key={s.id} className={styles.requestWrapper}>
              <div className={styles.showWrapper}>
              <Link className={styles.showLink} href={`/preview/${s.concert?.id}`} >Show: {s.concert?.name}</Link>
                <div className={styles.request}>
                <div className={styles.imageWrapper}>
                    <Image src={typeof s.artist_demo_url !== 'object' ? getHostName(s.concert?.poster_url as string): Women} width={300} height={120} alt="showPoster" />
                </div>
                <div className={styles.controls}>
                  {/* <Button onClick={() => onOptionsHandler('3', 'data:image/jpeg;base64,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')}
                    className={styles.btn}>Show options</Button> */}
                  <Button onClick={() => 
                    {
                      setCurrShowId(s.id)
                      setConcertId(s.concert?.id as string)
                      onPreviewHandler()
                    }
                    } className={styles.btn}>Sound and video check</Button>
                </div>
                </div>
            </div>
          </div>
        ))
        : 
        <div className={styles.showsException}>
          Sorry! No shows yet 🥲
        </div>
        }
    </>
  );
}

export function ArtistShowsPaginate({ itemsPerPage, sessions, user }:
  {itemsPerPage: number, sessions: IArtistRequest[], user: IUser | undefined}) {
  // Here we use item offsets; we could also use page offsets
  // following the API or data you're working with.
  const [itemOffset, setItemOffset] = useState(0);
  const filteredByStatus = useRef<IArtistRequest[]>([])
  const filteredByUserId = useRef<IArtistRequest[]>([])
  // Simulate fetching items from another resources.
  // (This could be items from props; or items loaded in a local state
  // from an API endpoint with useEffect and useState)
  const endOffset = itemOffset + itemsPerPage;
  filteredByStatus.current = sessions.filter(s => s.status === 'accepted')
  filteredByUserId.current = filteredByStatus.current.filter(s => s.user?.id == user?.id)
  const currentItems = filteredByUserId.current.slice(itemOffset, endOffset);
  const pageCount = Math.ceil(filteredByUserId.current.length / itemsPerPage)

  // Invoke when user click to request another page.
  const handlePageClick = (event:ISelect) => {
    const newOffset = (event.selected * itemsPerPage) % filteredByUserId.current.length;
    setItemOffset(newOffset);
  };
  
  return (
    <>
      <Items filteredSessions={currentItems} />
      {filteredByUserId.current.length  > 5 &&
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
