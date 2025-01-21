import { Metadata } from "next"


export const metadata: Metadata = {
    title: 'Sign up',
    robots: { index: false, follow: false }
  }

export default function layout({children}:{children:React.ReactNode}) {
  return (
    <>
        {children}
    </>
  )
}