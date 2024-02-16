
import { IArtistParams } from "@/app/artist/[id]/page"
import { Button } from "@/shadComponents/ui/button"
import HeaderWithoutBanner from "../Header/HeaderWithouBanner"
import About from "./About"
import Image from "next/image"
import styles from './Artist.module.scss'
import Women from '../../../../public/women.jpg'
import ShowsCalendar from "./ShowsCalendar"


export default function Artist({params}:IArtistParams) {
  return (
    <>
        <HeaderWithoutBanner />
        <section className={styles.wrapper}>
                <div className={styles.poster}>
                    <Image src={Women} width={200} height={200} alt="women" />
                    <div className={styles.posterWrapper}>
                        <h5 className={styles.artistTitle}>{params.id}</h5>
                        <p className={styles.desc}>Description Description Description Description Description Description Description Description
                        Description Description Description Description Description Description Description Description
                        </p>
                        <Button className={styles.btn}>Follow an artist</Button>
                    </div>
                </div>
                <div className={styles.aboutWrapper}>
                    {/* {Show.length> 0 ? : <span>No upcoming shows :(</span>} */}
                    <ShowsCalendar />
                    <About id={params.id} />
                </div>
        </section>
    </>
  )
}
