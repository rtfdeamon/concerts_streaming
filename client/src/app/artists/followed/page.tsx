import CheckIsAuth from "@/app/utils/checkIsAuth"
import HeaderWithoutBanner from "@/app/Components/Header/HeaderWithouBanner"
import FollowedArtists from "@/app/Components/Profile/FollowedArtists"

export default function page() {
  return (
      <>
        <CheckIsAuth type="followedArtists" />
        <HeaderWithoutBanner />
        <FollowedArtists />
      </>
  )
}
