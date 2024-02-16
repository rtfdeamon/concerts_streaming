import { Metadata } from "next"


export const metadata: Metadata = {
    title: 'About us',
    description: 'DPE is a musical innovation platform for musiancs, viewers and sponsors'
  }

export default function layout({children}:{children:React.ReactNode}) {
  return (
    <>
        {children}
    </>
  )
}