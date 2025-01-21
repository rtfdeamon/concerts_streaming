import { Metadata } from "next"


export const metadata: Metadata = {
    title: 'Live concerts',
    description: 'Best live concerts from your favorite artists'
  }

export default function layout({children}:{children:React.ReactNode}) {
  return (
    <>
        {children}
    </>
  )
}