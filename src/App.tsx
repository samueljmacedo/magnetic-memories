import About from "./components/About/About.tsx";
import Footer from "./components/Footer/Footer.tsx";
import Header from "./components/Header/Header.tsx";
import JourneyCarrousel from "./components/JourneyCarrousel/JourneyCarrousel.tsx";
import PostmarkStrip from "./components/PostmarkStrip/PostmarkStrip.tsx";
import TicketStrip from "./components/TicketStrip/TicketStrip.tsx";
import TravelMap from "./components/TravelMap/TravelMap.tsx";
import MagnetPanel from "./components/MagnetPanel/MagnetPanel.tsx";
import VisitorMap from "./components/VisitorMap/VisitorMap.tsx";
import {JourneysProvider} from "./context/JourneysContext.tsx";
import {TravelMagnetsProvider} from "@/context/TravelMagnetsContext.tsx";

function App() {
  return (
    <div className="site-shell">
      <Header />

      <main id="home">
        <JourneysProvider>
            <About />
            <TicketStrip />
            {/* <Hero /> */}
            <JourneyCarrousel />
            <TravelMap />
            <TravelMagnetsProvider>
                <MagnetPanel />
            </TravelMagnetsProvider>
            <PostmarkStrip />
            <VisitorMap />
        </JourneysProvider>
      </main>

      <Footer />
    </div>
  )
}

export default App
