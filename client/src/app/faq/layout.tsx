import { Metadata } from "next"


export const metadata: Metadata = {
    title: 'Frequently asked questions',
    description: 'Frequently asked questions about DPE platform'
  }

export default function layout({children}:{children:React.ReactNode}) {
  return (
    <>
        {children}
    </>
  )
}