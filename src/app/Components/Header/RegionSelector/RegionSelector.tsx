'use client'
import { useState } from "react"
import RegionButton from "./RegionButton"
import RegionModal from "./RegionModal"

export default function RegionSelector() {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  return (
    <div>
      <RegionButton modalIsOpen={modalIsOpen} setModalIsOpen={setModalIsOpen} />
      <RegionModal modalIsOpen={modalIsOpen} setModalIsOpen={setModalIsOpen} />
    </div>
  )
}
