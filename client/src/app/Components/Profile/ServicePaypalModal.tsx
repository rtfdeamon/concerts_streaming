'use client'
import { Dialog, Transition } from '@headlessui/react'
import { Fragment } from 'react'
import ServicePaypalBtns from './ServicePaypalBtns'
import SignOut from "@/app/utils/SignOut";
import { resetTokens } from "@/app/store/login/loginSlice";
import { useAppDispatch } from '@/app/hooks/rtkHooks'
import { Button } from '@/shadComponents/ui/button';

export default function ServicePaypalModal({isOpen}:{isOpen: boolean}) {
    const closeModal = () => {
     
    }
    const dispatch = useAppDispatch();
    let accessToken: string = '';
    if (typeof window !== 'undefined'){
      if (localStorage.getItem('accessToken') !== 'undefined' && typeof localStorage.getItem('accessToken') !== 'undefined')
      accessToken = JSON.parse(localStorage.getItem('accessToken') as string);
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
                <Dialog.Panel className="w-full text-center max-w-3xl transform overflow-hidden rounded-2xl bg-white p-6 align-middle shadow-xl transition-all">
                  <Dialog.Title
                    as="h3"
                    className="text-lg font-medium leading-6 text-gray-900"
                  >
                    Payment
                  </Dialog.Title>
                  <div className='mt-4'>
                    By purchasing a subscription for $29.99 per month, you can showcase your professional and/or licensed business services offered to paid artists
                  </div>
                  <div className="mt-6">
                      <div>
                          <ServicePaypalBtns />          
                          {/* This feature is in progress */}
                          {/* <PayPalBtns /> */}
                      </div>
                  </div>
                  <Button
                  className="
                  mt-6 block mx-auto mt-5 text-xl
                  h-[60px] bg-blue-500 duration-500 transition-all w-[100%] hover:bg-blue-700
                  "
                  onClick={async () => {
                    accessToken !== 'undefined' && typeof accessToken !== 'undefined' && SignOut(accessToken)
                    dispatch(resetTokens())
                  }}>
                          Logout
                  </Button>
                  <div className="mt-6 text-slate-400 text-xl">
                    *Monthly subscription to professional and/or licensed business services offered for paid artists
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
  )
}
