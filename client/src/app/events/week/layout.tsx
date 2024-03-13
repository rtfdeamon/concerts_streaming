import { Metadata } from "next"


export const metadata: Metadata = {
    title: 'Week`s events',
    description: 'Events by the week'
  }

export default function layout({children}:{children:React.ReactNode}) {
  return (
    <>
        {children}
    </>
  )
}