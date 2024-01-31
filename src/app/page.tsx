import Header from './Components/Header/Header'
import TagsCarousel from './Components/TagsCarousel/TargsCarousel'
import Recommendations from './Components/Recommendations/Recommendations';
import TargsCarousel from './Components/TagsCarousel/TargsCarousel';
import Shows from './Components/Shows/Shows';
import About from './Components/About/About';
import CallToAction from './Components/CallToAction/CallToAction';
import MailSubscription from './Components/MailSubscription/MailSubscription';
import Footer from './Components/Footer/Footer';

export default function Home() {
  return (
    <>
      <Header />
      {/* <TargsCarousel />  */}
          <main className='main'>
            <Shows />
            <Recommendations />
          </main>
          <div className='main'>
            <CallToAction />
          </div>
          <About />
          <MailSubscription />
      <Footer />
    </>
  );
}
