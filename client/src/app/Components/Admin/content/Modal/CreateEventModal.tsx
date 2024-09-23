'use client'
import { useAppDispatch } from "@/app/hooks/rtkHooks"
import { createShow } from "@/app/store/shows/showsSlice"
import { Dialog, Transition } from "@headlessui/react"
import { Fragment, useState } from "react"
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
import styles from './modal.module.scss'
import { generateUploadLink } from "@/app/utils/generateUploadLink"

export default function CreateEventModal({isOpen, setIsOpen}:{isOpen: boolean, setIsOpen: Dispatch<SetStateAction<boolean>>}) {
    const dispatch = useAppDispatch();
    const [date, setDate] = useState<Date>();
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [slots, setSlots] = useState(1);
    const [err, setErr] = useState(false);
    const [perfomanceTime, setPerfomanceTime] = useState(0);
    const [posterUrl, setPosterUrl] = useState<string | undefined>(undefined);
    const [category, setCategory] = useState("");
    const [subCategory, setSubCategory] = useState<string | undefined>()
    const [access, setAccess] = useState("");
    const [price, setPrice] = useState("");
    const [isFetching, setIsFetching] = useState(false)
    const categoryChangeHandler = (e: string) => {
        setCategory(e);
    }
    const accessChangeHandler = (e: string) => {
        setAccess(e);
    }
    const onUploadHanler = async (e:ChangeEvent<HTMLInputElement>) => {
        setIsFetching(true)
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
                setPosterUrl((`https://${location.host}${link.url.split('?')[0]}`))
            }
            setIsFetching(false)
        }
    }
    const onCreateHandler = async () => {
        if (name === '' || description === "" || slots < 1 || typeof date === 'undefined'
        || perfomanceTime === 0 || typeof posterUrl === 'undefined' || category === '' || access === "" || category === ""){
            setErr(true);
            return;
        } else{
            const stringDate = date.toISOString();
            const res: any = await dispatch(createShow({name, description, date: stringDate, slots,
            performance_time: perfomanceTime, poster_url: posterUrl, category, subcategory: subCategory, access, ticket_price: price}));
            if (res.payload.id){
                setIsOpen(false);
            } else{
                setErr (true);
            }
            setName('')
            setDescription('')
            setDate(undefined)
            setPosterUrl(undefined)
            setAccess('')
            setCategory('')
            setPerfomanceTime(0)
            setSlots(1)
            
        }
    }
    const onCloseHandler = () => {

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
                                Create show
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
                                <SelectTrigger className="w-full"
                                    >
                                    <SelectValue placeholder="Select concert category" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectGroup>
                                    <SelectLabel>Category</SelectLabel>
                                    <SelectItem value="actors">Actors</SelectItem> 
                                    <SelectItem value="authors-and-writers">Authors & Writers</SelectItem>
                                    <SelectItem value="bloggers-and-podcasters">Bloggers & Podcasters</SelectItem>
                                    <SelectItem value="comedy">Comedy</SelectItem>
                                    <SelectItem value="cosmetology">Cosmetology</SelectItem>
                                    <SelectItem value="culinary">Culinary</SelectItem>
                                    <SelectItem value="dance">Dance</SelectItem>
                                    <SelectItem value="design">Design</SelectItem>
                                    <SelectItem value="director">Director</SelectItem>
                                    <SelectItem value="fashion">Fashion</SelectItem>
                                    <SelectItem value="modeling">Modeling</SelectItem>
                                    <SelectItem value="artist">Music</SelectItem>
                                    <SelectItem value="painter">Painter</SelectItem>
                                    <SelectItem value="photography">Photography</SelectItem>
                                    <SelectItem value="producer">Producer</SelectItem>
                                    <SelectItem value="sound Engineer">Sound Engineer</SelectItem>
                                    </SelectGroup>
                                </SelectContent>
                            </Select>
                        </div>
                        {category === 'artist' && (
                            <div className="mt-4">
                                <Select
                                    onValueChange={(e) => setSubCategory(e)}
                                    value={subCategory}
                                >
                                    <SelectTrigger className="w-full"
                                        >
                                        <SelectValue placeholder="Select concert genre" />
                                    </SelectTrigger>
                                    <SelectContent>
                                    <SelectGroup>
                                        <SelectLabel>Genre</SelectLabel>
                                            <SelectItem value="alternative">Alternative</SelectItem>
                                            <SelectItem value="blues">Blues</SelectItem>
                                            <SelectItem value="classical">Classical</SelectItem>
                                            <SelectItem value="country">Country</SelectItem>
                                            <SelectItem value="electronic">Electronic</SelectItem>
                                            <SelectItem value="funk">Funk</SelectItem>
                                            <SelectItem value="hiphop">Hip hop & R&B</SelectItem>
                                            <SelectItem value="jazz">Jazz</SelectItem>
                                            <SelectItem value="latin">Latin</SelectItem>
                                            <SelectItem value="metal">Metal</SelectItem>
                                            <SelectItem value="other">Other</SelectItem>
                                            <SelectItem value="pop">Pop</SelectItem>
                                            <SelectItem value="punk">Punk</SelectItem>
                                            <SelectItem value="r&b">R&B</SelectItem>
                                            <SelectItem value="rap">Rap</SelectItem>
                                            <SelectItem value="rock">Rock</SelectItem>
                                        </SelectGroup>
                                    </SelectContent>
                                </Select>
                            </div>
                        )}
                        <div className="mt-4">
                            <Input onChange={(e) => setSlots(parseInt(e.target.value))} type="number" min={1} placeholder="Slots number" />
                        </div>
                        <div className="mt-4">
                            <Select onValueChange={(e) => accessChangeHandler(e)} value={access} >
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
                            <Input onChange={(e) => setPerfomanceTime(parseInt(e.target.value))} type="number" min={1} placeholder="Set perfomance time" />
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
                            <Button  disabled={isFetching} onClick={onCreateHandler} className={styles.btn}>Create</Button>
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
