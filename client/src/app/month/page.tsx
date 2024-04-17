import HeaderWithoutBanner from "../Components/Header/HeaderWithouBanner"
import ViewShows from "../Components/ViewShows/ViewShows"

export default function page() {

  return (
    <>
      <HeaderWithoutBanner />
      <ViewShows title="Shows in this month" type="month" />
    </>
  )
}
