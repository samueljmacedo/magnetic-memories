import {PortableText} from "@portabletext/react";
import type {PortableTextComponents} from "@portabletext/react";
import {useJourneys} from "@/context/JourneysContext.tsx";
import FilterSelect from "@/components/FilterSelect/FilterSelect.tsx";
import {formatDate, padNumber} from "@/utils/format.ts";
import {ArrowLeft, ArrowRight, X} from "lucide-react";
import {useState} from "react";
import "./JourneyCarrousel.css";
import {
    ALL_FILTER,
    filterCountriesAlphabetically,
    filterJourneys,
    listYearsNewestFirst,
} from "@/utils/journey.ts";

// Sanity descriptions are rich text: render each paragraph with the site's body style.
const richTextComponents: PortableTextComponents = {
    block: {
        normal: ({children}) => <p className="text-body">{children}</p>,
    },
}

const JourneyCarrousel = () => {
    const {journeys, status} = useJourneys();
    const [yearFilter, setYearFilter] = useState(ALL_FILTER);
    const [countryFilter, setCountryFilter] = useState(ALL_FILTER);
    const [journeyIndex, setJourneyIndex] = useState(0)

    // The carousel only walks through the journeys that match both filters.
    const visibleJourneys = filterJourneys(journeys, {year: yearFilter, country: countryFilter})
    // Each list only offers values that still match the OTHER filter, so you can never pick a
    // combination with no journeys (for example Spain + 2022).
    const years = listYearsNewestFirst(filterJourneys(journeys, {year: ALL_FILTER, country: countryFilter}))
    const countries = filterCountriesAlphabetically(filterJourneys(journeys, {year: yearFilter, country: ALL_FILTER}))
    const filtersActive = yearFilter !== ALL_FILTER || countryFilter !== ALL_FILTER

    const currentIndex = Math.min(journeyIndex, Math.max(visibleJourneys.length - 1, 0))
    const activeJourney = visibleJourneys[currentIndex]

    const changeJourney = (direction: number) => {
        setJourneyIndex((current) =>
            (current + direction + visibleJourneys.length) % visibleJourneys.length)
    }
    // A new filter starts again from the first matching journey.
    const changeYear = (year: string) => {
        setYearFilter(year)
        setJourneyIndex(0)
    }
    const changeCountry = (country: string) => {
        setCountryFilter(country)
        setJourneyIndex(0)
    }
    const clearFilters = () => {
        changeYear(ALL_FILTER)
        setCountryFilter(ALL_FILTER)
    }

    return (
        <section className="journeys section-wrap" id="journeys">
            <div className="section-heading journey-heading">
                <div><p className="eyebrow">THE TRAVEL DIARIES</p><h2 className="heading-display">Journeys & <i>memories</i></h2></div>
                {/*<p className="heading-aside">
                    A few favourite chapters<br />from the places I've been.
                </p>*/}
                {journeys.length > 0 && (
                    <div className="journey-filters" role="group" aria-label="Filter journeys">
                        <FilterSelect
                            label="Year"
                            value={yearFilter}
                            active={yearFilter !== ALL_FILTER}
                            onChange={changeYear}
                            options={[
                                {value: ALL_FILTER, label: 'All years'},
                                ...years.map((year) => ({value: year.id, label: year.name})),
                            ]}
                        />
                        <FilterSelect
                            label="Country"
                            value={countryFilter}
                            active={countryFilter !== ALL_FILTER}
                            onChange={changeCountry}
                            options={[
                                {value: ALL_FILTER, label: 'All countries'},
                                ...countries.map((country) => ({value: country.id, label: country.name})),
                            ]}
                        />
                        {filtersActive && (
                            <button type="button" className="filter-reset meta-label" onClick={clearFilters}>
                                <X size={13} aria-hidden="true" /> Clear
                            </button>
                        )}
                    </div>
                )}
            </div>
            {activeJourney ? (
                <div className="journey-carousel">
                    <figure className="polaroid journey-polaroid">
                        <img src={activeJourney.image} alt={`${activeJourney.city}, ${activeJourney.country}`} />
                        <figcaption className="polaroid-caption">{activeJourney.city} · {formatDate(activeJourney.startDate)}</figcaption>
                        <span className="tape" />
                    </figure>
                    <div className="journey-story" aria-live="polite">
                        <div className="journey-meta meta-label"><span>{activeJourney.tag}</span><span>{padNumber(currentIndex + 1)} / {padNumber(visibleJourneys.length)}</span></div>
                        <h3 className="heading-display">{activeJourney.city}<br /><i>{activeJourney.country}</i></h3>
                        <div className="journey-description">
                            {typeof activeJourney.description === 'string'
                                ? <p className="text-body">{activeJourney.description}</p>
                                : <PortableText value={activeJourney.description} components={richTextComponents} />}
                        </div>
                        <div className="carousel-controls">
                            <button onClick={() => changeJourney(-1)} aria-label="Previous journey"><ArrowLeft size={17} /></button>
                            <div className="carousel-dots" role="group" aria-label="Choose a journey">
                                {visibleJourneys.map((journey, index) => (
                                    <button
                                        key={journey.id}
                                        className={index === currentIndex ? 'active' : ''}
                                        aria-current={index === currentIndex}
                                        onClick={() => setJourneyIndex(index)}
                                        aria-label={`Show ${journey.city}`} />
                                ))}
                            </div>
                            <button onClick={() => changeJourney(1)} aria-label="Next journey"><ArrowRight size={17} /></button>
                        </div>
                    </div>
                </div>
            ) : (
                <p className="journey-status text-body" role="status">
                    {status === 'loading' && 'Loading journeys…'}
                    {status !== 'loading' && journeys.length === 0 && 'No journeys yet.'}
                    {journeys.length > 0 && 'No journeys match these filters.'}
                </p>
            )}
            <p className="carousel-footnote meta-label">ONE JOURNEY AT A TIME <span>✳</span> MORE MEMORIES TO COME</p>
        </section>
    );
}

export default JourneyCarrousel;
