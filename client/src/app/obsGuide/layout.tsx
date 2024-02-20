import { Metadata } from "next"


export const metadata: Metadata = {
    title: 'How to use OBS',
    description: 'This page will prepare you to use the OBS program: how to configure video stream and audio'
  }

export default function layout({children}:{children:React.ReactNode}) {
  return (
    <>
        {children}
    </>
  )
}