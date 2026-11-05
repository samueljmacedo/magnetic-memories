import {ArrowRight, MapPin} from "lucide-react";
import {currentLocation, journeys} from "../../data/data.ts";
import {padNumber} from "../../utils/format.ts";
import {formatCoordinates, projectToMap} from "../../utils/map.ts";
import "./TravelMap.css";

// Decorative region names, placed with the same projection as the pins.
const regionLabels = [
    {text: 'AMERICAS', lat: 20, lng: -90},
    {text: 'EUROPE', lat: 60, lng: 8},
    {text: 'AFRICA', lat: 5, lng: 22},
    {text: 'ASIA', lat: 52, lng: 95},
    {text: 'OCEANIA', lat: -25, lng: 135},
]

const countUnique = (values: string[]) => new Set(values).size

const TravelMap = () => {
    // Pins, route and stats are all derived from the journeys data.
    const pins = journeys.map((journey) => ({...journey, ...projectToMap(journey.lat, journey.lng)}))

    const route = pins
        .slice(1)
        .map((pin, index) => {
            const previous = pins[index]
            const controlX = (previous.x + pin.x) / 2
            const controlY = Math.min(previous.y, pin.y) - 12
            return `M${previous.x} ${previous.y} Q${controlX} ${controlY} ${pin.x} ${pin.y}`
        })
        .join(' ')

    const stats = [
        {label: 'countries', value: countUnique(journeys.map((journey) => journey.country))},
        {label: 'cities', value: countUnique(journeys.map((journey) => journey.city))},
        {label: 'continents', value: countUnique(journeys.map((journey) => journey.continent))},
    ]

    return (
        <section className="map-section" id="map">
            <div className="section-wrap map-layout">
                <div className="map-copy">
                    <p className="eyebrow">A WORLD OF MEMORIES</p>
                    <h2 className="heading-display">Been there,<br /><i>felt that.</i></h2>
                    <p className="text-body map-description">Every pin holds a story. Explore the places I've wandered, the paths I've taken and the memories I've brought home.</p>
                    <a className="text-link" href="#map">Explore the travel map <ArrowRight size={16} /></a>
                    <div className="map-stats">
                        {stats.map((stat) => (
                            <div key={stat.label}><strong>{padNumber(stat.value)}</strong><span className="meta-label">{stat.label}</span></div>
                        ))}
                    </div>
                </div>
                <div className="map-art" role="img" aria-label={`Illustrated map with pins for ${pins.map((pin) => pin.city).join(', ')}`}>
                    <div className="map-paper">
                        <div className="map-grid-lines" />
                        {regionLabels.map((label) => {
                            const {x, y} = projectToMap(label.lat, label.lng)
                            return <span key={label.text} className="map-label" style={{left: `${x}%`, top: `${y}%`}}>{label.text}</span>
                        })}
                        {route && (
                            <svg className="map-route" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
                                <path d={route} vectorEffect="non-scaling-stroke" />
                            </svg>
                        )}
                        {pins.map((pin) => (
                            <span key={pin.id} className="map-pin" style={{left: `${pin.x}%`, top: `${pin.y}%`}} title={`${pin.city}, ${pin.country}`}>
                                <MapPin size={25} fill="currentColor" />
                            </span>
                        ))}
                        <span className="map-coord meta-label">{formatCoordinates(currentLocation.lat, currentLocation.lng)}</span>
                        <span className="map-compass meta-label">N<br /><span>✳</span></span>
                        <span className="map-handwritten">you are<br />here-ish ♡</span>
                    </div>
                    <div className="tape map-tape" />
                </div>
            </div>
        </section>
    );
}

export default TravelMap;
