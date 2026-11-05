import {journeys} from "../../data/data.ts";
import {ArrowLeft, ArrowRight} from "lucide-react";
import {useState} from "react";
import "./JourneyCarrousel.css";

const JourneyCarrousel = () => {
    const [journeyIndex, setJourneyIndex] = useState(0)
    const activeJourney = journeys[journeyIndex]
    const changeJourney = (direction: number) => setJourneyIndex((current) => (current + direction + journeys.length) % journeys.length)


    return (
        <section className="journeys section-wrap" id="journeys">
        <div className="section-heading">
            <div><p className="eyebrow">THE TRAVEL DIARIES</p><h2>Journeys & <i>memories</i></h2></div>
            <p className="heading-aside">A few favourite chapters<br />from the places I've been.</p>
        </div>
        <div className="journey-carousel">
            <div className="journey-polaroid">
                <div className="polaroid-inner">
                    <img src={activeJourney.image} alt={`${activeJourney.place}, ${activeJourney.country}`} />
                    <span className="polaroid-caption">{activeJourney.place} · {activeJourney.date}</span>
                </div>
                <span className="polaroid-tape" />
            </div>
            <div className="journey-story">
                <div className="journey-meta"><span>{activeJourney.tag}</span><span>{String(journeyIndex + 1).padStart(2, '0')} / {String(journeys.length).padStart(2, '0')}</span></div>
                <h3>{activeJourney.place}<br /><i>{activeJourney.country}</i></h3>
                <p>{activeJourney.description}</p>
                <p className="journey-extra">A collection of little moments, new corners discovered and memories I'd like to keep close. More stories will find their way here as the collection grows.</p>
                <div className="carousel-controls">
                    <button onClick={() => changeJourney(-1)} aria-label="Previous journey"><ArrowLeft size={17} /></button>
                    <div className="carousel-dots" aria-label="Choose a journey">
                        {journeys.map((journey, index) => <button key={journey.id} className={index === journeyIndex ? 'active' : ''} onClick={() => setJourneyIndex(index)} aria-label={`Show ${journey.place}`} />)}
                    </div>
                    <button onClick={() => changeJourney(1)} aria-label="Next journey"><ArrowRight size={17} /></button>
                </div>
            </div>
        </div>
        <p className="carousel-footnote">ONE JOURNEY AT A TIME <span>✳</span> MORE MEMORIES TO COME</p>
    </section>
    );
}

export default JourneyCarrousel;