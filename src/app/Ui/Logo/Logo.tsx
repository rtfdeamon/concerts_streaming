import Link from "next/link"
import Image from "next/image"
import Dark from '../../../../public/LogoLight.png'
import LightLogo from '../../../../public/Logo.png'

export default function Logo({variant} : {variant: string}) {
  return (
    <>
      {
        variant === 'light' ?
        <Link href={process.env.FRONTEND_URL !}>
          <Image src={LightLogo} width={200} height={20} alt="logo"/>
        </Link>
        :
        <Link href={process.env.FRONTEND_URL !}>
          <Image src={Dark} width={100} height={5} alt="logo"/>
        </Link>
      }
    </>
  )
}
