import Header from './Components/Header/Header'
import TagsCarousel from './Components/TagsCarousel/TargsCarousel'
import Banner from './Components/Banner/Banner';
import Shows from './Components/Shows/Shows';
import Footer from './Components/Footer/Footer';

export default function Home() {
  return (
    <>
      <Header />
      <TagsCarousel />
        <main className='main'>
          <Banner />
          <Shows />
        </main>
      <Footer />
    </>
  );
}
