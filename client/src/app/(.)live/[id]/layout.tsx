import { ILiveParams } from "@/app/live/[id]/page";
import { IShow } from "@/app/types/interfaces";

// async function getShowData(id:string) {
//   const res = await fetch(`${process.env.BACKEND_URL}/concerts/${id}/`)
//   const data: IShow = await res.json();
//   return data
// }

// export async function generateMetadata({ params }: ILiveParams) {
//   const res = await getShowData(params.id);
//   return {
//     title: res.name,
//     description: res.description
//   }
// }

export default function layout({children}:{children: React.ReactNode}) {
  return (
    <>
        {children}
    </>
  )
}
