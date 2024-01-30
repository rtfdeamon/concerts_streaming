'use client'
import { useState, useEffect } from "react"
import { Switch } from '@headlessui/react'
import Image from "next/image"
import Sun from '../../../../../public/sun.svg'
import Moon from '../../../../../public/moon.svg'

export default function ThemeSwitcher() {
    const [enabled, setEnabled] = useState(false)
    useEffect(() => {
        enabled
        ?
            localStorage.setItem('theme', 'dark')
        :
            localStorage.setItem('theme', 'light')
    }, [enabled])
  return (
    <Switch
        checked={enabled}
        onChange={setEnabled}
        className={`${
        enabled ? 'bg-slate-500' : 'bg-blue-600'
        } relative inline-flex h-8 w-16 items-center rounded-full`}
    >   
        <div className="flex justify-between">
            <Image className="absolute left-1 bottom-[6px]" src={Moon} width={20} height={10}  alt=""/>
            <Image className="absolute right-1 bottom-[6px]" src={Sun} width={20} height={10}  alt=""/>
        </div>
        <div
        className={`${
            enabled ? 'absolute translate-x-9' : 'absolute translate-x-1'
        } inline-block h-6 w-6 transform rounded-full bg-white transition`}
        >
            
        </div>
  </Switch>
  )
}
