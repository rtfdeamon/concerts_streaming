import InfoByGenre from "@/app/Components/InfoByGenre/InfoByGenre"

export interface IPreviewParams {
  params:{
    id: string
  }
}

export default function page({params}:IPreviewParams) {
  return (
    <>
      <InfoByGenre params={{params}}  isArtists={true}/>
    </>
  )
}
