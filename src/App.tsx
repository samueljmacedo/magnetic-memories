import About from "./components/About/About.tsx";
import Footer from "./components/Footer/Footer.tsx";
import Header from "./components/Header/Header.tsx";
import IntroStrip from "./components/IntroStrip/IntroStrip.tsx";
import JourneyCarrousel from "./components/JourneyCarrousel/JourneyCarrousel.tsx";
import Moments from "./components/Moments/Moments.tsx";
import QuoteBand from "./components/QuoteBand/QuoteBand.tsx";
import TravelMap from "./components/TravelMap/TravelMap.tsx";

function App() {
  return (
    <div className="site-shell">
      <Header />

      <main id="home">
        <About />
        <IntroStrip />
        {/* Hero is parked: to bring it back, import it from "./components/Hero/Hero.tsx" and render <Hero /> here. */}
        <JourneyCarrousel />
        <TravelMap />
        <QuoteBand />
        <Moments />
      </main>

      <Footer />
    </div>
  )
}

export default App
