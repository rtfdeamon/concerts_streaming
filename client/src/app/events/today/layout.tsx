import { Metadata } from "next"


export const metadata: Metadata = {
    title: 'Today`s events',
    description: 'Events by the current day'
  }

export default function layout({children}:{children:React.ReactNode}) {
  return (
    <>
        {children}
    </>
  )
}