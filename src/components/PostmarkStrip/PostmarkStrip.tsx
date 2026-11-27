import {useMemo, useRef} from "react";
import type {CSSProperties} from "react";
import {useTranslation} from "react-i18next";
import {useJourneys} from "@/context/JourneysContext.tsx";
import type {Journey} from "@/lib/journeys.ts";
import {countryName, pickLanguage} from "@/utils/localized.ts";
import {formatMonthYear, getYear} from "@/utils/format.ts";
import "./PostmarkStrip.css";

const SECONDS_PER_STOP = 4.5
const MIN_SENTENCE = 45
const MAX_SENTENCE = 190

type Sentence = {
    text: string
    journey: Journey
}

/**
 * Splits a journey's description into sentences that are a good length for a quote.
 * @param description the description in the site language
 */
const quotableSentences = (description: string) =>
    description
        .split(/(?<=[.!?])\s+/)
        .map((sentence) => sentence.trim())
        .filter((sentence) => sentence.length >= MIN_SENTENCE && sentence.length <= MAX_SENTENCE)

const PostmarkStrip = () => {
    const {t, i18n} = useTranslation();
    const {journeys} = useJourneys();
    const luck = useRef(Math.random())
    const language = i18n.resolvedLanguage

    const stops = useMemo(
        () => [...journeys].sort((a, b) => b.startDate.localeCompare(a.startDate)),
        [journeys]
    )

    const quote = useMemo<Sentence | undefined>(() => {
        const sentences = stops.flatMap((journey) =>
            quotableSentences(pickLanguage(journey.description, language)).map((text) => ({text, journey}))
        )
        return sentences[Math.floor(luck.current * sentences.length)]
    }, [stops, language])

    if (stops.length === 0) return null

    const stopsList = (hidden: boolean) => (
        <ul className="postmark-list" aria-hidden={hidden || undefined}>
            {stops.map((journey) => (
                <li className="postmark-stop" key={journey.id}>
                    <span className="postmark-city">{journey.city}</span>
                    <i>{countryName(t, journey.country)}</i>
                    <small>{formatMonthYear(journey.startDate, language)}</small>
                </li>
            ))}
        </ul>
    )

    return (
        <section className="postmark-strip" aria-label={t('strip.postmarks', {defaultValue: 'Places I have been'})}>
            <span className="tape postmark-tape postmark-tape--left" aria-hidden="true" />
            <span className="tape postmark-tape postmark-tape--right" aria-hidden="true" />
            <div className="postmark-band">
                <div className="postmark-track" style={{'--duration': `${stops.length * SECONDS_PER_STOP}s`} as CSSProperties}>
                    {stopsList(false)}
                    {stopsList(true)}
                </div>
            </div>
            {quote && (
                <figure className="postmark-note">
                    <blockquote>{quote.text}</blockquote>
                    <figcaption className="meta-label">
                        {t('strip.fromJournal', {defaultValue: 'From the journal'})} · {quote.journey.city}, {getYear(quote.journey.startDate)}
                    </figcaption>
                </figure>
            )}
        </section>
    );
}

export default PostmarkStrip;
