import HeaderWithoutBanner from "../Header/HeaderWithouBanner";
import { IPreviewParams } from "@/app/preview/page";
import { Button } from "@/shadComponents/ui/button";
import Image from "next/image";
import Link from "next/link";
import Women from '../../../../public/women.jpg'
import Live from '../../../../public/radio.svg'
import CalendarIcon from '../../../../public/calendar-range.svg'
import styles from './ShowPreview.module.scss'

export default function ShowPreview({params}:IPreviewParams) {
  return (
      <>
        <HeaderWithoutBanner />
        <section className={styles.section}>
                <div className={styles.poster} style={{  backgroundImage: "url(" + { Women } + ")", backgroundSize: 'auto' }}>
                    <div className={styles.posterWrapper}>
                        <h5 className={styles.artistTitle}>{params.id} by 
                        <Link className={styles.link} href={'/artist'}>%artist name%</Link></h5>
                        <p className={styles.desc}>Description Description Description Description Description Description Description Description
                        Description Description Description Description Description Description Description Description
                        </p>
                        <div className={styles.calendar}>
                            <div className={styles.live}>
                                <Image className={styles.LiveIcon} src={Live} height={50} width={50} alt="live" />
                                <p className={styles.text}>Live stream</p>
                            </div>
                            <div className={styles.date}>
                                <Image className={styles.CalendarIcon} src={CalendarIcon} height={50} width={50} alt="calendar" />
                                <div className={styles.wrapper}>
                                  <p className={styles.text}>10.10.2024</p>
                                  <span className={styles.span}>09:00 AM, GMT+3</span>
                                </div>
                            </div>
                        </div>
                        <Button className={styles.btn}>Take a ticket</Button>
                    </div>
                </div>
                <div className={styles.aboutWrapper}>
                  <h6 className={styles.aboutTitle}>About this show</h6>
                  <p className={styles.aboutDesc}>
                    DescDescDescDescDescDescDescDescDescDescDescDescDescDescDescDescDesDescDescDescDescDescDesccDesc
                    DescDescDescDescDescDescDescDescDescDescDescDescDescDescDescDescDesDescDescDescDescDescDesccDesc
                    DescDescDescDescDescDescDescDescDescDescDescDescDescDescDescDescDesDescDescDescDescDescDesccDesc
                    DescDescDescDescDescDescDescDescDescDescDescDescDescDescDescDescDesDescDescDescDescDescDesccDesc
                    DescDescDescDescDescDescDescDescDescDescDescDescDescDescDescDescDesDescDescDescDescDescDesccDesc
                  </p>
                </div>
                <div className={styles.banner}>

                </div>
        </section>
      </>
  )
}
