import { Metadata } from "next"
import { IPreviewParams } from "./page"


export async function generateMetadata({ params }: IPreviewParams) {
  // const res = getPreviewData(params.params.id)
  return {
    title: params.id,
    description: `Artists and by ${params.id} genre`
  }
}

export default function layout({children}:{children:React.ReactNode}) {
  return (
    <>
        {children}
    </>
  )
}