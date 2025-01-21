
import LiveModal from "@/app/Components/LiveModal/LiveModal"

export interface ILiveModal {
  params:{
    id: string
  }
}

export default function page({params}:ILiveModal) {
  
  return (
    <LiveModal params={params} />
  )
}
