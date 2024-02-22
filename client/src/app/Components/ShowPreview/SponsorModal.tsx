import { Dialog, Transition } from '@headlessui/react'
import { Fragment } from 'react'
import { Dispatch, SetStateAction } from 'react'
import { generateUploadLink } from '@/app/utils/generateUploadLink'
import { ChangeEvent } from 'react'
import { Label } from '@/shadComponents/ui/label'
import { Input } from '@/shadComponents/ui/input'

export default function SponsorModal({isOpen, setIsOpen, showId, showTitle} :
    {isOpen: boolean, setIsOpen: Dispatch<SetStateAction<boolean>>, showId: string, showTitle: string}) {

  function closeModal() {
    setIsOpen(false)
  }
  const onUploadHanler = async (e:ChangeEvent<HTMLInputElement>) => {
    if (e.target.files){
        const link:any = await generateUploadLink('poster');
        const res = await fetch(`${link.url}`, {
            method: 'PUT',
            headers: {
              'Content-type' : 'image/png'
            },
            body: e.target.files[0]
          })
        if (res.ok){
            const posterUrl = link.url.split('?')[0]
            // api req
            closeModal()
        }
    }
    }
  return (
    <>

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
                    className="text-lg text-center font-medium leading-6 text-gray-900"
                  >
                    {showTitle}
                  </Dialog.Title>
                  <div className="mt-2">
                    <p className="text-sm text-center text-gray-500">
                        Do you want to be sponsor of this show?
                    </p>
                  </div>
                <div className="mt-4">
                        <Label htmlFor="picture">Banner</Label>
                        <Input onChange={(e) => onUploadHanler(e)} id="picture" type="file" accept="image/png, image/gif, image/jpeg"/>
                </div>
                  <div className="mt-4">
                    <button
                      type="button"
                      className="block mx-auto rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                      onClick={closeModal}
                    >
                      Got it, thanks!
                    </button>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  )
}
