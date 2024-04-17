import { Metadata } from "next"


export const metadata: Metadata = {
    title: 'Todays shows',
    description: 'Todays shows'
  }

export default function layout({children}:{children:React.ReactNode}) {
  return (
    <>
        {children}
    </>
  )
}