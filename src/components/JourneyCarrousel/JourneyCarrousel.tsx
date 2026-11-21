import {useJourneys} from "@/context/JourneysContext.tsx";
import FilterSelect from "@/components/FilterSelect/FilterSelect.tsx";
import {formatDate, padNumber} from "@/utils/format.ts";
import {ArrowLeft, ArrowRight, X} from "lucide-react";
import {useEffect, useRef, useState} from "react";
import type {TouchEvent} from "react";
import type {Journey} from "@/lib/journeys.ts";
import {useTranslation} from "react-i18next";
import {countryName, pickLanguage} from "@/utils/localized.ts";
import "./JourneyCarrousel.css";
import {
    ALL_FILTER,
    filterCountriesAlphabetically,
    filterJourneys,
    listYearsNewestFirst,
} from "@/utils/journey.ts";

const TIME_FOR_PICTURE_LEAVE = 450
const SWIPE_DISTANCE = 50

const JourneyCarrousel = () => {
    const {journeys, status} = useJourneys();
    const {t, i18n} = useTranslation();
    const [chosenYear, setChosenYear] = useState<string | null>(null);
    const [countryFilter, setCountryFilter] = useState(ALL_FILTER);
    const [journeyIndex, setJourneyIndex] = useState(0)
    const [direction, setDirection] = useState<1 | -1 | 0 | null>(null)
    const [leaving, setLeaving] = useState<Journey | null>(null)
    const touchStart = useRef<{x: number, y: number} | null>(null)

    const newestYear = listYearsNewestFirst(journeys)[0]?.id
    const yearFilter = chosenYear ?? newestYear ?? ALL_FILTER

    const visibleJourneys = filterJourneys(journeys, {year: yearFilter, country: countryFilter})
    const years = listYearsNewestFirst(
        filterJourneys(journeys, {year: ALL_FILTER, country: countryFilter})
    )
    const countries = filterCountriesAlphabetically(
        filterJourneys(journeys, {year: yearFilter, country: ALL_FILTER})
    )
        .map((country) => ({value: country.id, label: countryName(t, country.name)}))
        .sort((a, b) => a.label.localeCompare(b.label, i18n.resolvedLanguage))
    const filtersActive = yearFilter !== ALL_FILTER || countryFilter !== ALL_FILTER

    const currentIndex = Math.min(journeyIndex, Math.max(visibleJourneys.length - 1, 0))
    const activeJourney = visibleJourneys[currentIndex]

    useEffect(() => {
        if (!leaving) return
        const timer = window.setTimeout(() => setLeaving(null), TIME_FOR_PICTURE_LEAVE)
        return () => window.clearTimeout(timer)
    }, [leaving])

    const showJourney = (index: number, travel: 1 | -1) => {
        if (index === currentIndex) return
        setLeaving(activeJourney)
        setDirection(travel)
        setJourneyIndex(index)
    }
    const changeJourney = (travel: 1 | -1) => {
        showJourney((currentIndex + travel + visibleJourneys.length) % visibleJourneys.length, travel)
    }
    const resetJourneys = () => {
        setLeaving(null)
        setDirection(0)
        setJourneyIndex(0)
    }
    const changeYear = (year: string) => {
        setChosenYear(year)
        resetJourneys()
    }
    const changeCountry = (country: string) => {
        setCountryFilter(country)
        resetJourneys()
    }
    const onTouchStart = (event: TouchEvent) => {
        const touch = event.touches[0]
        touchStart.current = {x: touch.clientX, y: touch.clientY}
    }
    const onTouchEnd = (event: TouchEvent) => {
        const start = touchStart.current
        touchStart.current = null
        if (!start || visibleJourneys.length < 2) return
        const touch = event.changedTouches[0]
        const dx = touch.clientX - start.x
        const dy = touch.clientY - start.y
        if (Math.abs(dx) < SWIPE_DISTANCE || Math.abs(dx) < Math.abs(dy) * 1.5) return
        changeJourney(dx < 0 ? 1 : -1)
    }
    const clearFilters = () => {
        changeYear(ALL_FILTER)
        setCountryFilter(ALL_FILTER)
    }

    return (
        <section className="journeys section-wrap" id="journeys">
            <div className="section-heading journey-heading">
                <div>
                    <p className="eyebrow">
                        {t('journeys.eyebrow')}
                    </p>
                    <h2 className="heading-display">
                        {t('journeys.title.p1')}<i>{t('journeys.title.p2')}</i>

                    </h2>
                </div>
                {journeys.length > 0 && (
                    <div
                      className="journey-filters"
                      role="group"
                      aria-label="Filter journeys"
                    >
                        <FilterSelect
                            label={t('journeys.filter.year')}
                            value={yearFilter}
                            active={yearFilter !== ALL_FILTER}
                            onChange={changeYear}
                            options={[
                                {value: ALL_FILTER, label: t('journeys.filter.allYears') },
                                ...years.map((year) => ({value: year.id, label: year.name})),
                            ]}
                        />
                        <FilterSelect
                            label={t('journeys.filter.country')}
                            value={countryFilter}
                            active={countryFilter !== ALL_FILTER}
                            onChange={changeCountry}
                            options={[
                                {value: ALL_FILTER, label: t('journeys.filter.allCountries')},
                                ...countries,
                            ]}
                        />
                        {filtersActive && (
                            <button type="button" className="filter-reset meta-label" onClick={clearFilters}>
                                <X size={13} aria-hidden="true" />{t('journeys.filter.clear')}
                            </button>
                        )}
                    </div>
                )}
            </div>
            {activeJourney ? (
                <div
                    className="journey-carousel"
                    data-direction={direction ?? undefined}
                    onTouchStart={onTouchStart}
                    onTouchEnd={onTouchEnd}
                >
                    {leaving && (
                        <figure className="polaroid journey-polaroid journey-polaroid--leaving" aria-hidden="true" key={`leaving-${leaving.id}`}>
                            <img src={leaving.image} alt="" />
                            <figcaption className="polaroid-caption">
                                {leaving.city} · {formatDate(leaving.startDate, i18n.resolvedLanguage)}
                            </figcaption>
                            <span className="tape" />
                        </figure>
                    )}
                    <figure className="polaroid journey-polaroid" key={activeJourney.id}>
                        <img src={activeJourney.image} alt={`${activeJourney.city}, ${countryName(t, activeJourney.country)}`} />
                        <figcaption className="polaroid-caption">
                            {activeJourney.city} · {formatDate(activeJourney.startDate, i18n.resolvedLanguage)}
                        </figcaption>
                        <span className="tape" />
                    </figure>
                    <div className="journey-story" aria-live="polite">
                        <div className="journey-meta meta-label" key={`meta-${activeJourney.id}`}>
                            <span>{pickLanguage(activeJourney.tag, i18n.resolvedLanguage)}</span>
                            <span>{padNumber(currentIndex + 1)} / {padNumber(visibleJourneys.length)}</span>
                        </div>
                        <h3 className="heading-display" key={`title-${activeJourney.id}`}>
                            {activeJourney.city}<br /><i>{countryName(t, activeJourney.country)}</i>
                        </h3>
                        <div className="journey-description" key={`text-${activeJourney.id}`}>
                            <p className="text-body">{pickLanguage(activeJourney.description, i18n.resolvedLanguage)}</p>
                        </div>
                        <div className="carousel-controls">
                            <button onClick={() => changeJourney(-1)} aria-label="Previous journey"><ArrowLeft size={17} /></button>
                            <div className="carousel-dots" role="group" aria-label="Choose a journey">
                                {visibleJourneys.map((journey, index) => (
                                    <button
                                        key={journey.id}
                                        className={index === currentIndex ? 'active' : ''}
                                        aria-current={index === currentIndex}
                                        onClick={() => showJourney(index, index > currentIndex ? 1 : -1)}
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
        </section>
    );
}

export default JourneyCarrousel;
