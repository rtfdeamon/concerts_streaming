import { Metadata } from "next"
import { IArtistParams } from "./page"


async function getShowData(id:string) {
  
}

export async function generateMetadata({ params }:IArtistParams) {
  // const res = getShowData(params.params.id)
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