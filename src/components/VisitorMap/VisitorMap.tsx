import {useEffect, useState} from "react";
import CountUp from "@/components/CountUp/CountUp.tsx";
import {useTranslation} from "react-i18next";
import {fetchVisitors, recordVisit, sampleVisitors, type VisitorCountry} from "@/lib/visitors.ts";
import landDots from "@/data/landDots.json";
import "./VisitorMap.css";

/** The map is drawn in degrees: x is longitude + 170 and y is 80 - latitude. */
const MAP_WIDTH = 350
const MAP_HEIGHT = 138

/** One tiny round dot per land cell, written as a single SVG path to keep the DOM small. */
const LAND_PATH = (() => {
    const parts: string[] = []
    for (let i = 0; i < landDots.length; i += 2) parts.push(`M${landDots[i]} ${landDots[i + 1]}h0`)
    return parts.join('')
})()

/** Pin diameter in px: bigger for more visits, but growing slowly so the big countries don't swallow the map. */
const pinSize = (visits: number) => Math.round(12 + Math.sqrt(visits) * 2.6)

export default function VisitorMap() {
    const {t, i18n} = useTranslation()
    const [visitors, setVisitors] = useState<VisitorCountry[] | null>(null)
    const [isSample, setIsSample] = useState(false)

    useEffect(() => {
        let cancelled = false
        // Count this visit first (once per browser), so it shows up on the map straight away.
        const load = async () => {
            if (!import.meta.env.DEV) await recordVisit()
            try {
                const rows = await fetchVisitors()
                if (!cancelled) setVisitors(rows)
            } catch (error) {
                console.warn('Could not load the visitors, ', error)
                // Sample numbers only while developing. On the live site a failure hides the panel.
                if (!cancelled && import.meta.env.DEV) {
                    setVisitors(sampleVisitors)
                    setIsSample(true)
                }
            }
        }
        void load()
        return () => { cancelled = true }
    }, [])

    if (visitors === null) return null

    const countryNames = new Intl.DisplayNames(i18n.resolvedLanguage, {type: 'region'})
    // Biggest first, so the small pins are drawn on top and stay reachable in crowded places like Europe.
    const sorted = [...visitors].sort((a, b) => b.visits - a.visits)
    const totalVisits = visitors.reduce((sum, country) => sum + country.visits, 0)

    return (
        <section className="visitor-section" aria-labelledby="visitor-heading" id="visitors">
            <header className="visitor-section__header">
                <div>
                    <p className="eyebrow">
                        {t('visitors.eyebrow')}
                    </p>
                    <h2 id="visitor-heading">
                        {t('visitors.title', {
                            count: visitors.length,
                            defaultValue_one: 'A postcard from {{count}} country',
                            defaultValue_other: 'Postcards from {{count}} countries',
                        })}
                    </h2>
                </div>
                <dl className="visitor-stats">
                    <div>
                        <dt>{t('visitors.visits', {defaultValue: 'VISITS'})}</dt>
                        <dd><CountUp to={totalVisits} mode="roll" duration={1.8} separator="," /></dd>
                    </div>
                    <div>
                        <dt>{t('visitors.countries', {defaultValue: 'COUNTRIES'})}</dt>
                        <dd><CountUp to={visitors.length} mode="roll" duration={1.8} /></dd>
                    </div>
                </dl>
            </header>

            <div className="visitor-map">
                <div className="visitor-map__canvas" style={{aspectRatio: `${MAP_WIDTH} / ${MAP_HEIGHT}`}}>
                    <svg viewBox={`0 0 ${MAP_WIDTH} ${MAP_HEIGHT}`} aria-hidden="true">
                        <path d={LAND_PATH} />
                    </svg>
                    {sorted.map(country => (
                        <button
                            className="visitor-pin"
                            key={country.code}
                            type="button"
                            style={{
                                left: `${((country.lng + 170) / MAP_WIDTH) * 100}%`,
                                top: `${((80 - country.lat) / MAP_HEIGHT) * 100}%`,
                                "--pin-size": `${pinSize(country.visits)}px`,
                            } as React.CSSProperties}
                            aria-label={
                                `${countryNames.of(country.code)}: 
                                    ${t('visitors.visitsCount', {
                                        count: country.visits, 
                                        defaultValue_one: '{{count}} visit', 
                                        defaultValue_other: '{{count}} visits'
                                    })
                                }`
                            }
                        >
                            <span className="visitor-pin__ring" />
                            <span className="visitor-pin__core" />
                            <span className="visitor-pin__tip">
                                <b>{countryNames.of(country.code)}</b>{' · '}
                                {t('visitors.visitsCount', {
                                    count: country.visits,
                                    defaultValue_one: '{{count}} visit',
                                    defaultValue_other: '{{count}} visits'}
                                )}
                            </span>
                        </button>
                    ))}
                </div>
                <p className="visitor-map__note">
                    {isSample
                        ? 'Sample numbers (development only)'
                        : t('visitors.note', {defaultValue: 'Only the country of each visit is counted, never who you are.'})}
                </p>
            </div>
        </section>
    );
}
