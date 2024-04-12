'use client'
import { useAppDispatch } from "@/app/hooks/rtkHooks"
import { changeShow } from "@/app/store/shows/showsSlice"
import { Dialog, Transition } from "@headlessui/react"
import { Fragment, useEffect, useState } from "react"
import { generateUploadLink } from "@/app/utils/generateUploadLink"
import { Input } from "@/shadComponents/ui/input"
import { Button } from "@/shadComponents/ui/button"
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
  } from "@/shadComponents/ui/select"
import { Calendar } from "@/shadComponents/ui/calendar"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/shadComponents/ui/popover"
import { TimePickerDemo } from "../TimePicker/TimePicker"
import { Label } from "@/shadComponents/ui/label"
import { Textarea } from "@/shadComponents/ui/textarea"
import { format } from "date-fns"
import { cn } from "@/lib/utils"
import X from "../../../../../../public/xBlack.svg"
import CalendarIcon from '../../../../../../public/calendar-range.svg'
import Image from "next/image"
import { Dispatch, SetStateAction } from "react"
import { ChangeEvent } from "react"
import { getTokenForApi } from "@/app/utils/getTokenForApi"
import { IShow } from "@/app/types/interfaces"
import styles from './modal.module.scss'
import { ToastAction } from "@radix-ui/react-toast"
import { useToast } from "@/shadComponents/ui/use-toast"
import { C } from "@vidstack/react/dist/types/vidstack.js"
import { useRef } from "react"

export const dynamic = 'force-dynamic'

