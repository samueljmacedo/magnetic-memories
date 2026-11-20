import {ArrowDown } from "lucide-react";

import "./About.css"
import aboutPicture from "../../data/images/about/about-picture.png"
import {useTranslation} from "react-i18next";

const About = () => {
    const {t} = useTranslation();
    return (
        <section className="about section-wrap" id="about">
            <div className="about-photo">
                <img src={aboutPicture}
                     alt="Golden sunlight over a peaceful landscape" />
                <span className="about-photo-note text-note">
                   {t('about.noteMessage.p1')} <br />
                     {t('about.noteMessage.p2')}<br />
                     <i>{t('about.noteMessage.p3')}</i>
                </span>
            </div>
            <div className="about-copy">
                <h2 className="heading-display">
                  {t('about.header.p1')}<i>{t('about.header.p2')}</i>
                </h2>
                <p className="text-body">
                  {t('about.description.p1')}
                </p>
                <p className="text-body">{t('about.description.p2')}</p>
                <a href="#journeys" className="scroll-cue">
                    <ArrowDown size={15} />
                    {t('about.scrollMessage').toUpperCase()}
                </a>

            </div>
        </section>
    );
}

export default About;
