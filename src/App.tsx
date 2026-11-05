import {Globe2, Menu, Sparkles} from 'lucide-react'
import {useState} from 'react'
import JourneyCarrousel from "./components/JourneyCarrousel/JourneyCarrousel.tsx";
import Map from "./components/Map/Map.tsx";
import About from "./components/About/About.tsx";
import Hero from "./components/Hero/Hero.tsx";
import Moments from "./components/Moments/Moments.tsx";
import IntroStrip from "./components/IntroStrip/IntroStrip.tsx";

function App() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [language, setLanguage] = useState('EN')

  return (
    <div className="site-shell">
      <div className="announcement"><span className="tiny-star">✳</span> A little collection of places, magnets & moments
        <span className="tiny-star">✳</span></div>
      <header className="header">
        <a className="brand" href="#home" aria-label="Magnetic Memories home">
          <span className="brand-mark">mM.</span>
          <span>Magnetic <em>Memories</em></span>
        </a>
        <button className="mobile-menu" onClick={() => setMenuOpen(!menuOpen)} aria-label="Toggle navigation"><Menu size={21} /></button>
        <nav className={menuOpen ? 'nav nav-open' : 'nav'}>
          <a href="#journeys" onClick={() => setMenuOpen(false)}>My journeys</a>
          <a href="#map" onClick={() => setMenuOpen(false)}>Travel map</a>
          <a href="#moments" onClick={() => setMenuOpen(false)}>Little moments</a>
          <a href="#about" onClick={() => setMenuOpen(false)}>About</a>
        </nav>
        <div className="language">
          <Globe2 size={15} />
          <select
              aria-label="Choose language"
              value={language}
              onChange={e => setLanguage(e.target.value)}>
            <option value="EN">EN</option>
            <option value="PT">PT</option>
            <option value="FR">FR</option>
          </select>
        </div>
      </header>

      <main id="home">
        <About />
        <IntroStrip />
        {/*<Hero />*/}
        <JourneyCarrousel />
        <Map />

        <section className="quote-band">
          <Sparkles size={17} />
          <p>“We travel not to escape life, but for life not to escape us.”</p>
          <span>A LITTLE REMINDER TO KEEP WANDERING</span>
        </section>

        <Moments />

      </main>

      <footer className="footer">
        <div className="section-wrap footer-inner">
          <a className="brand footer-brand" href="#home"><span className="brand-mark">mM.</span><span>Magnetic <em>Memories</em></span></a>
          <p>A little collection of places, magnets & memories.</p>
          <div className="footer-right"><span>© 2025 · ALL RIGHTS RESERVED</span><a href="#home">BACK TO TOP ↑</a></div>
        </div>
      </footer>
    </div>
  )
}

export default App
