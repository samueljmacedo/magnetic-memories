import About from "./components/About/About.tsx";
import Footer from "./components/Footer/Footer.tsx";
import Header from "./components/Header/Header.tsx";
import IntroStrip from "./components/IntroStrip/IntroStrip.tsx";
import JourneyCarrousel from "./components/JourneyCarrousel/JourneyCarrousel.tsx";
import QuoteBand from "./components/QuoteBand/QuoteBand.tsx";
import TravelMap from "./components/TravelMap/TravelMap.tsx";
import MagnetPanel from "./components/MagnetPanel/MagnetPanel.tsx";
import {JourneysProvider} from "./context/JourneysContext.tsx";
import {TravelMagnetsProvider} from "@/context/TravelMagnetsContext.tsx";

function App() {
  return (
    <div className="site-shell">
      <Header />

      <main id="home">
        <About />
        <IntroStrip />
        {/* <Hero /> */}
        {/* The journeys are fetched from Sanity once and shared by the carousel and the map. */}
        <JourneysProvider>
            <JourneyCarrousel />
            <TravelMap />
        </JourneysProvider>
        <TravelMagnetsProvider>
            <MagnetPanel />
        </TravelMagnetsProvider>
        <QuoteBand />
      </main>

      <Footer />
    </div>
  )
}

export default App
