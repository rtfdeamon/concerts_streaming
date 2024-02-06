import Show from "@/app/Components/Show/Show"

export interface IShowParams {
  params:{
    id: string
  }
}

export default function page({params}:IShowParams) {
  return (
    <Show params={params} />
  )
}
