import Show from "../../Show/Show"

export interface IShowParams {
  params:{
    id: string
  }
}

export default function page({params}:{params: IShowParams}) {
  return (
    <Show params={params} />
  )
}
