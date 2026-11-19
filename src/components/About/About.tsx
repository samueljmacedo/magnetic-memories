import {ArrowDown } from "lucide-react";

import "./About.css"
import aboutPicture from "../../data/images/about/about-picture.png"
import i18next from "i18next";

const About = () => {
    return (
        <section className="about section-wrap" id="about">
            <div className="about-photo">
                <img src={aboutPicture}
                     alt="Golden sunlight over a peaceful landscape" />
                <span className="about-photo-note text-note">
                   {i18next.t('about.noteMessage.p1')} <br />
                     {i18next.t('about.noteMessage.p2')}<br />
                     <i>{i18next.t('about.noteMessage.p3')}</i>
                </span>
            </div>
            <div className="about-copy">
                <h2 className="heading-display">Hello, <i>dear friends.</i></h2>
                <p className="text-body">I'm Samuel and this is the travel blog I created to share my trips, memories and magnet collection with my friends.
                I've always loved to travel and it's a pleasure to collect all these memories and show them to the world.</p>
                <p className="text-body">This journal is a place to keep it all: the big adventures and the tiny details in between.</p>
                <a href="#journeys" className="scroll-cue">
                    <ArrowDown size={15} />
                    {i18next.t('about.scrollMessage').toUpperCase()}
                </a>

            </div>
        </section>
    );
}

export default About;
