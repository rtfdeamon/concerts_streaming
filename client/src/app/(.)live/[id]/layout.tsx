// export async function generateMetadata({ params }) {
//   return {
//     title: `Комната ${params.id}`,
    
//   }
// }

export default function layout({children}:{children: React.ReactNode}) {
  return (
    <>
        {children}
    </>
  )
}
