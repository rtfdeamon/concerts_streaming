'use client'
import {  useEffect, useState } from "react"

const decode = (value: any) => {
  return JSON.stringify(value)
}

const encode = (value: any) => {
  return JSON.parse(value)
}

const useLocalStorage = (key: string, defaultState: any) => {
  if (typeof window !== 'undefined'){
    const [value, setValue] = useState(
      encode(localStorage.getItem(key) || null) || defaultState
    )
    useEffect(() => {
      localStorage.setItem(key, decode(value))
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