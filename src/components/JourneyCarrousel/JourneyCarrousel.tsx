import {journeys} from "../../data/data.ts";
import {padNumber} from "../../utils/format.ts";
import {ArrowLeft, ArrowRight} from "lucide-react";
import {useState} from "react";
import "./JourneyCarrousel.css";

const JourneyCarrousel = () => {
    const [journeyIndex, setJourneyIndex] = useState(0)
    const activeJourney = journeys[journeyIndex]
    const changeJourney = (direction: number) => setJourneyIndex((current) => (current + direction + journeys.length) % journeys.length)

    if (!activeJourney) return null

    return (
        <section className="journeys section-wrap" id="journeys">
            <div className="section-heading">
                <div><p className="eyebrow">THE TRAVEL DIARIES</p><h2 className="heading-display">Journeys & <i>memories</i></h2></div>
                <p className="heading-aside">A few favourite chapters<br />from the places I've been.</p>
            </div>
            <div className="journey-carousel">
                <figure className="polaroid journey-polaroid">
                    <img src={activeJourney.image} alt={`${activeJourney.place}, ${activeJourney.country}`} />
                    <figcaption className="polaroid-caption">{activeJourney.place} · {activeJourney.date}</figcaption>
                    <span className="tape" />
                </figure>
                <div className="journey-story" aria-live="polite">
                    <div className="journey-meta meta-label"><span>{activeJourney.tag}</span><span>{padNumber(journeyIndex + 1)} / {padNumber(journeys.length)}</span></div>
                    <h3 className="heading-display">{activeJourney.place}<br /><i>{activeJourney.country}</i></h3>
                    <p className="text-body">{activeJourney.description}</p>
                    <p className="text-small">A collection of little moments, new corners discovered and memories I'd like to keep close. More stories will find their way here as the collection grows.</p>
                    <div className="carousel-controls">
                        <button onClick={() => changeJourney(-1)} aria-label="Previous journey"><ArrowLeft size={17} /></button>
                        <div className="carousel-dots" role="group" aria-label="Choose a journey">
                            {journeys.map((journey, index) => (
                                <button
                                    key={journey.id}
                                    className={index === journeyIndex ? 'active' : ''}
                                    aria-current={index === journeyIndex}
                                    onClick={() => setJourneyIndex(index)}
                                    aria-label={`Show ${journey.place}`} />
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
