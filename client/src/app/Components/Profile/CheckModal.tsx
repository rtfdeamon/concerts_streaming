'use client'
import { Button } from "@/shadComponents/ui/button"
import { Dialog, Transition } from "@headlessui/react"
import { Fragment, useEffect, useRef, useState } from "react"
import { Input } from "@/shadComponents/ui/input"
import { Dispatch, SetStateAction } from "react"
import PreviewStream from "./PreviewStream"
import Image from "next/image"
import Link from "next/link"
import { ToastAction } from "@/shadComponents/ui/toast"
import styles from './CheckModal.module.scss'
import { Play } from "lucide-react"
import { Pause } from "lucide-react"
import { IStreamingInfo } from "@/app/types/interfaces"
import { getTokenForApi } from "@/app/utils/getTokenForApi"
import { useToast } from "@/shadComponents/ui/use-toast"
import TimerCheckModal from "./TimerCheckModal"

interface IStreamStatus {
    status: string
}

export default function CheckModal({concertId, id, isOpen, setIsOpen}:{concertId: string, id: string | undefined, isOpen: boolean, setIsOpen: Dispatch<SetStateAction<boolean>>}) {
    const [steamingInfo, setStreamingInfo] = useState<IStreamingInfo>()
    const [playIsActive, setPlayIsActive] = useState(true)
    const [streamStatus, setStreamStatus] = useState<IStreamStatus>()
    const { toast } = useToast();
    const startDate = useRef<string>()
    const endDate = useRef<string>()
    const player = useRef<HTMLVideoElement>()

    async function getStreamStatus() {
        const res = await fetch(`${process.env.BACKEND_URL}/streaming/status/`, {
            method: 'GET',
            headers: {
                'Authorization' : `Bearer ${await getTokenForApi()}`
            }
        })
        const data = await res.json();
        setStreamStatus(data);
    }
    

    // intervalId.current =  setInterval(() => {
    //     getStreamStatus()
    // }, 6000)

    // useEffect(() => {
    //     return () => {
    //         clearInterval(intervalId.current);
    //     }
    // }, [])

    const startStream = async () => {
        try{
            const res = await fetch(`${process.env.BACKEND_URL}/streaming/start/`, {
                method: 'POST',
                headers: {
                    'Authorization' : `Bearer ${await getTokenForApi()}`
                }
            })
            const data = await res.json();
            console.log(data.status)
            if (data.status === "starting"){
                setPlayIsActive(true);
            }
            console.log(data)
            getStreamStatus()
        } catch{
            getStreamStatus()
        }
    }

    const stopStream = async () => {
        try{
            const res = await fetch(`${process.env.BACKEND_URL}/streaming/stop/`, {
                method: 'POST',
                headers: {
                    'Authorization' : `Bearer ${await getTokenForApi()}`
                }
            })
            const data = await res.json();

            if (data.status === "stopped"){
                setPlayIsActive(false);
            }
        } catch {
            toast({
                title: "Stream is starting, please wait",
                action: (
                  <ToastAction altText="Hide">Hide</ToastAction>
                ),
              })
              getStreamStatus()
        }
    }
    useEffect(() => {
        getStreamStatus()
    }, [playIsActive])
    useEffect(() => {
        async function getStreamInfo(){
            if (typeof concertId !== 'undefined'){
                const res = await fetch(`${process.env.BACKEND_URL}/concerts/${concertId}/playlist/`, {
                                method: 'GET',
                                headers: {
                                    'Authorization' : `Bearer ${await getTokenForApi()}`
                                }
                            })
                            const data = await res.json()
                            const filteredData = data.filter((d: {
                                id: string | undefined | undefined 
                                }) => d.id === id)
                            startDate.current = filteredData[0].start_date
                            endDate.current = filteredData[0].end_date
            }
            }
            getStreamInfo()
    }, [concertId])
    

    useEffect(() => {
        async function getStreamingInfo() {
            const res = await fetch(`${process.env.BACKEND_URL}/streaming/info/`, {
                method: 'GET',
                headers: {
                    'Authorization' : `Bearer ${await getTokenForApi()}`
                }
            })
            const data: IStreamingInfo = await res.json()
            setStreamingInfo(data)
          }
        getStreamingInfo()
    }, [streamStatus])

    return (
        <Transition appear show={isOpen} as={Fragment}>
                <Dialog as="div" className="relative z-10" onClose={() => setIsOpen(false)}>
                <Transition.Child
                    as={Fragment}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                >
                    <div className="fixed inset-0 bg-black/25" />
                </Transition.Child>

                <div className="fixed inset-0 overflow-y-auto">
                    <div className="flex min-h-full items-center justify-center p-4 text-center">
                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0 scale-95"
                        enterTo="opacity-100 scale-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100 scale-100"
                        leaveTo="opacity-0 scale-95"
                    >
                        <Dialog.Panel className="w-full max-w-5xl p-24 transform overflow-hidden rounded-2xl bg-white text-left align-middle shadow-xl transition-all">
                        <Dialog.Title
                            as="h3"
                            className="text-lg font-medium leading-6 text-gray-900 text-center"
                        >
                            Stream preview
                        </Dialog.Title>
                            <TimerCheckModal startDate={startDate} />
                            <div className="mt-4">
                                {
                                    streamStatus?.status === 'stopped' ?
                                    <div
                                    className='w-full h-[500px] bg-slate-100 rounded-xl'
                                    >
                                    </div>
                                    :
                                    <PreviewStream  streamStatus={streamStatus as IStreamingInfo} steamingInfo={steamingInfo} />
                                }
                               <div className="flex justify-center cursor-pointer mt-12">
                                   {/* <Button style={{marginRight: '20px'}} onClick={startStream} >Start stream</Button>
                                   <Button onClick={stopStream} >Close stream</Button> */}
                                {
                                    streamStatus?.status == "starting" || streamStatus?.status == 'started' ? 
                                    <div className="flex flex-col items-center justify-center">
                                    <Pause height={40} width={40} onClick={stopStream} />
                                    <h5 className="block mx-auto text-center my-3 text-slate-400">Don't forget to start your obs stream</h5>
                                    </div>
                                    :
                                    <Play height={40} width={40} onClick={startStream} />
                                }     
                                    </div>
                            </div>
                            {/* <Button onClick={getStreamStatus}>Status</Button> */}
                            <div className="mt-4">
                                <span className="block mt-2">Server</span>
                                <Input type="text"  value={steamingInfo?.publish_credentials?.primary_server}/>
                                <span className="block mt-2">Key</span>
                                <Input type="text" value={steamingInfo?.publish_credentials?.stream_name} />
                                <span className="block mt-2">Username</span>
                                <Input type="text" value={steamingInfo?.publish_credentials?.username} />
                                <span className="block mt-2">Password</span>
                                <Input type="text" value={steamingInfo?.publish_credentials?.password} />
                            </div>
                            <div className="mt-4">
                                <Link href={`${process.env.FRONTEND_URL}/obsGuide`}
                                className={styles.link}
                                >How to use OBS</Link>
                            </div>
                            <div className="mt-4">
                            <div className="flex justify-center cursor-pointer">   
                            </div>
                            </div>
                        </Dialog.Panel>
                    </Transition.Child>
                    </div>
                </div>
                </Dialog>
        </Transition>
  )
}
