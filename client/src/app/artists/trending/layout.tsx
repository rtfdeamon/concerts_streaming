import { Metadata } from "next"


export const metadata: Metadata = {
    title: 'Trending artists',
    description: 'Trending artists all around the world'
  }

export default function layout({children}:{children:React.ReactNode}) {
  return (
    <>
        {children}
    </>
  )
}