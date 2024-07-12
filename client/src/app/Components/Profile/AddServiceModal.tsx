'use client'
import { Dialog, Transition } from '@headlessui/react'
import { ChangeEvent, FormEventHandler, Fragment, useState } from 'react'
import { Dispatch, SetStateAction } from 'react'
import TariffPaypalBtns from './TariffPaypalBtns'
import { Input } from '@/shadComponents/ui/input'
import { Button } from '@/shadComponents/ui/button'
import { toast } from '@/shadComponents/ui/use-toast'
import { ToastAction } from '@radix-ui/react-toast'
import { generateUploadLink } from '@/app/utils/generateUploadLink'
import { useAppDispatch } from '@/app/hooks/rtkHooks'
import { addService } from '@/app/store/service/serviceSlice'

export default function AddServiceModal({isOpen, setIsOpen} :
    {isOpen: boolean, setIsOpen: Dispatch<SetStateAction<boolean>>}) {
    const [title, setTitle] = useState<string | undefined>()
    const [description, setDescription] = useState<string | undefined>()
    const [pictureLink, setPictureLink] = useState<string | undefined>()
    const [pictureIsLoading, setPictureIsLoading] = useState<boolean>(false)
    const dispatch = useAppDispatch()

    const closeModal = () => {
        setIsOpen(false)
    }
    const submitHandler = async () => {
      if (!description || !pictureLink || !title) return
      const res:any = await dispatch(addService(
        {title, description, image_url: pictureLink}
      )); 
      if (res.payload.id){
        toast({
          title: "Service added",
          description: "You have successfully add your service",
          action: (
            <ToastAction altText="Hide">Hide</ToastAction>
          ),
        })
        closeModal()
      } else {
        toast({
          title: "Service",
          description: "Something went wrong",
          variant: "destructive",
          action: (
            <ToastAction altText="Hide">Hide</ToastAction>
          ),
        })
      }
    }
    const onUploadHandler = async (e: ChangeEvent<HTMLInputElement>) => {
      if (e.target.files){
        setPictureIsLoading(true)
        const file = e.target.files[0]
        const formData = new FormData()
        formData.append('file', file)
        const uploadType = 'avatar'
        const link:any = await generateUploadLink(uploadType);
        // const res = await fetch(`${link.url}`, {
        //   method: 'PUT',
        //   headers: {
        //     'Content-type' : 'image/png'
        //   },
        //   body: file
        // })
        setPictureLink(link.url.split('?')[0])
        setPictureIsLoading(false)
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
                    Add your service
                  </Dialog.Title>
                  <div>
                    <div className="mt-4">
                        <Input onChange={(e) => setTitle(e.target.value)} placeholder='Title' />
                    </div>
                    <div className="mt-4">
                        <Input onChange={(e) => setDescription(e.target.value)} placeholder='Description' />
                    </div>
                    <div className="mt-4">
                    <Input onChange={(e) => onUploadHandler(e)} id="picture" type="file" accept="image/png, image/gif, image/jpeg" />
                    </div>
                    <div className='mt-4'>
                      <Button
                        className='flex mx-auto my-auto right-2 text-xl h-[64px] w-[150px]
                        bg-blue-500 duration-500 transition-all items-center hover:bg-blue-700'
                        onClick={submitHandler}
                        disabled={pictureIsLoading}
                      >
                      Add</Button>
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
