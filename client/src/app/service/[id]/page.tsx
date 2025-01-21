import CheckIsAuth from "@/app/utils/checkIsAuth"
import ShowPreview from "@/app/Components/ShowPreview/ShowPreview"
import ServicePreview from "@/app/Components/ServicePreview/ServicePreview"

export interface IPreviewParams {
  params:{
    id: string
  }
}

export default function page({params}:IPreviewParams) {
  return (
    <>
      <ServicePreview params={params} />    
    </>
  )
}
