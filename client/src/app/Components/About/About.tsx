import Clapperboard from '../../../../public/clapperboard.svg'
import MusicList from '../../../../public/list-music.svg'
import Mic from '../../../../public/mic-2.svg'
import Users from '../../../../public/users.svg'
import Dollar from '../../../../public/dollar.svg'
import Idea from '../../../../public/lightbulb.svg'
import Image from 'next/image'
import styles from './About.module.scss'
import Link from 'next/link'

export default function About() {
  return (
    <section className={styles.section}>
        <div className={styles.sectionWrapper}>
            <div className={styles.infoWrapper}>
                <h6>About our service</h6>
                <h5>Digital Platform Entertainment</h5>
                <p>Bringing the newest digital live stream platform to life for aspiring artists of all genres. So, take a look, book a show, or perform at a show, and advertise in a show.  All for one cause, personal growth in the community for creators!  Welcome to DPE – 
                <span className='font-bold italic'>“Because you deserve it…”</span></p>
            </div>
            <div className={styles.iconsWrapper}>
                <Link href={'/signup'} className={styles.iconWrapper}>
                    <Image src={Clapperboard} width={100} height={60} alt='icon'/>
                    <span className={styles.iconText}>All things Video</span>
                </Link>
                <Link href={'/signup'} className={styles.iconWrapper}>
                    <Image src={MusicList} width={100} height={60} alt='icon'/>
                    <span className={styles.iconText}>All things Music</span>
                </Link>
                <Link href={'/signup'} className={styles.iconWrapper}>
                    <Image src={Mic} width={100} height={60} alt='icon'/>
                    <span className={styles.iconText}>All things Vocal</span>
                </Link>
                <Link href={'/signup'} className={styles.iconWrapper}>
                    <Image src={Users} width={100} height={60} alt='icon'/>
                    <span className={styles.iconText}>Professional resources</span>
                </Link>
                <Link href={'/signup'} className={styles.iconWrapper}>
                    <Image src={Dollar} width={100} height={60} alt='icon'/>
                    <span className={styles.iconText}>Free for viewers</span>
                </Link>
                <Link href={'/signup'} className={styles.iconWrapper}>
                    <Image src={Idea} width={100} height={60} alt='icon'/>
                    <span className={styles.iconText}>Creative connection for all</span>
                </Link>
            </div>
        </div>
    </section>
  )
}
