'use client'
import { useAppDispatch } from "@/app/hooks/rtkHooks"
import { changeShow } from "@/app/store/shows/showsSlice"
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
import { TimePickerDemo } from "../Admin/content/TimePicker/TimePicker"
import { Label } from "@/shadComponents/ui/label"
import { Textarea } from "@/shadComponents/ui/textarea"
import { format } from "date-fns"
import { cn } from "@/lib/utils"
import CalendarIcon from '../../../../public/calendar-range.svg'
import Image from "next/image"
import { Dispatch, SetStateAction } from "react"
import styles from './OptionsModal.module.scss'

export default function OptionsModal({isOpen, setIsOpen, id, posterUrl}:{isOpen: boolean, setIsOpen: Dispatch<SetStateAction<boolean>>, id: string, posterUrl: string}) {
    const dispatch = useAppDispatch();
    const [date, setDate] = useState<Date>();
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [slots, setSlots] = useState(1);
    const [err, setErr] = useState(false);
    const onCreateHandler = async () => {
        if (name === '' || description === "" || slots < 1 || typeof date === 'undefined'){
            setErr(true);
            return
        }
        const stringDate = date.toISOString();
        const res = await dispatch(changeShow({id, name, description, date: stringDate, slots}));
        // if (res.payload.ok) setIsOpen(false) : setErr (true)
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
                        <Dialog.Panel className="w-full max-w-5xl p-24 transform overflow-hidden rounded-2xl bg-white text-left align-middle shadow-xl transition-all">
                        <Dialog.Title
                            as="h3"
                            className="text-lg font-medium leading-6 text-gray-900 text-center"
                        >
                            Change show
                            {err && <span className={styles.span}>Please, fill in all required fields</span>}
                        </Dialog.Title>
                        <div>
                        <div className="mt-4">
                            <Image className="block mx-auto" src={posterUrl} width={400} height={200}  alt={id}/>
                        </div>
                        <div className="mt-4">
                            <Input onChange={(e) => setName(e.target.value)} type="text" placeholder="Show's title" />
                        </div>
                        <div className="mt-4">
                            <Input onChange={(e) => setSlots(parseInt(e.target.value))} type="number" defaultValue={1} min={1} placeholder="Slots number" />
                        </div>
                        <div className="mt-4">
                            <Select>
                            <SelectTrigger className="w-full">
                                <SelectValue placeholder="Select an accessibility" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectGroup>
                                <SelectLabel>Accessibility</SelectLabel>
                                <SelectItem value="free">Free</SelectItem>
                                <SelectItem value="ticket">By a ticket</SelectItem>
                                </SelectGroup>
                            </SelectContent>
                            </Select>
                        </div>
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
                            <Textarea onChange={e => setDescription(e.target.value)} placeholder="Type your description" />
                        </div>
                        <div className="mt-4">
                            <Label htmlFor="picture">Preview</Label>
                            <Input id="picture" type="file" accept="image/png, image/gif, image/jpeg"/>
                        </div>
                            </div>
                        <div className="mt-4">
                            <Button onClick={onCreateHandler} className={styles.btn}>Change</Button>
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
