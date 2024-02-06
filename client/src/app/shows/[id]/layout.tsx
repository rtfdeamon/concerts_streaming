import { Metadata } from "next"
import { IShowParams } from "./page"


async function getShowData(id:string) {
  
}

export async function generateMetadata({ params }: IShowParams) {
  // const res = getShowData(params.id)
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