import { Metadata } from "next"


export const metadata: Metadata = {
    title: 'New Member Artists',
    description: 'New Member Artists all around the world'
  }

export default function layout({children}:{children:React.ReactNode}) {
  return (
    <>
        {children}
    </>
  )
}