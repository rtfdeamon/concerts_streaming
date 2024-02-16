'use client'
import { useState } from "react";
import { Button } from "@/shadComponents/ui/button";
import RequestModal from "./RequestModal";
import styles from './ShowPreview.module.scss';

export default function RequestButton() {
    const [isOpen, setIsOpen] = useState(false);
  return (
    <>
      <RequestModal isOpen={isOpen} setIsOpen={setIsOpen} />
      <Button
        onClick={() => setIsOpen(true)}
        className={styles.btn}>Register as an artist</Button>
    </>
  )
}
