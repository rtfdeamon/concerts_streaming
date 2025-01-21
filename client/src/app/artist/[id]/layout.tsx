import { IArtist } from "@/app/types/interfaces"
import { IArtistParams } from "./page"


async function getShowData(id:string) {
  const res = await fetch(`${process.env.BACKEND_URL}/artists/${id}/`)
  const data:IArtist = await res.json()
  return data;
}

export async function generateMetadata({ params }:IArtistParams) {
  const res = await getShowData(params.id)
  return {
    title: res.name,
    description: `Page of ${res.name} artist`
  }
}

export default function layout({children}:{children:React.ReactNode}) {
  return (
    <>
        {children}
    </>
  )
}