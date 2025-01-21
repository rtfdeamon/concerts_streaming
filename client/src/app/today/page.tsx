import HeaderWithoutBanner from "../Components/Header/HeaderWithouBanner"
import ViewShows from "../Components/ViewShows/ViewShows"

export default function page() {

  return (
    <>
      <HeaderWithoutBanner />
      <ViewShows title="Todays shows" type="today" />
    </>
  )
}
