import { Metadata } from "next"


export const metadata: Metadata = {
    title: 'Terms of use',
    description: 'Terms of use of DPE platform'
  }

export default function layout({children}:{children:React.ReactNode}) {
  return (
    <>
        {children}
    </>
  )
}