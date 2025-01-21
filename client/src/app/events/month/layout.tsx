import { Metadata } from "next"


export const metadata: Metadata = {
    title: 'Month`s events',
    description: 'Events by the month'
  }

export default function layout({children}:{children:React.ReactNode}) {
  return (
    <>
        {children}
    </>
  )
}