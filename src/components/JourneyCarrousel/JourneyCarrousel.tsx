import {journeys} from "@/data/data.ts";
import {padNumber} from "@/utils/format.ts";
import {ArrowLeft, ArrowRight} from "lucide-react";
import {useState} from "react";
import "./JourneyCarrousel.css";
import {filterCountriesAlphabetically} from "@/utils/journey.ts";

const JourneyCarrousel = () => {
    const countries = filterCountriesAlphabetically();
    const [yearfilterIndex, setYearfilterIndex] = useState('all');
    const [countryFilter, setCountryFilter] = useState('all');
    const years = journeys.map(journey => ({
        id: journey.id,
        name: journey.startDate
    }));
    const [journeyIndex, setJourneyIndex] = useState(0)
    const activeJourney = journeys[journeyIndex]
    const changeJourney = (direction: number) => {
        setJourneyIndex((current) =>
            (current + direction + journeys.length) % journeys.length)
    }

    if (!activeJourney) return null

    return (
        <section className="journeys section-wrap" id="journeys">
            <div className="section-heading">
                <div><p className="eyebrow">THE TRAVEL DIARIES</p><h2 className="heading-display">Journeys & <i>memories</i></h2></div>
                {/*<p className="heading-aside">
                    A few favourite chapters<br />from the places I've been.
                </p>*/}
                <div>
                    <select
                        aria-label="Choose year"
                        value={yearfilterIndex}
                        onChange={(event) => setYearfilterIndex(event.target.value)}
                    >
                            <option key={0} value={'all'}>All years</option>
                        {years.map((filter) => (
                            <option key={filter.id} value={filter.name}>{filter.name}</option>
                        ))}
                    </select>
                    <select
                        aria-label="Choose country"
                        value={countryFilter}
                        onChange={(event) => setCountryFilter(event.target.value)}
                    >
                        <option key={0} value={'all'}>All years</option>
                        {countries.map(country => (
                            <option key={country.id} value={country.name}>{country.name}</option>
                        ))}
                    </select>
                </div>
            </div>
            <div className="journey-carousel">
                <figure className="polaroid journey-polaroid">
                    <img src={activeJourney.image} alt={`${activeJourney.city}, ${activeJourney.country}`} />
                    <figcaption className="polaroid-caption">{activeJourney.city} · {activeJourney.startDate}</figcaption>
                    <span className="tape" />
                </figure>
                <div className="journey-story" aria-live="polite">
                    <div className="journey-meta meta-label"><span>{activeJourney.tag}</span><span>{padNumber(journeyIndex + 1)} / {padNumber(journeys.length)}</span></div>
                    <h3 className="heading-display">{activeJourney.city}<br /><i>{activeJourney.country}</i></h3>
                    <p className="text-body">{activeJourney.description}</p>
                    <div className="carousel-controls">
                        <button onClick={() => changeJourney(-1)} aria-label="Previous journey"><ArrowLeft size={17} /></button>
                        <div className="carousel-dots" role="group" aria-label="Choose a journey">
                            {journeys
                                //.filter(item => countryFilter === 'all' ? false : item.country === countryFilter)
                                .map((journey, index) => (
                                <button
                                    key={journey.id}
                                    className={index === journeyIndex ? 'active' : ''}
                                    aria-current={index === journeyIndex}
                                    onClick={() => setJourneyIndex(index)}
                                    aria-label={`Show ${journey.city}`} />
                            ))}
                        </div>
                        <button onClick={() => changeJourney(1)} aria-label="Next journey"><ArrowRight size={17} /></button>
                    </div>
                </div>
            </div>
            <p className="carousel-footnote meta-label">ONE JOURNEY AT A TIME <span>✳</span> MORE MEMORIES TO COME</p>
        </section>
    );
}

export default JourneyCarrousel;
