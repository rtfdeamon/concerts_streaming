'use client'
import { Dialog, Transition } from '@headlessui/react'
import { ChangeEvent, Fragment, useState } from 'react'
import { Dispatch, SetStateAction } from 'react'
import TariffPaypalBtns from './TariffPaypalBtns'
import { Input } from '@/shadComponents/ui/input'
import { Button } from '@/shadComponents/ui/button'
import { getTokenForApi } from '@/app/utils/getTokenForApi'
import { toast } from '@/shadComponents/ui/use-toast'
import { ToastAction } from '@radix-ui/react-toast'

export default function SocialMediaServiceModal({isOpen, setIsOpen, media, instagram, snapChat, spotify, twitter, youtube, linkedIn, tiktok,
  setInstagram, setSnapChat, setSpotify, setTwitter, setYoutube, setLinkedIn, setTiktok} :
    {isOpen: boolean, setIsOpen: (value: SetStateAction<string | undefined>) => void, media: string
      instagram: string | undefined, snapChat: string | undefined,
      spotify: string | undefined, twitter: string | undefined, youtube: string | undefined, linkedIn: string | undefined, tiktok: string | undefined,
      setInstagram: Dispatch<SetStateAction<string | undefined>>, setSnapChat: Dispatch<SetStateAction<string | undefined>>,
      setSpotify: Dispatch<SetStateAction<string | undefined>>, setTwitter: Dispatch<SetStateAction<string | undefined>>,
      setYoutube: Dispatch<SetStateAction<string | undefined>>, setLinkedIn: Dispatch<SetStateAction<string | undefined>>,
      setTiktok: Dispatch<SetStateAction<string | undefined>>
    }) {
    const closeModal = () => {
      setIsOpen(undefined)
    }

   const updateSocial = async () => {
    const res = await fetch(`${process.env.BACKEND_URL}/services/current/`, {
      method: 'PATCH',
      headers: {
        'Authorization' : `Bearer ${await getTokenForApi()}`,
        'Content-type' : 'Application/json'
      },
      body: JSON.stringify({links: {instagram, linkedIn, twitter, youtube, tiktok, snapChat, spotify}})
    })
    if (res.ok){
      toast({
        title: "Successfully updated",
        action: (
          <ToastAction altText="Hide">Successfully updated</ToastAction>
        ),
      })
    }
   }

   const setLink = (e: ChangeEvent<HTMLInputElement>) => {
     if (media === 'instagram'){
       setInstagram(e.target.value)
     } else if (media ==='snapchat'){
       setSnapChat(e.target.value)
     } else if (media ==='spotify'){
       setSpotify(e.target.value)
     } else if (media === 'twitter'){
       setTwitter(e.target.value)
     } else if (media === 'youtube'){
       setYoutube(e.target.value)
     } else if (media === 'linkedin'){
       setLinkedIn(e.target.value)
     } else if (media === 'tiktok'){
        setTiktok(e.target.value)
     }
   }

  return (
    <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={closeModal}>
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
            <div className="flex min-h-full items-center justify-center p-6 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full text-center max-w-md transform overflow-hidden rounded-2xl bg-white p-6 align-middle shadow-xl transition-all">
                  <Dialog.Title
                    as="h3"
                    className="text-lg font-medium leading-6 text-gray-900"
                  >
                    <span className='capitalize'>Add or change link of your media</span>
                  </Dialog.Title>
                  <div className="mt-4">
                      <div>
                        <Input onChange={(e) => setLink(e)} type="text"
                        placeholder={
                          (media === 'instagram' && instagram
                            || media ==='snapchat' && snapChat
                            || media ==='spotify' && spotify
                            || media === 'twitter' && twitter
                            || media === 'youtube' && youtube
                            || media === 'linkedin' && linkedIn
                            || media === 'tiktok' && tiktok
                          ) || "Put your link"
                        }
                        />
                      </div>
                  </div>
                  <div className="mt-4">
                      <div>
                        <Button variant={'secondary'} onClick={updateSocial}>Save changes</Button>
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
