import Live from "@/app/Components/Live/Live"

export interface ILiveParams {
  params:{
    id: string
  }
}

export default function page({params}:ILiveParams) {
  return (
    <Live params={params} />
  )
}
