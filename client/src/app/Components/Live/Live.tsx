'use client'
import { Centrifuge } from 'centrifuge';
import { ILiveParams } from '@/app/live/[id]/page'
import Stream from './Stream'
import Chat from './Chat'
import styles from './Live.module.scss'
import { getTokenForApi } from '@/app/utils/getTokenForApi';
import { useToast } from '@/shadComponents/ui/use-toast';
import { ToastAction } from '@/shadComponents/ui/toast';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';


export default function Live({params}:ILiveParams) {
  const {toast} = useToast()
  const router = useRouter()
  const [concertInfo, setConcertInfo] = useState<any>()
  useEffect(() => {
    const getConcertInfo = async ({id}:{id: string}) => {
      const res = await fetch(`${process.env.BACKEND_URL}/concerts/${id}/playlist/`, {
        method: 'GET',
        headers: {
          'Authorization' : `Bearer ${await getTokenForApi()}`
        }
      })
      if (!res.ok){
        toast({
          title: "You have no buy a ticket for this show!",
          action: (
            <ToastAction altText="Hide">Hide</ToastAction>
          ),
        })
        router.back()
      }
      const data = await res.json();
      setConcertInfo(data)
    }
    getConcertInfo({id: params.id})
  }, [])
  // getConcertInfo({id: params.id})
  // .then(res => console.log(res.json()))
  // .then(res => {
  //   console.log('res', res)
  // })
  // .catch((e) => {
  //   console.log('err', e)
  // })
  return (
    <section className={styles.chatWrapper}>
      <Stream id={params.id} concertInfo={concertInfo} />
      <Chat id={params.id} />
    </section>
  )
}
