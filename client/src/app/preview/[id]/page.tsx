import ShowPreview from "@/app/Components/ShowPreview/ShowPreview"

export interface IPreviewParams {
  params:{
    id: string
  }
}

export default function page({params}:{params: IPreviewParams}) {
  return (
    <ShowPreview params={params} />
  )
}
