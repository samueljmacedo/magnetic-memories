import {ArrowRight, MapPin} from "lucide-react";

const Map = () => {
    return (
        <section className="map-section" id="map">
            <div className="section-wrap map-layout">
                <div className="map-copy">
                    <p className="eyebrow">A WORLD OF MEMORIES</p>
                    <h2>Been there,<br /><i>felt that.</i></h2>
                    <p>Every pin holds a story. Explore the places I've wandered, the paths I've taken and the memories I've brought home.</p>
                    <a className="text-link" href="#map">Explore the travel map <ArrowRight size={16} /></a>
                    <div className="map-stats"><div><strong>12</strong><span>countries</span></div><div><strong>28</strong><span>cities</span></div><div><strong>04</strong><span>continents</span></div></div>
                </div>
                <div className="map-art" role="img" aria-label="Illustrated map with travel location markers">
                    <div className="map-paper">
                        <div className="map-grid-lines" />
                        <span className="map-label label-europe">EUROPE</span><span className="map-label label-asia">ASIA</span><span className="map-label label-africa">AFRICA</span>
                        <svg className="map-route" viewBox="0 0 600 390" aria-hidden="true"><path d="M130 160 Q210 80 285 150 T440 110 M285 150 Q260 240 345 280" /></svg>
                        <span className="map-pin pin-one"><MapPin size={25} fill="currentColor" /></span><span className="map-pin pin-two"><MapPin size={25} fill="currentColor" /></span><span className="map-pin pin-three"><MapPin size={25} fill="currentColor" /></span><span className="map-pin pin-four"><MapPin size={25} fill="currentColor" /></span>
                        <span className="map-coord">48°51' N · 2°21' E</span>
                        <span className="map-compass">N<br /><span>✳</span></span>
                        <span className="map-handwritten">you are<br />here-ish ♡</span>
                    </div>
                    <div className="map-tape" />
                </div>
            </div>
        </section>
    );
}

export default Map;