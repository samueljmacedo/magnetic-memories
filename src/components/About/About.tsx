import {ArrowDown } from "lucide-react";

import "./About.css"
import aboutPicture from "../../data/images/about/about-picture.png"

const About = () => {
    return (
        <section className="about section-wrap" id="about">
            <div className="about-photo">
                <img src={aboutPicture}
                     alt="Golden sunlight over a peaceful landscape" />
                <span className="about-photo-note text-note">
                    The trip<br />is always<br /><i>worth it.</i>
                </span>
            </div>
            <div className="about-copy">
                {/*<p className="eyebrow">WHO I AM</p>*/}
                <h2>Hello, <i>dear friends.</i></h2>
                <p className={"text-primary"}> I'm Samuel and this the travel blog I created to share my trips, memories and magnet collection with my friends.
                I always loved to travel and it's a pleasure to collect all these memories and show them to world.</p>
                <p className="text-primary">This journal is a place to keep it all: the big adventures and the tiny details in between.</p>
                {/*<a href="mailto:hello@example.com" className="text-link">
                    Say hello
                    <ArrowRight size={16} />
                </a>*/}
                <a href="#journeys" className="scroll-cue">
                    <ArrowDown size={15} /> SCROLL TO EXPLORE
                </a>

            </div>
        </section>
    );
}

export default About;