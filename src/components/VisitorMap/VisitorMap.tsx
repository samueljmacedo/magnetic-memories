import {fallbackVisitors} from "@/lib/visitors.ts";
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
    // Biggest first, so the small pins are drawn on top and stay reachable in crowded places like Europe.
    const visitors = [...fallbackVisitors].sort((a, b) => b.visits - a.visits)
    const totalVisits = visitors.reduce((sum, country) => sum + country.visits, 0)

    return (
        <section className="visitor-section" aria-labelledby="visitor-heading" id="visitors">
            <header className="visitor-section__header">
                <div>
                    <p className="visitor-section__eyebrow">WHERE MY VISITORS COME FROM</p>
                    <h2 id="visitor-heading">Postcards from {visitors.length} countries</h2>
                </div>
                <dl className="visitor-stats">
                    <div>
                        <dt>VISITS</dt>
                        <dd>{totalVisits}</dd>
                    </div>
                    <div>
                        <dt>COUNTRIES</dt>
                        <dd>{visitors.length}</dd>
                    </div>
                </dl>
            </header>

            <div className="visitor-map">
                <div className="visitor-map__canvas" style={{aspectRatio: `${MAP_WIDTH} / ${MAP_HEIGHT}`}}>
                    <svg viewBox={`0 0 ${MAP_WIDTH} ${MAP_HEIGHT}`} aria-hidden="true">
                        <path d={LAND_PATH} />
                    </svg>
                    {visitors.map(country => (
                        <button
                            className="visitor-pin"
                            key={country.code}
                            type="button"
                            style={{
                                left: `${((country.lng + 170) / MAP_WIDTH) * 100}%`,
                                top: `${((80 - country.lat) / MAP_HEIGHT) * 100}%`,
                                "--pin-size": `${pinSize(country.visits)}px`,
                            } as React.CSSProperties}
                            aria-label={`${country.name}: ${country.visits} visits`}
                        >
                            <span className="visitor-pin__ring" />
                            <span className="visitor-pin__core" />
                            <span className="visitor-pin__tip">
                                <b>{country.name}</b> · {country.visits} visits
                            </span>
                        </button>
                    ))}
                </div>
                <p className="visitor-map__note">Sample numbers for now</p>
            </div>
        </section>
    );
}
