import { Dispatch, SetStateAction, Fragment } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import SearchInput from '@/app/Ui/SearchInput/SearchInput'

export default function RegionModal({modalIsOpen, setModalIsOpen}:{modalIsOpen: boolean, setModalIsOpen: Dispatch<SetStateAction<boolean>>}) {
  const onCloseHandler = () => {
    setModalIsOpen(!modalIsOpen)
  }
  return (
    <Transition
    show={modalIsOpen}
    enter="transition duration-100 ease-out"
    enterFrom="transform scale-95 opacity-0"
    enterTo="transform scale-100 opacity-100"
    leave="transition duration-75 ease-out"
    leaveFrom="transform scale-100 opacity-100"
    leaveTo="transform scale-95 opacity-0"
    as={Fragment}
  >
    <Dialog
      open={modalIsOpen}
      onClose={() => setModalIsOpen(false)}
      className="relative z-50"
    >
      <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
      <div className="fixed inset-0 w-screen overflow-y-auto">
        <div className="flex min-h-full items-center justify-center p-4">
          <Dialog.Panel className="mx-auto max-w-sm rounded bg-white">
              <h5>Choose your location</h5>
              <SearchInput placeholder='Enter your city' variant='input'/>
              
          </Dialog.Panel>
        </div>
      </div>
    </Dialog>
  </Transition>
  )
}
