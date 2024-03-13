'use client'
import { useState } from "react";
import { Button } from "@/shadComponents/ui/button";
import RequestModal from "./RequestModal";
import styles from './ShowPreview.module.scss';

export default function RequestButton({id}:{id: string}) {
    const [isOpen, setIsOpen] = useState(false);
  return (
    <>
      <RequestModal id={id} isOpen={isOpen} setIsOpen={setIsOpen} />
      <Button
        onClick={() => setIsOpen(true)}
        className={styles.buyBtn}>Register as an artist</Button>
    </>
  )
}
