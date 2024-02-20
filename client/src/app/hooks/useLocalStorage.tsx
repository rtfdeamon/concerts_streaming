'use client'
import {  useEffect, useState } from "react"

const decode = (value: any) => {
  if (typeof value !== undefined){
    return JSON.stringify(value)
  }
}

const encode = (value: any) => {
  if (typeof value !== 'undefined'){
    return JSON.parse(value)
  }
}

const useLocalStorage = (key: string, defaultState: any) => {
  if (typeof window !== 'undefined'){
    const [value, setValue] = useState(
      encode(localStorage.getItem(key) || null) || defaultState
    )
    useEffect(() => {
      if (typeof value !== undefined){
        localStorage.setItem(key, decode(value) as string)
      }
      value === true ?
      document.body.setAttribute('theme', 'dark') :
      document.body.setAttribute('theme', 'light')
    },  [value])
  
    return [value, setValue]
  }else{
    const [value, setValue] = useState()
    return [value, setValue]
  }
  }

export {
  useLocalStorage
}