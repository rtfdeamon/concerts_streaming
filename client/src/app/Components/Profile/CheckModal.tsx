'use client'
import { Button } from "@/shadComponents/ui/button"
import { Dialog, Transition } from "@headlessui/react"
import { Fragment, useEffect, useState } from "react"
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

interface IStreamStatus {
    status: string
}

export default function CheckModal({isOpen, setIsOpen}:{isOpen: boolean, setIsOpen: Dispatch<SetStateAction<boolean>>}) {
    const [steamingInfo, setStreamingInfo] = useState<IStreamingInfo>()
    const [playIsActive, setPlayIsActive] = useState(true)
    const [streamStatus, setStreamStatus] = useState<IStreamStatus>()
    const { toast } = useToast();
    const startStream = async () => {
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
        }
    }
    useEffect(() => {
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
        getStreamStatus()
    }, [playIsActive])
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
    }, [])
    console.log(streamStatus)
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
                            <div className="mt-4">
                               {steamingInfo && <PreviewStream  steamingInfo={steamingInfo}/> }
                               <div className="flex justify-center cursor-pointer">
                                   <Button style={{marginRight: '20px'}} onClick={startStream} >Start stream</Button>
                                   <Button onClick={stopStream} >Close stream</Button>
                                {
                                    // playIsActive ? 
                                    //     <Pause height={40} width={40} onClick={stopStream} />
                                    // :
                                        // <Play height={40} width={40} onClick={startStream} />
                                }     
                                    </div>
                            </div>
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
