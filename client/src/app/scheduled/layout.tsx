import { Metadata } from "next"


export const metadata: Metadata = {
    title: 'Scheduled concerts',
    description: 'Best scheduled concerts from your favorite artists'
  }

export default function layout({children}:{children:React.ReactNode}) {
  return (
    <>
        {children}
    </>
  )
}