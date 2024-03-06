import HeaderWithoutBanner from '../Header/HeaderWithouBanner'
import Image from 'next/image'
import Link from 'next/link'
import First from '../../../../public/auto-config-wizard-1.png'
import Second from '../../../../public/auto-config-2.png'
import Third from '../../../../public/auto-config-3.png'
import Fourth from '../../../../public/auto-config-3a.png'
import Fifth from '../../../../public/auto-config-4.png'
import styles from './ObsGuide.module.scss'

export default function ObsGuide() {
  return (
    <>
        <HeaderWithoutBanner />
        <article className={styles.article}>
        <h5 className={styles.title}>Getting started in 5 steps</h5>
        <div>
            1.
            <Link className = {styles.link} href={`https://obsproject.com/download`}>Download OBS Studio from official source</Link>
        </div>
        <div>
            2.
            Let's start by setting up the best settings for your recordings and streams. The Auto-Configuration Wizard optimises OBS Studio for your needs, whether you're streaming fast-paced gameplay or recording high-fidelity video.
            It takes into account what you want to do in OBS Studio, your computer's hardware resources, and your network conditions (if you're streaming).
            The wizard shows the first time you run OBS Studio. If you wish to use it again, click on the Tools menu → Auto-Configuration Wizard.
            <Image src={First} width={400} height={200} alt='First image' />
        </div>
        <div>
            3.
            When you start OBS Studio, you start with a blank scene by default. You can add all kinds of Sources — to show images, text, video, your webcam, game play, desktop, etc.
            At the bottom of the main window is the Sources Dock. Click on the + symbol to add a source of your choice. Here are a few basic Sources to get you started:
            Display Capture	Display Capture Source and Window Capture Source for Windows and Linux, and macOS Screen Capture Source for macOS — capture your desktop or a single window
            Game Capture	Game Capture (Windows only) to capture 3D games with the highest performance
            Video Capture Video Capture Source to capture your webcam and/or capture cards
            <Image src={Second} width={400} height={200} alt='Second image' />
        </div>
        <div>
            4.
            By default, OBS Studio is set to capture your desktop audio and microphone. You can verify this by looking at the volume meters in the Audio Mixer (pictured left) at the bottom of the main OBS Studio window.
            If they aren't moving, or you suspect the wrong device is being captured, click on Settings → Audio and select the devices manually.
            <Image src={Fourth} width={400} height={200} alt='Fourth image' />
        </div>
        <div>
            5.
            Double check that all your settings are how you want them in Settings → Output. Then, click Start Recording or Start Streaming on the Controls Dock (pictured left).
            We strongly encourage running a test for a few minutes to make sure that there are no issues, rather than just jumping in to your first stream or recording.
            <Image src={Fifth} width={400} height={200} alt='Fifth image' />
        </div>
    </article>
    </>
  )
}
