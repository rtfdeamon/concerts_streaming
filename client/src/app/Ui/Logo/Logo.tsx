import Link from "next/link"
import Image from "next/image"
import Dark from '../../../../public/LogoLight.png'
import LightLogo from '../../../../public/Logo.png'

export default function Logo({variant} : {variant: string}) {
  return (
    <>
      {
        variant === 'light' ?
        <Link href={"/"}>
          <Image src={LightLogo} width={150} height={10} alt="logo"/>
        </Link>
        :
        <Link href={"/"}>
          <Image src={Dark} width={150} height={10} alt="logo"/>
        </Link>
      }
    </>
  )
}
