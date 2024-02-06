import ShowPreview from "../Components/ShowPreview/ShowPreview"

export interface IPreviewParams {
  params:{
    id: string
  }
}

export default function page({params}:IPreviewParams) {
  return (
    <ShowPreview params={params} />
  )
}
