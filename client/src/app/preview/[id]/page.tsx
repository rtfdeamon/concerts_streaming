import CheckIsAuth from "@/app/utils/checkIsAuth"
import ShowPreview from "@/app/Components/ShowPreview/ShowPreview"

export interface IPreviewParams {
  params:{
    id: string
  }
}

export default function page({params}:IPreviewParams) {
  return (
    <>
      <ShowPreview params={params} />    
    </>
  )
}
