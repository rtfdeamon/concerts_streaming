import { Metadata } from "next"


export const metadata: Metadata = {
    title: 'Followed artists',
    description: 'Your most loved artists'
  }

export default function layout({children}:{children:React.ReactNode}) {
  return (
    <>
        {children}
    </>
  )
}