'use client'
import { Input } from '@/shadComponents/ui/input'
import styles from './input.module.scss'

export default function SearchInput(
    {placeholder, variant}:
    {placeholder:string, variant: string}) {
  return (
    <div className={variant === 'header' ? styles.inputHeader : styles.inputDefault}>
        <span></span>
        <Input type="text" placeholder={placeholder} />
    </div>
  )
}
