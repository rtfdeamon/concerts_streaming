'use client'
import { Dispatch, SetStateAction, Fragment } from "react"
import { Dialog, Transition } from '@headlessui/react'
import { Input } from "@/shadComponents/ui/input"
import { Label } from "@/shadComponents/ui/label"
import { ChangeEvent } from "react"

export default function RequestModal({isOpen, setIsOpen}: {isOpen: boolean, setIsOpen: Dispatch<SetStateAction<boolean>>}) {
    const handleChange = (e:ChangeEvent<HTMLInputElement>) => {
        if (e.target.files){
            const file = e.target.files[0];
            uploadFile(file)
        }
        // .then((data) => sendFileMessage(data));
      }
      const uploadFile = async (file: File) => {
          try{
              const formData = new FormData();
              formData.append('file', file);
              const res = await fetch(`${process.env.WSBACK_URL}/api/upload/`, {
                  method: 'POST',
                  body: formData
              })
              const data = await res.json();
              return {
                  name: data.name,
                  path: `${process.env.WSBACK_URL}/public` + data.path
              }
          } catch(e){
              console.log(e);
          }
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
                    <Label htmlFor="picture">Audio</Label>
                    <Input onChange={(e) => handleChange(e)} id="audio" type="file" accept="audio/mp3,audio/*;capture=microphone" />
                </div>
                  <div className="mt-4">
                    <button
                      type="button"
                      className="block mx-auto rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                      onClick={() => setIsOpen(false)}
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
