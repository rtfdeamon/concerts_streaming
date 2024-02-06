import { ILiveParams } from '@/app/live/[id]/page'
import Stream from './Stream'
import styles from './Live.module.scss'

export default function Live({params}:ILiveParams) {
  return (
    <Stream />
  )
}
