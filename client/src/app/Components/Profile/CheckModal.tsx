'use client'
import { Dialog, Transition } from "@headlessui/react"
import { Fragment } from "react"
import { Input } from "@/shadComponents/ui/input"
import { Dispatch, SetStateAction } from "react"
import PreviewStream from "./PreviewStream"
import Link from "next/link"
import styles from './CheckModal.module.scss'

export default function CheckModal({isOpen, setIsOpen}:{isOpen: boolean, setIsOpen: Dispatch<SetStateAction<boolean>>}) {
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
                            Show preview
                        </Dialog.Title>
                            <div className="mt-4">
                                <PreviewStream />
                            </div>
                            <div className="mt-4">
                                <span>Server</span>
                                <Input type="text"  value={"rtmp://stream01:312/ticket"}/>
                                <span>Key</span>
                                <Input type="text" value={"8DTFDSKCKSVDSJKDAS-"} />
                            </div>
                            <div className="mt-4">
                                <Link href={`${process.env.FRONTEND_URL}/obsGuide`}
                                className={styles.link}
                                >How to use OBS</Link>
                            </div>
                        </Dialog.Panel>
                    </Transition.Child>
                    </div>
                </div>
                </Dialog>
        </Transition>
  )
}
