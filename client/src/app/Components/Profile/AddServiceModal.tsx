'use client'
import { Dialog, Transition } from '@headlessui/react'
import { FormEventHandler, Fragment } from 'react'
import { Dispatch, SetStateAction } from 'react'
import TariffPaypalBtns from './TariffPaypalBtns'
import { Input } from '@/shadComponents/ui/input'
import { Button } from '@/shadComponents/ui/button'

export default function AddServiceModal({isOpen, setIsOpen} :
    {isOpen: boolean, setIsOpen: Dispatch<SetStateAction<boolean>>}) {
    const closeModal = () => {
        setIsOpen(false)
    }
    const submitHandler = (e) => {
      e.preventDefault()
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
                  <form onSubmit={submitHandler}>
                    <div className="mt-4">
                        <Input placeholder='Title' />
                    </div>
                    <div className="mt-4">
                        <Input placeholder='Description' />
                    </div>
                    <div className="mt-4">
                        <Input placeholder='Picture' />
                    </div>
                    <div className='mt-4'>
                      <Button className='flex mx-auto my-auto right-2 text-xl h-[64px] w-[150px]
                      bg-blue-500 duration-500 transition-all items-center hover:bg-blue-700'>Add</Button>
                    </div>
                  </form>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
  )
}