export default function ChangeEventModal({isOpen, setIsOpen, eventId}:{isOpen: boolean, setIsOpen: Dispatch<SetStateAction<boolean>>, eventId: string}) {
    const dispatch = useAppDispatch()
    const [date, setDate] = useState<Date | undefined>()
    const [name, setName] = useState<string | undefined>(undefined)
    const [description, setDescription] = useState<string | undefined>(undefined)
    const [slots, setSlots] = useState<number | undefined>(undefined)
    const [perfomanceTime, setPerfomanceTime] = useState<number | undefined>(undefined)
    const [err, setErr] = useState(false)
    const [posterUrl, setPosterUrl] = useState<string | undefined>(undefined)
    const [category, setCategory] = useState<string | undefined>(undefined)
    const [access, setAccess] = useState<string | undefined>(undefined)
    const [price, setPrice] = useState<string | undefined>(undefined)
    const [show, setShow] = useState<any>();
    const [perfomanceOrder, setPerfomanceOrder] = useState<any>()
    const [order, setOrder] = useState<number[] | []>([])
    const [orderOpen, setOrderOpen] = useState(false)
    const [selectIndex, setSelectIndex] = useState<number[]>()
    const [tick, setTick] = useState(false)
    const timerId = useRef<NodeJS.Timeout>()
    const { toast } = useToast()
    const [orderWithId, setOrderWithId] = useState<any>([])
    const orderNumber = useRef(0)


    useEffect(() => {
        const timerID = setInterval(() => setTick(!tick), 4000)
        // getStreamStatus()
        return () => clearInterval(timerID)
      }, [tick])

    async function getShow(){
        const res = await fetch(`${process.env.BACKEND_URL}/concerts/${eventId}/`, {
            method: 'GET',
            headers: {
                'Authorization' : `Bearer ${await getTokenForApi()}`,
                'Content-type' : 'application/json'
            },
        })
        const data: IShow = await res.json();
        setShow(data)
    }
    useEffect(() => {
        getShow()
    }, [isOpen])

    useEffect(() => {
        const filteredArr = show?.performances
            setPerfomanceOrder(filteredArr)
    }, [show])
    const accessChangeHandler = (e: string) => {
        setAccess(e);
    }
    const categoryChangeHandler = (e: string) => {
        setCategory(e);
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
                setPosterUrl((link.url.split('?')[0]))
            }
        }
    }
    



    const onCloseHandler = () => {

    }


    const changeOrder = async () => {
        console.log(order.length)
        if (order.length !== 0 && order.length !== perfomanceOrder.length){
            toast({
                title: "You need to select all artists",
                action: (
                  <ToastAction altText="Hide">Hide</ToastAction>
                ),
              })
              throw new Error
        } else if (order.length !== 0 && order.length == perfomanceOrder.length){
            const res = await fetch(`${process.env.BACKEND_URL}/concerts/${eventId}/rearrange/`, {
                method: 'POST',
                headers: {
                    'Content-type' :'application/json',
                    'Authorization' : `Bearer ${await getTokenForApi()}`
                },
                body: JSON.stringify(order)
            })
            if (res.ok){
                getShow
            } else{
                toast({
                    title: "You`re successfully subscribed!",
                    action: (
                      <ToastAction altText="Hide">Hide</ToastAction>
                    ),
                  })
            }
        }
    }

    const onChangeHandler = async () => {
            order.length !== 0 && await changeOrder()
            const stringDate = date?.toISOString() as string;
            const res: any = await dispatch(changeShow({id: eventId, name, description, date: stringDate,
            slots, performance_time: perfomanceTime, poster_url: posterUrl, category, access, ticket_price: price}));
            if (res.payload.id){
                setIsOpen(false)
            } else{
                setErr (true)
            }
    }

    return (
        <Transition appear show={isOpen} as={Fragment}>
                <Dialog as="div" className="relative z-10" onClose={onCloseHandler}>
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
                            Change show
                            {err && <span className={styles.span}>Please, fill in all required fields</span>}
                        </Dialog.Title>
                        <Image onClick={() => setIsOpen(false)} className="absolute top-[40px] right-[60px] cursor-pointer" src={X} width={50} height={25} alt="X" />
                        <div>
                        <div className="mt-4">
                            <Input onChange={(e) => setName(e.target.value)} type="text" placeholder="Show's title" />
                        </div>
                        <div className="mt-4">
                            <Select
                                onValueChange={(e) => categoryChangeHandler(e)}
                                value={category}
                            >
                                <SelectTrigger className="w-full">
                                    <SelectValue placeholder="Select concert genre" />
                                </SelectTrigger>
                                    <SelectContent>
                                        <SelectGroup>
                                        <SelectLabel>Genre</SelectLabel>
                                            <SelectItem value="electronic">Electronic</SelectItem>
                                            <SelectItem value="country">Country</SelectItem>
                                            <SelectItem value="hiphop">Hip hop</SelectItem>
                                            <SelectItem value="funk">Funk</SelectItem>
                                            <SelectItem value="jazz">Jazz</SelectItem>
                                            <SelectItem value="latin">Latin</SelectItem>
                                            <SelectItem value="pop">Pop</SelectItem>
                                            <SelectItem value="punk">Punk</SelectItem>
                                            <SelectItem value="alternative">Alternative</SelectItem>
                                            <SelectItem value="classical">Classical</SelectItem>
                                            <SelectItem value="r&b">R&B</SelectItem>
                                            <SelectItem value="rock">Rock</SelectItem>
                                            <SelectItem value="blues">Blues</SelectItem>
                                            <SelectItem value="metal">Metal</SelectItem>
                                            <SelectItem value="indie">Indie</SelectItem>
                                            <SelectItem value="other">Other</SelectItem>
                                        </SelectGroup>
                                    </SelectContent>
                            </Select>
                        </div>
                        <div className="mt-4">
                            <Input onChange={(e) => setSlots(parseInt(e.target.value))} type="number" defaultValue={1} min={1} placeholder="Slots number" />
                        </div>
                        <div className="mt-4">
                            <Select
                                onValueChange={(e) => accessChangeHandler(e)}
                                value={access}
                            >
                            <SelectTrigger className="w-full">
                                <SelectValue placeholder="Select an accessibility" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectGroup>
                                <SelectLabel>Accessibility</SelectLabel>
                                <SelectItem value="free">Free</SelectItem>
                                <SelectItem value="paid">By a ticket</SelectItem>
                                </SelectGroup>
                            </SelectContent>
                            </Select>
                        </div>
                        {
                            access === 'paid' && 
                            <div className="mt-4">
                                <Input onChange={(e) => setPrice(String(e.target.value))} type="number" min={1} placeholder="Price" />
                            </div>
                        }
                        <div className="mt-4">
                        <Popover>
                            <PopoverTrigger asChild>
                                <Button
                                variant={"outline"}
                                className={cn(
                                    "w-full justify-start text-left font-normal",
                                    !date && "text-muted-foreground"
                                )}
                                >
                                <Image className="mr-2 h-4 w-4" src={CalendarIcon} width={50} height={50} alt="calendar" /> 
                                {date ? format(date, "PPP") : <span>Pick a date and time</span>}
                                </Button>
                            </PopoverTrigger>
                            <PopoverContent className="w-auto p-0">
                                <Calendar
                                mode="single"
                                selected={date}
                                onSelect={setDate}
                                initialFocus
                                />
                                <div className="p-3 border-t border-border">
                                    <TimePickerDemo setDate={setDate} date={date} />
                                </div>
                            </PopoverContent>
                            </Popover>
                        </div>
                        <div className="mt-4">
                            <Input onChange={(e) => setPerfomanceTime(parseInt(e.target.value))} type="number" min={1} placeholder="Default perfomance time" />
                        </div>
                        <div className="mt-4">
                                <div>
                                    {perfomanceOrder?.length > 0 && 
                                        <p onClick={() => setOrderOpen(prev => !prev)}
                                        className="cursor-pointer border-[1px] border-slate-200 py-3 px-3 rounded-lg text-[#69788f] opacity-60">Artists order</p>
                                    }
                                    {perfomanceOrder?.length > 0 && orderOpen &&
                                    <div className="border-[1px] border-slate-100 rounded-lg"> 
                                        {perfomanceOrder?.map((perf: any, i: number) => (
                                            <div key={perf.id} className="cursor-pointer border-[1px] py-3 px-3 rounded-lg text-[#69788f]
                                            opacity-60 hover:bg-slate-300 transition-all duration-500 hover:text-white"
                                            //@ts-ignore
                                            style={order.includes(perf.id) ? {background: '#8ea0bb', color: 'white'} : {outline: 'none'}}
                                            onClick={(e) => {
                                                e.preventDefault()
                                                //@ts-ignoreF
                                                if (order.includes(perf.id)){
                                                    //@ts-ignore
                                                    //@ts-ignore
                                                    setOrder(prev => prev.filter(p => p != perf.id))
                                                } else {
                                                setOrder(prev => [...prev, perf.id])
                                                }
                                                if (orderWithId.map((o: { id: any }) => o.id).includes(perf.id)){
                                                    orderNumber.current = orderNumber.current - 1
                                                    setOrderWithId(orderWithId.filter((o: { id: any }) => o.id !== perf.id))
                                                } else {
                                                    orderNumber.current = orderNumber.current + 1
                                                    setOrderWithId((prev: any) => [...prev, {order: orderNumber.current, id: perf.id}])
                                                }
                                            }}>
                                                {perf.user.name}
                                                {/* <span className="ml-4 pt-4">
                                                    {
                                                        orderWithId.length > 0 &&  orderWithId.filter((o: { id: any }) => o?.id == perf?.id)[0]?.order
                                                    }
                                                </span> */}
                                            </div>
                                        ))}
                                    </div>
                                    }
                                </div>
                        </div>
                        <div className="mt-4">
                            <Textarea onChange={e => setDescription(e.target.value)} placeholder="Type your description" />
                        </div>
                        <div className="mt-4">
                            <Label htmlFor="picture">Preview</Label>
                            <Input onChange={(e) => onUploadHanler(e)} id="picture" type="file" accept="image/png, image/gif, image/jpeg"/>
                        </div>
                            </div>
                        <div className="mt-4">
                            <Button onClick={onChangeHandler} className={styles.btn}>Change show</Button>
                        </div>
                            {/* <div>
                                <Image src={Show} width={500} height={400}  alt="image" />
                                <span>Server</span>
                                <Input disabled type="text" placeholder="rtmp://stream01:312/ticket" />
                                <span>Key</span>
                                <Input disabled type="text" placeholder="8DTFDSKCKSVDSJKDAS-" />
                            </div> */}
                        </Dialog.Panel>
                    </Transition.Child>
                    </div>
                </div>
                </Dialog>
    </Transition>
  )
}
