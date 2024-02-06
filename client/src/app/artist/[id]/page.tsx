import Artist from "@/app/Components/Artist/Artist"

export interface IArtistParams {
  params:{
    id: string
  }
}

export default function page({params}:IArtistParams) {
  return (
    <Artist params={params} />
  )
}
