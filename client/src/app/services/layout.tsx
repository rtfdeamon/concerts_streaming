export async function generateMetadata() {
  return {
    title: 'Services',
    description: `All platfrom services`
  }
}

export default function layout({children}:{children:React.ReactNode}) {
  return (
    <>
        {children}
    </>
  )
}