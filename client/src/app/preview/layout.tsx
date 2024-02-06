import { Metadata } from "next"
import { IPreviewParams } from "./page"


async function getPreviewData(id:string) {
  
}

export async function generateMetadata({ params }: {params: IPreviewParams}) {
  const res = getPreviewData(params.params.id)
  return {
    title: '...',
  }
}

export default function layout({children}:{children:React.ReactNode}) {
  return (
    <>
        {children}
    </>
  )
}