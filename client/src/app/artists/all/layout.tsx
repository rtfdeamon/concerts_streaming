import { Metadata } from "next"


export const metadata: Metadata = {
    title: 'All artists',
    description: 'Artists of all around the world'
  }

export default function layout({children}:{children:React.ReactNode}) {
  return (
    <>
        {children}
    </>
  )
}