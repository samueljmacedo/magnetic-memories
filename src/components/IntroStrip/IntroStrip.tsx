import {currentLocation} from "../../data/data.ts";
import "./IntroStrip.css";

const IntroStrip = () => {
    return (
        <section className="intro-strip">
            <div className="section-wrap intro-inner">
                <span className="intro-label meta-label">CURRENT LOCATION</span>
                <div className="intro-location">
                    <div className="intro-location-ping" aria-hidden="true"></div>
                    <p>{currentLocation.city} <i>{currentLocation.country}</i></p>
                </div>
            </div>
        </section>
    );
}

export default IntroStrip;
