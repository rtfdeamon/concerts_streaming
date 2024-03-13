import { Dialog, Transition } from '@headlessui/react'
import { Fragment } from 'react'
import { Dispatch, SetStateAction } from 'react'
import { useToast } from '@/shadComponents/ui/use-toast'
import { ToastAction } from '@/shadComponents/ui/toast'
import { generateUploadLink } from '@/app/utils/generateUploadLink'
import { getTokenForApi } from '@/app/utils/getTokenForApi'
import { ChangeEvent } from 'react'
import { Label } from '@/shadComponents/ui/label'
import { Input } from '@/shadComponents/ui/input'

export default function SponsorModal({isOpen, setIsOpen, showId, showTitle} :
    {isOpen: boolean, setIsOpen: Dispatch<SetStateAction<boolean>>, showId: string, showTitle: string}) {

  const {toast} = useToast();
  function closeModal() {
    setIsOpen(false)
  }

  const adReq = async (poster: string) => {
    const res = await fetch(`${process.env.BACKEND_URL}/sponsor-ads/`, {
      method: 'POST',
      headers: {
        'Content-type' : 'application/json',
        'Authorization' : `Bearer ${await getTokenForApi()}`
      },
      body: JSON.stringify({banner_url: poster, user: null, concert: showId})
    })
    return res;
  }
  const onUploadHanler = async (e:ChangeEvent<HTMLInputElement>) => {
    if (e.target.files){
        const image = new Image()
        image.src = URL.createObjectURL(e.target.files[0])
        await new Promise((res, rej) => { image.onload = () => {
          if (image.width > 1200 || image.height > 320){
            toast({
              title: "Banner loading",
              description: "Please, upload a banner in 1200 x 320 resolution",
              variant: "destructive",
              action: (
                <ToastAction altText="Hide">Hide</ToastAction>
              ),
            })
          } else {
            res(null);
          }
        }
      });
        const link:any = await generateUploadLink('poster');
        const res = await fetch(`${link.url}/`, {
            method: 'PUT',
            headers: {
              'Content-type' : 'image/png'
            },
            body: e.target.files[0]
          })
        if (res.ok){
            const posterUrl = link.url.split('?')[0]
            const reqResponse = await adReq(posterUrl);
            const req: any = await reqResponse.json();
            if (reqResponse.ok){
              toast({
                title: "Request sended",
                description: "Please, wait for admin to approve your request",
                action: (
                  <ToastAction altText="Hide">Hide</ToastAction>
                ),
              })
              closeModal()
            } else if (req.concert[0] === 'sponsor ad with this concert already exists.'){
                toast({
                  title: "You already send your request",
                  description: "Please, wait for admin to approve your request",
                  variant: "destructive",
                  action: (
                    <ToastAction altText="Hide">Hide</ToastAction>
                  ),
                })
                closeModal()
            } else {
              toast({
                title: "Something went wrong",
                variant: "destructive",
                action: (
                  <ToastAction altText="Hide">Hide</ToastAction>
                ),
              })
              closeModal()
            }
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
                <div className="mt-4 mb-4">
                        <Label htmlFor="picture">Banner</Label>
                        <Input onChange={(e) => onUploadHanler(e)} id="picture" type="file" accept="image/png, image/gif, image/jpeg"/>
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
