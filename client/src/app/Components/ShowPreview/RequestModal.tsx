'use client'
import { useState, useEffect } from "react"
import { Dispatch, SetStateAction, Fragment } from "react"
import { Dialog, Transition } from '@headlessui/react'
import { getTokenForApi } from "@/app/utils/getTokenForApi"
import { Input } from "@/shadComponents/ui/input"
import { Label } from "@/shadComponents/ui/label"
import { ToastAction } from '@/shadComponents/ui/toast'
import { generateUploadLink } from "@/app/utils/generateUploadLink"
import { useToast } from '@/shadComponents/ui/use-toast'
import { ChangeEvent } from "react"

export default function RequestModal({isOpen, setIsOpen, id}: {isOpen: boolean, setIsOpen: Dispatch<SetStateAction<boolean>>, id: string}) {
  const [artistDemo, setArtistDemo] = useState('');
  const [desc, setDesc] = useState('');
  const { toast } = useToast();

    const descChangeHandler = (e:ChangeEvent<HTMLInputElement>) => {
      setDesc(e.target.value);
    }

    const handleChange = (e:ChangeEvent<HTMLInputElement>) => {
        if (e.target.files){
            const file = e.target.files[0];
            uploadFile(file)
        }
        // .then((data) => sendFileMessage(data));
      }
      const uploadFile = async (file: File) => {
        const link:any = await generateUploadLink('artist_demo');
        const res = await fetch(`${link.url}/`, {
            method: 'PUT',
            headers: {
              'Content-type' : 'audio/mpeg'
            },
            body: file
          })
        if (res.ok){
            setArtistDemo((link.url.split('?')[0]))
        }
    }
    async function postArtistDemo(){
      const res = await fetch(`${process.env.BACKEND_URL}/sessions/`, {
        method: 'POST',
        headers: {
          'Authorization':`Bearer ${await getTokenForApi()}`,
          'Content-type':'application/json'
        },
        body: JSON.stringify({name: 'testtest', description: desc, artist_demo_url: artistDemo, user: null, concert: id})
      })
    }
    const requestHandler = async () => {
      if (desc === '' || artistDemo === ''){
        toast({
          title: "Please, fill all required fields",
          action: (
            <ToastAction altText="Hide">Hide</ToastAction>
          ),
        })
        return
      }
      postArtistDemo()
        .then(res => {
          toast({
            title: "Your request is sent",
            action: (
              <ToastAction altText="Hide">Hide</ToastAction>
            ),
          })
          setIsOpen(false)
        })
        .catch(e => {
          toast({
            title: "Something went wrong",
            variant: "destructive",
            action: (
              <ToastAction altText="Hide">Hide</ToastAction>
            ),
          })
        })
    }
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
                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                  <Dialog.Title
                    as="h3"
                    className="text-lg font-medium leading-6 text-gray-900"
                  >
                    Attach some audio files to preview your show
                  </Dialog.Title>
                  <div className="my-6 grid w-full max-w-sm items-center gap-1.5">
                  <Label htmlFor="input">Description</Label>
                    <Input onChange={descChangeHandler} id="input" type="text" placeholder="Type your description" />
                  </div>
                  <div className="my-6 grid w-full max-w-sm items-center gap-1.5">
                    <Label htmlFor="audio">Audio</Label>
                    <Input onChange={(e) => handleChange(e)} id="audio" type="file" accept="audio/mp3,audio/*;capture=microphone" />
                </div>
                  <div className="mt-4">
                    <button
                      type="button"
                      className="block mx-auto rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                      onClick={requestHandler}
                    >
                      Send request
                    </button>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
  )
}
