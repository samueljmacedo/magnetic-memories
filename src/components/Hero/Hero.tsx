import {ArrowDown, ArrowRight} from "lucide-react";
import "./Hero.css"

const Hero = () => {
    return (
        <section className="hero section-wrap">
            <div className="hero-copy">
                <p className="eyebrow"><span className="eyebrow-line" /> THE WORLD, THROUGH MY EYES</p>
                <h1>Collecting places.<br /><i>Keeping moments.</i></h1>
                <p className="text-body hero-description">A personal collection of faraway places, familiar feelings, little souvenirs and the moments worth keeping.</p>
                <a className="text-link" href="#journeys">Wander through my stories <ArrowRight size={16} /></a>
            </div>
            <div className="hero-art">
                <figure className="hero-photo polaroid">
                    <img src="https://images.unsplash.com/photo-1533105079780-92b9be482077?auto=format&fit=crop&w=1200&q=90" alt="Whitewashed Mediterranean buildings overlooking the sea" />
                    <figcaption className="polaroid-caption">somewhere under the sun · '25</figcaption>
                </figure>
                <div className="floating-note"><span>postcard<br />from</span><strong>the<br /><i>everywhere</i></strong><span className="note-stamp">✳</span></div>
                <span className="hero-sparkle sparkle-one">✳</span><span className="hero-sparkle sparkle-two">✳</span>
            </div>
            <a href="#journeys" className="scroll-cue"><ArrowDown size={15} /> SCROLL TO EXPLORE</a>
        </section>
    );
}

export default Hero;
