'use client'
import { useState } from "react"
import { Button } from "@/shadComponents/ui/button"
import CreateEventModal from "./Modal/CreateEventModal"
import styles from './CreateEvent.module.scss'

export default function CreateBtn() {
    const [isOpen, setIsOpen] = useState(false);
    return (
        <>
            <CreateEventModal isOpen={isOpen} setIsOpen={setIsOpen} />
            <Button
                onClick={() => setIsOpen(true)}
                className={styles.btn}>Create show</Button>
        </>
  )
}
