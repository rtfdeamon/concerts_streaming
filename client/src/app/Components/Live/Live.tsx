import { Centrifuge } from 'centrifuge';
import { ILiveParams } from '@/app/live/[id]/page'
import Stream from './Stream'
import Chat from './Chat'
import styles from './Live.module.scss'

export default function Live({params}:ILiveParams) {
  const centrifuge = new Centrifuge('ws://192.168.100.101:8183/connection/websocket')
  return (
    <section className={styles.chatWrapper}>
      <Stream id={params.id} />
      <Chat id={params.id} />
    </section>
  )
}
