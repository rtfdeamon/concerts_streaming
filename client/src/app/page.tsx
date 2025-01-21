import Header from './Components/Header/Header'
import Recommendations from './Components/Recommendations/Recommendations';
import Shows from './Components/Shows/Shows';
import About from './Components/About/About';
import CallToAction from './Components/CallToAction/CallToAction';
import MailSubscription from './Components/MailSubscription/MailSubscription';
import Footer from './Components/Footer/Footer';

export default function Home() {
  return (
    <>
      <Header type='banner'/>
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
