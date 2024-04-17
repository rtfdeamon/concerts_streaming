import Clapperboard from '../../../../public/clapperboard.svg'
import MusicList from '../../../../public/list-music.svg'
import Mic from '../../../../public/mic-2.svg'
import Users from '../../../../public/users.svg'
import Dollar from '../../../../public/dollar.svg'
import Idea from '../../../../public/lightbulb.svg'
import Image from 'next/image'
import styles from './About.module.scss'

export default function About() {
  return (
    <section className={styles.section}>
        <div className={styles.sectionWrapper}>
            <div className={styles.infoWrapper}>
                <h6>About our service</h6>
                <h5>Digital Platform Entertainment</h5>
                <p>Because you deserve it, allowing aspiring perfomance artists of all kinds a central platform to develop and grow with resources</p>
            </div>
            <div className={styles.iconsWrapper}>
                <div className={styles.iconWrapper}>
                    <Image src={Clapperboard} width={100} height={60} alt='icon'/>
                    <span className={styles.iconText}>Videography</span>
                </div>
                <div className={styles.iconWrapper}>
                    <Image src={MusicList} width={100} height={60} alt='icon'/>
                    <span className={styles.iconText}>Music</span>
                </div>
                <div className={styles.iconWrapper}>
                    <Image src={Mic} width={100} height={60} alt='icon'/>
                    <span className={styles.iconText}>Vocal</span>
                </div>
                <div className={styles.iconWrapper}>
                    <Image src={Users} width={100} height={60} alt='icon'/>
                    <span className={styles.iconText}>Resources</span>
                </div>
                <div className={styles.iconWrapper}>
                    <Image src={Dollar} width={100} height={60} alt='icon'/>
                    <span className={styles.iconText}>Free to listeners</span>
                </div>
                <div className={styles.iconWrapper}>
                    <Image src={Idea} width={100} height={60} alt='icon'/>
                    <span className={styles.iconText}>Creating a platform for all</span>
                </div>
            </div>
        </div>
    </section>
  )
}
