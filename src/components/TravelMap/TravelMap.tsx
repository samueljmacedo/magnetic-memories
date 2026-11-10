import L from "leaflet";
import type {LatLngTuple, Map as LeafletMap} from "leaflet";
import {useState} from "react";
import {MapContainer, Marker, Popup, TileLayer} from "react-leaflet";
import {ArrowRight} from "lucide-react";
import {currentLocation, journeys} from "../../data/data.ts";
import {padNumber} from "../../utils/format.ts";
import {formatCoordinates} from "../../utils/map.ts";
import "leaflet/dist/leaflet.css";
import "./TravelMap.css";

const TILE_URL = "https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png?key=cb1_52nx_1_b46cb5873b4f9aafc33d597a";
const TILE_ATTRIBUTION = '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>';

// Custom markers: Leaflet's default marker images don't survive bundlers, and these match the site.
const pinIcon = L.divIcon({
    className: "map-marker",
    html: '<svg viewBox="0 0 24 24" width="30" height="30" aria-hidden="true"><path d="M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0" fill="currentColor"/><circle class="map-marker-dot" cx="12" cy="10" r="3"/></svg>',
    iconSize: [30, 30],
    iconAnchor: [15, 27],
    popupAnchor: [0, -25],
});

const hereIcon = L.divIcon({
    className: "map-here",
    html: '<span class="map-here-ping"></span><span class="map-here-dot"></span>',
    iconSize: [18, 18],
    iconAnchor: [9, 9],
    popupAnchor: [0, -10],
});

const countUnique = (values: string[]) => new Set(values).size

// The view that shows every pin (and where I am now).
const points: LatLngTuple[] = [
    ...journeys.map((journey): LatLngTuple => [journey.lat, journey.lng]),
    [currentLocation.lat, currentLocation.lng],
]
const bounds = L.latLngBounds(points)
const boundsOptions = {padding: [48, 48] as [number, number], maxZoom: 5}

const TravelMap = () => {
    const [map, setMap] = useState<LeafletMap | null>(null)

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
                    <button type="button" className="text-link map-reset" onClick={() => map?.flyToBounds(bounds, boundsOptions)}>
                        Show all pins <ArrowRight size={16} />
                    </button>
                    <div className="map-stats">
                        {stats.map((stat) => (
                            <div key={stat.label}><strong>{padNumber(stat.value)}</strong><span className="meta-label">{stat.label}</span></div>
                        ))}
                    </div>
                </div>
                <div className="map-art">
                    <div className="map-paper">
                        <MapContainer
                            ref={setMap}
                            className="map-container"
                            bounds={bounds}
                            boundsOptions={boundsOptions}
                            minZoom={2}
                            maxBounds={[[-85, -180], [85, 180]]}
                            maxBoundsViscosity={1}
                            scrollWheelZoom={false}
                            dragging={!L.Browser.mobile}>
                            <TileLayer url={TILE_URL} attribution={TILE_ATTRIBUTION} subdomains="abcd" maxZoom={19} noWrap />
                            {journeys.map((journey) => (
                                <Marker
                                    key={journey.id}
                                    position={[journey.lat, journey.lng]}
                                    icon={pinIcon}
                                    title={`${journey.city}, ${journey.country}`}
                                    alt={`${journey.city}, ${journey.country}`}>
                                    <Popup className="journey-popup" minWidth={208} maxWidth={208}>
                                        <figure className="popup-card">
                                            <img src={journey.image} alt={`${journey.city}, ${journey.country}`} />
                                            <figcaption>
                                                <span className="meta-label">{journey.tag}</span>
                                                <strong>{journey.city}</strong>
                                                <em>{journey.country} · {journey.startDate}</em>
                                            </figcaption>
                                        </figure>
                                    </Popup>
                                </Marker>
                            ))}
                            <Marker
                                position={[currentLocation.lat, currentLocation.lng]}
                                icon={hereIcon}
                                title={`${currentLocation.city}, ${currentLocation.country}`}
                                alt={`Current location: ${currentLocation.city}, ${currentLocation.country}`}>
                                <Popup className="journey-popup" minWidth={160} maxWidth={208}>
                                    <p className="popup-here">
                                        <span className="meta-label">Currently here</span>
                                        <strong>{currentLocation.city}</strong>
                                        <em>{currentLocation.country} · I'm here</em>
                                    </p>
                                </Popup>
                            </Marker>
                        </MapContainer>
                        <span className="map-coord meta-label">{formatCoordinates(currentLocation.lat, currentLocation.lng)}</span>
                        <span className="map-compass meta-label">N<br /><span>✳</span></span>
                    </div>
                    <div className="tape map-tape" />
                </div>
            </div>
        </section>
    );
}

export default TravelMap;
