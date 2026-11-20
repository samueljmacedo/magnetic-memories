import {currentLocation} from "@/data/data.ts";
import "./IntroStrip.css";
import {useTranslation} from "react-i18next";
import {countryName} from "@/utils/localized.ts";

const IntroStrip = () => {
    const {t} = useTranslation();
    return (
        <section className="intro-strip">
            <div className="section-wrap intro-inner">
                <span className="intro-label meta-label">{t('strip.currentLocation')}</span>
                <div className="intro-location">
                    <div className="intro-location-ping" aria-hidden="true"></div>
                    <p>{currentLocation.city} <i>{countryName(t, currentLocation.country)}</i></p>
                </div>
            </div>
        </section>
    );
}

export default IntroStrip;
