import { Metadata } from "next"


export const metadata: Metadata = {
    title: 'Privacy policy',
    description: 'Privacy policy of DPE platform'
  }

export default function layout({children}:{children:React.ReactNode}) {
  return (
    <>
        {children}
    </>
  )
}